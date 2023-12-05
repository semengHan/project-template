/* eslint-disable */
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import SliderBar, { SliderItem, SliderProps } from "./SliderBar";
import styles from "./index.module.less";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

export interface PlayerBoxProps {
  style?: any;
  data: Array<SliderItem>;
  interval?: number; // 播放速度
  autoPlay?: boolean; // 是否自动播放
  maxLabels?: number; // 最多展示的label数量
  defaultVal?: string;
  pauseChange?: (status: boolean) => void; // 开始 / 暂停
  tipFormatter?: SliderProps["tipFormatter"];
  labelFormatter?: SliderProps["labelFormatter"];
  beforeChange?: SliderProps["beforeChange"];
  sliderChange?: SliderProps["onChange"];
}

const PlayerBox: React.FC<PlayerBoxProps> = (props: PlayerBoxProps) => {
  // 播放状态
  const [pauseState, setPauseState] = useState(props.autoPlay);

  const pauseChange = () => {
    const newPauseState = !pauseState;
    props.pauseChange && props.pauseChange(newPauseState);
    setPauseState(newPauseState);
  };

  const sliderChange = (item: any) => {
    props.sliderChange && props.sliderChange(item);
  };

  const beforeChange = (item: any, next) => {
    next();
  };
  // tip格式化
  const tipFormatter = (item) => {
    const t = dayjs(item?.time, "YYYYMMDDHHmm");
    return t?.isValid() ? t.format("YYYY/MM/DD HH:mm") : "--";
  };
  // label格式化
  const labelFormatter = (item) => {
    const t = dayjs(item?.time, "YYYYMMDDHHmm");
    return (
      <span className={styles.playerLabel}>
        {t?.isValid() ? t.format("MM/DD HH:mm") : "--"}
      </span>
    );
  };

  useEffect(() => {
    setPauseState(props.autoPlay);
  }, [props.data, props.autoPlay]);

  return (
    <div className={styles.playerBox} style={{ ...props.style }}>
      <div className={styles.pause} onClick={pauseChange}>
        {!pauseState ? <CaretRightOutlined /> : <PauseOutlined />}
      </div>
      <div className={styles.sliderBox}>
        <div className={styles.inner}>
          <SliderBar
            data={props.data}
            interval={props.interval}
            maxLabels={props.maxLabels}
            defaultVal={props.defaultVal}
            autoPlay={pauseState}
            onChange={sliderChange}
            beforeChange={props.beforeChange || beforeChange}
            tipFormatter={props.tipFormatter || tipFormatter}
            labelFormatter={props.labelFormatter || labelFormatter}
          />
        </div>
      </div>
    </div>
  );
};

PlayerBox.defaultProps = {
  interval: 800,
  autoPlay: false,
};
export default PlayerBox;
