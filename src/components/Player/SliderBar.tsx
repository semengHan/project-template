/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Slider, SliderSingleProps } from "antd";
import styles from "./SliderBar.module.less";
import { get, round, indexOf } from "lodash";
import dayjs from "dayjs";

export type SliderItem = {
  time: string; // label
  [propName: string]: any;
};

export type SliderProps = SliderSingleProps & {
  data: Array<SliderItem>;
  interval?: number;
  autoPlay?: boolean;
  maxLabels?: number;
  defaultVal?: string;
  tipFormatter?: (label: any, value?: number) => React.ReactNode;
  labelFormatter?: (
    data: SliderItem,
    preData?: SliderItem,
    index?: number
  ) => React.ReactNode;
  beforeChange?: (value: any, next: Function) => void;
  onChange?: (value: any) => void;
};

const SliderBar: React.FC<SliderProps> = (props: SliderProps) => {
  const [value, setValue] = useState<number>(0);
  const [marks, setMarks] = useState(null);
  const sliderRef: any = useRef();
  const marksRef: any = useRef(null);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0); // 当前位置的index（第几个点）

  const getMarks = () => {
    const data = props.data;
    const gaps = data.length - 1; // 间隔数
    const dx = gaps ? 100 / gaps : 0; // 每段间隔的百分值
    const marks: any = {};
    const formatter = props.labelFormatter;

    // const sliderWidth = sliderRef.current.offsetWidth || 0;
    // const gapWidth = sliderWidth / gaps; // 两个点间的距离
    // const step = Math.ceil(0 / gapWidth); // 40: 两个label的间隔
    // const step = 1;

    const jump = props.maxLabels ? Math.ceil((gaps + 1) / props.maxLabels) : 1; // label间隔数

    for (let i = 0; i <= gaps; i++) {
      const { time: label } = data[i];
      // 当前标记百分值
      const index = gaps === 0 ? "100" : round(i * dx, 4); // 处理只有一个数据
      marks[index] = {
        label: formatter ? formatter(data[i], data[i - 1], i) : label,
        index: i,
        ...data[i],
        style: {
          display: i % jump === 0 ? "block" : "none",
          color: "#29292A",
        },
      };
      if (props.defaultVal !== undefined && label === props.defaultVal) {
        setValue(+index);
        indexRef.current = i;
      }
    }

    setMarks(marks);
    return marks;
  };

  const clearTimer = (pause: boolean = false) => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    return pause;
  };

  // 鼠标拖动
  const sliderChange = (nextValue: any) => {
    clearTimer();
    const { onChange, beforeChange, data } = props;
    const gaps = data.length - 1; // 间隔数
    if (gaps <= 0) return;

    const nextItemValue = get(marks, nextValue + "", null);
    const next = () => {
      setValue(nextValue);
      const dx = 100 / gaps; // 每段间隔的百分值
      indexRef.current = round(nextValue / dx, 0); // 当前在第几个点
      onChange && onChange(nextItemValue);
    };

    if (!beforeChange) {
      next();
    } else {
      beforeChange(nextItemValue, next);
    }

    if (props.autoPlay) autoPlay();
  };

  // 自动
  const autoPlay = () => {
    const { onChange, beforeChange, data } = props;
    const gaps = data.length - 1; // 间隔数
    if (gaps <= 0) return;

    const dx = 100 / gaps; // 每段间隔的百分值
    const currentIndex = (indexRef.current + 1) % (gaps + 1); // 下一个index
    const nextValue = round(dx * currentIndex, 4);
    let nextItemValue = null;
    if (marksRef.current) {
      nextItemValue = get(marksRef.current, nextValue + "", null);
    } else {
      const tmpMarks = getMarks();
      nextItemValue = get(tmpMarks, nextValue + "", null);
    }

    const next = () => {
      indexRef.current = currentIndex;
      setValue(nextValue);
      onChange && onChange(nextItemValue);

      clearTimer();
      autoTimerRef.current = setTimeout(() => {
        autoPlay();
      }, props.interval || 1000);
    };

    if (!beforeChange) {
      next();
    } else {
      beforeChange(nextItemValue, next);
    }
  };

  const tipFormatter = (value: number | undefined) => {
    const item = get(marks, value + "", {});
    if (props.tipFormatter) {
      return <span>{props.tipFormatter(item, value)}</span>;
    }
    return value;
  };

  const addTooltip = () => {
    setTimeout(() => {
      const data = props.data;
      const bar = document.getElementsByClassName("ant-slider-step")[0];

      let node = document.getElementById("mark-tooltip");
      if (!node) {
        node = document.createElement("span"); //创建一个li节点
        node.id = "mark-tooltip";
        node.classList.add("mark-tooltip");
        bar.appendChild(node);
      }

      const marks = bar.querySelectorAll(".ant-slider-dot");
      marks.forEach((el, index) => {
        el.addEventListener("mouseover", (e) => {
          e.stopPropagation();
          node!.classList.add("show");
          node!.innerHTML = dayjs(data[index].time, "YYYYMMDDHHmm").format(
            "YYYY/MM/DD HH:mm"
          );
          node!.style.left = e.target.style.left;
        });
      });

      sliderRef.current.addEventListener("mouseout", (e) => {
        if (e.target.className.indexOf("ant-slider-dot") === -1) {
          node!.classList.remove("show");
        }
      });
    }, 500);
  };

  useEffect(() => {
    clearTimer(true);

    if (props.data.length) {
      indexRef.current = 0;
      if (props.data.length === 1) {
        setValue(100); // 处理只有一个数据
      } else {
        setValue(0);
      }

      marksRef.current = getMarks();
      // addTooltip();
      if (props.autoPlay) autoPlay();
      window.addEventListener("resize", getMarks);
    }
  }, [props.data]);

  useEffect(() => {
    props.autoPlay ? autoPlay() : clearTimer(true);
  }, [props.autoPlay]);

  useEffect(() => {
    return () => {
      clearTimer();
      window.removeEventListener("resize", getMarks);
    };
  }, []);

  return (
    <div className={styles.sliderBar} ref={sliderRef}>
      <Slider
        tooltip={{
          getPopupContainer: () => sliderRef.current,
          formatter: tipFormatter,
          open: true,
        }}
        marks={marks}
        step={null}
        onChange={sliderChange}
        value={value}
      />
    </div>
  );
};

export default SliderBar;
