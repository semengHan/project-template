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
import dayjs from "dayjs";
import Player from "@/components/Player";
import { LayerConfig, SourceConfig, transformRequest } from "./config";
import styles from "./index.module.less";
import * as img from "@/assets/icons/index";

import RadarLayer from "./Radar";
import Surface from "./Surface";
import { stationPoint, StationType } from "./const";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiampnYXJyZXR0MCIsImEiOiJjanhnM3Fud2QwZnY1M3VvN3pqZHYzZzdvIn0.jaDeTWgRsKsOeojogZzk1g"; // Set your mapbox token here

const mapStyle = {
  version: 8,
  glyphs: "./font/{fontstack}/{range}.pbf",
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
  const [currentLayer, setCurLayer] = useState("RADAR");
  const [popupInfo, setPopupInfo] = useState(null);

  const handleSliderChange = (obj) => {
    setCurTime(obj.time);
  };

  const handleTimesData = (obj) => {
    const times = [];
    const now = dayjs().format("YYYYMMDDHH00");
    for (const time in obj) {
      times.push({ time: time });
    }
    if (currentLayer === "RADAR") {
      setCurTime(times[0].time);
      setPlayerTimes(times.slice(0, 24));
    } else {
      const index = times.findIndex((time) => time.time === now);
      setCurTime(times[index].time);
      times.splice(0, index);
      setPlayerTimes(times.slice(0, 24));
    }
  };

  const handleRadioChange = (e) => {
    setCurLayer(e.target.value);
    setCurTime("");
  };

  const markers = useMemo(
    () =>
      stationPoint.map((station, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={station.geometry.coordinates[0]}
          latitude={station.geometry.coordinates[1]}
          anchor={StationType[station.properties.type].anchor}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(station);
          }}
        >
          <img
            style={{
              width: "50%",
            }}
            src={img[StationType[station.properties.type].icon]}
          />
        </Marker>
      )),
    []
  );

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
        {markers}
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

        {popupInfo && (
          <Popup
            anchor="bottom"
            longitude={Number(popupInfo?.geometry.coordinates[0])}
            latitude={Number(popupInfo?.geometry.coordinates[1])}
            offset={[0, -60]}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
          >
            <div>站点：{popupInfo?.properties.name}</div>
          </Popup>
        )}
      </Map>
    </>
  );
};

export default CustomMap;
