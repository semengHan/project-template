import { useState, useEffect, useRef } from "react";
import { Source, Layer } from "react-map-gl";
import { getRadarImageList } from "@/services/index";
import styles from "./index.module.less";

const RadarLayer = () => {
  const [data, setData] = useState([]);
  const [source, setSource] = useState();
  const [layer, setLayer] = useState({
    id: "radar-layer",
    type: "raster",
    source: "radar-source",
    layout: {
      visibility: "visible",
    },
    paint: {
      "raster-fade-duration": 0,
    },
    zIndex: 99,
  });

  const indexRef = useRef(0);

  const getData = async () => {
    const res = await getRadarImageList({});
    const {
      data: { values, bbox },
    } = res;

    const result = [];
    for (let key in values) {
      const obj = {
        id: "radar-source",
        type: "image",
        url: "//geo2b.mojitest.com" + values[key],
        coordinates: [
          [Number(bbox[0]), Number(bbox[3])],
          [Number(bbox[2]), Number(bbox[3])],
          [Number(bbox[2]), Number(bbox[1])],
          [Number(bbox[0]), Number(bbox[1])],
        ],
      };
      result.push(obj);
    }
    setData(result);
    setSource(result[0]);
  };

  useEffect(() => {
    if (indexRef.current < data.length) {
      setTimeout(() => {
        setSource(data[indexRef.current]);
      }, 1000);
      indexRef.current++;
    } else {
      setSource(data[0]);
    }
  }, [source]);

  useEffect(() => {
    getData();
  }, []);
  if (!source) {
    return null;
  }
  return (
    <Source {...source} key={"radar"}>
      <Layer {...layer} />
    </Source>
    // <div className={styles.container}>ces</div>
  );
};

export default RadarLayer;
