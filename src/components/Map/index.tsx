import { useState, useEffect } from "react";
import Map, {
  // GeolocateControl, // 定位组件
  // ScaleControl, // 比例尺
  FullscreenControl, // 全屏
  NavigationControl, // 导航-放大缩小
  Source,
  Layer,
  Marker, // 标点
  Popup, // 气泡弹框
} from "react-map-gl";
import { Radio } from "antd";
import Player from "@/components/Player";
import { LayerConfig, SourceConfig, transformRequest } from "./config";
import styles from "./index.module.less";

import RadarLayer from "./Radar";
import Surface from "./Surface";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiampnYXJyZXR0MCIsImEiOiJjanhnM3Fud2QwZnY1M3VvN3pqZHYzZzdvIn0.jaDeTWgRsKsOeojogZzk1g"; // Set your mapbox token here

const mapStyle = {
  version: 8,
  glyphs: "./fonts/{fontstack}/{range}.pbf",
  sprite: "http://custom/images/sprites/sprites",
  sources: {},
  layers: [],
};

const CustomMap = () => {
  const [layers, setLayers] = useState(LayerConfig);
  const [sources, setSources] = useState(SourceConfig);
  const [playerTimes, setPlayerTimes] = useState<any>([]);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [currentTime, setCurTime] = useState("");
  const [currentLayer, setCurLayer] = useState("TT2");

  const handleSliderChange = (obj) => {
    console.log(obj, "handleSliderChange");
    setCurTime(obj.time);
  };

  const handleTimesData = (obj) => {
    const times = [];
    for (const time in obj) {
      times.push({ time: time });
    }
    console.log(times, "times");
    setCurTime(times[0].time);
    setPlayerTimes(times.slice(0, 24));
  };

  const handleRadioChange = (e) => {
    console.log(e, "eee");
    setCurLayer(e.target.value);
  };

  return (
    <>
      <Map
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: 34.448999,
          longitude: 113.625351,
          pitch: 0,
          zoom: 8,
        }}
        minZoom={7}
        maxZoom={16}
        maxBounds={[
          [108.98863225000093, 30.63423869067384],
          [118.26206975000133, 37.25588849072719],
        ]}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        // style={{ width: 600, height: 400 }}
        transformRequest={transformRequest}
        baseApiUrl="https://api.mapbox.cn"
      >
        {sources.map((item) => {
          const layer = layers.find((layer) => layer.source === item.id);

          if (layer) {
            return (
              <Source {...item} key={item.id}>
                <Layer {...layer} />
              </Source>
            );
          }
        })}
        {currentLayer === "RADAR" && (
          <RadarLayer time={currentTime} setTimes={handleTimesData} />
        )}
        {(currentLayer === "TT2" || currentLayer === "WS") && (
          <Surface
            layerId={currentLayer}
            time={currentTime}
            setTimes={handleTimesData}
          />
        )}

        <div className={styles.layerCon}>
          <Radio.Group
            value={currentLayer}
            buttonStyle="solid"
            onChange={handleRadioChange}
          >
            <Radio.Button value="TT2">温度</Radio.Button>
            <Radio.Button value="WS">风力</Radio.Button>
            <Radio.Button value="RADAR">雷达</Radio.Button>
          </Radio.Group>
        </div>
        {/* <ScaleControl position="bottom-right" /> */}
        <NavigationControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        {/* <GeolocateControl position="bottom-right" /> */}
        {playerTimes.length > 0 && (
          <div className={styles.timeline}>
            <Player
              data={playerTimes}
              maxLabels={8}
              interval={1400}
              sliderChange={handleSliderChange}
              autoPlay={false}
              pauseChange={(status) => {
                setAutoPlay(status);
              }}
            />
          </div>
        )}
      </Map>
    </>
  );
};

export default CustomMap;
