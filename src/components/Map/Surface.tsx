import { useState, useEffect } from "react";
import { Source, Layer } from "react-map-gl";
import dayjs from "dayjs";
import geobuf from "geobuf";
import Pbf from "pbf";
import { get, set } from "lodash";
import { GET, POST, PUT } from "@/utils/request";
import { getEcData } from "@/services/index";
import { closeToNumber, formatNumber } from "@/utils/index";

interface Props {
  time: string;
  setTimes: (obj: any) => void;
}

const Surface = (props: Props) => {
  const [data, setData] = useState({});
  const [legends, setLegends] = useState([]);
  const [index, setIndex] = useState(0);
  const [source, setSource] = useState();
  const [layer, setLayer] = useState({
    id: "tt-layer",
    type: "fill",
    source: "tt-source",
    zIndex: 70.5,
    paint: {
      "fill-color": ["get", "color"],
      "fill-opacity": 0.5,
    },
  });

  const getData = async () => {
    const res = await getEcData({
      time: dayjs().format("YYYYMMDDHHmm"),
      elem: "TT2",
    });
    if (res.code === 200) {
      props?.setTimes(res.data.isobands);
      setData(res.data.isobands);
      setLegends(res.data.legend);
    }
  };

  const loadGeojson = async () => {
    const path = "/map/" + data[props.time];
    const bufData = await GET(path, undefined, {
      responseType: "arraybuffer",
      messageConfig: {
        show: false,
        text: "",
      },
    });
    const geojson = geobuf.decode(new Pbf(bufData));
    const f = get(geojson, "features", []);

    const featuresCollection: any = {
      type: "FeatureCollection",
      features: [],
    };
    for (let i = 0; i < f.length; i++) {
      const feature = f[i];
      // 此处处理 low 值和 high 值，因为数据返回的高值和低值有可能与真实图例不匹配（后台问题，但是算法无法修改）
      // 所以此处仅从 label 中提取高低值，组合情况如下：
      // 1: 0 - 1
      // 2: > 1
      // 3: < 1
      // 所以仅处理这三种情况（注意空格）

      // eslint-disable-next-line prefer-const
      let { low, high, label } = get(feature, "properties", {});
      if (label.indexOf("-") !== -1) {
        [low, high] = label
          .split("-")
          .map((v) => v.trim().trim())
          .map((v) => parseFloat(v));
      } else if (label.indexOf(">") !== -1) {
        const v = label.replace(">", "").trim().trim();
        low = parseFloat(v);
      } else if (label.indexOf("<") !== -1) {
        const v = label.replace("<", "").trim().trim();
        high = parseFloat(v);
      }

      let color = "rgba(255, 255, 255, 0)";
      for (let j = 0; j < legends.length; j++) {
        const lg = legends[j];
        if (lg?.isContainLe && !lg?.isContainGe) {
          const s = closeToNumber(high, lg.end);
          if (s.closet) {
            // if (s.closet && (s.le || s.eq)) {
            color = lg.color;
            break;
          }
        } else if (!lg?.isContainLe && lg?.isContainGe) {
          const s = closeToNumber(low, lg.start);
          if (s.closet) {
            // if (s.closet && (s.le || s.eq)) {
            color = lg.color;
            break;
          }
        } else if (!lg?.isContainLe && !lg?.isContainGe) {
          const s = closeToNumber(low, lg.start);
          const s1 = closeToNumber(high, lg.end);
          if (s.closet && s1.closet) {
            color = lg.color;
            break;
          }
        }
      }

      set(feature, "properties.color", color);
      set(feature, "properties.low", formatNumber(low));
      set(feature, "properties.high", formatNumber(high));
      featuresCollection.features.push(feature);
    }
    setSource({
      id: "tt-source",
      type: "geojson",
      data: featuresCollection,
    });
  };

  useEffect(() => {
    loadGeojson();
  }, [props.time]);

  useEffect(() => {
    getData();
  }, []);

  if (!source) {
    return null;
  }
  return (
    <Source {...source} key={"tt"}>
      <Layer {...layer} />
    </Source>
  );
};

export default Surface;
