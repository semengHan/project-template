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
// import type { LayerProps } from "react-map-gl";
import { getRadarImageList } from "@/services/index";
import {
  LayerConfig,
  SourceConfig,
  transformRequest,
  LineLayer,
  LineSource,
} from "./config";

import RadarLayer from "./Radar";
import TtLayer from "./TtLayer";

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
        {/* <RadarLayer /> */}
        <TtLayer />
        {/* <ScaleControl position="bottom-right" /> */}
        <NavigationControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        {/* <GeolocateControl position="bottom-right" /> */}
      </Map>
    </>
  );
};

export default CustomMap;
