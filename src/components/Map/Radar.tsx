import { useState, useEffect, useRef } from "react";
import { Source, Layer } from "react-map-gl";
import { getRadarImageList } from "@/services/index";
import styles from "./index.module.less";
interface Props {
  time: string;
  setTimes: (obj: any) => void;
}

const RadarLayer = (props: Props) => {
  const [data, setData] = useState({});
  const [bbox, setBox] = useState([]);
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
    if (res.code === 200) {
      const {
        data: { values, bbox },
      } = res;

      props?.setTimes(values);
      setData(values);
      setBox(bbox);
    }
  };

  const loadSource = () => {
    const obj = {
      id: "radar-source",
      type: "image",
      url: "//geo2b.mojitest.com" + data[props.time],
      coordinates: [
        [Number(bbox[0]), Number(bbox[3])],
        [Number(bbox[2]), Number(bbox[3])],
        [Number(bbox[2]), Number(bbox[1])],
        [Number(bbox[0]), Number(bbox[1])],
      ],
    };
    setSource(obj);
  };

  useEffect(() => {
    loadSource();
  }, [props.time]);

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
  );
};

export default RadarLayer;
