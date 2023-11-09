// import { useState, useEffect, useMemo, useCallback } from "react";
// import { Button } from "antd";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";
import styles from "./index.module.less";
import type { LayerProps } from "react-map-gl";

// import { useBearStore } from "@/store/index";

const MAPBOX_TOKEN = ""; // Set your mapbox token here
const TIAN_DI_TU_TK = "";

const mapStyle = {
  version: 8,
  glyphs: "./fonts/{fontstack}/{range}.pbf",
  sprite: "http://custom/images/sprites/sprites",
  // @tip 为什么不在此处初始化图层，因为现有系统我们需要对图层进行排序，如果通过初始化的方式
  // 再去实现排序会比较麻烦和不可控
  sources: {},
  layers: [
    {
      id: "background",
      type: "background",
      layout: {
        visibility: "none",
      },
    },
  ],
};

const rasterLayer = {
  type: "raster",
  source: "raster-tiles",
  zIndex: 0,
  minzoom: 0,
  maxzoom: 19,
  paint: {
    "raster-resampling": "nearest",
    "raster-fade-duration": 50,
    "raster-opacity": 0.9,
  },
};
const rasterSource = {
  type: "raster",
  tiles: Array(7)
    .fill(0)
    .map(
      (_, s) =>
        `https://t${s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${TIAN_DI_TU_TK}`
    ),
  tileSize: 256,
};

const pointLayer: LayerProps = {
  id: "province-line",
  type: "line",
  source: "province-line",
  layout: {
    "line-cap": "butt",
    "line-join": "round",
  },
  paint: {
    "line-translate-anchor": "viewport",
    "line-width": 4,
    "line-gap-width": 0,
    // 'line-border-width': 0,
    // 'line-border-color': '#4a4a4a',
    "line-color": "#9C9C9C",
  },
};

const Home = () => {
  const transformRequest = (url: string, resourceType) => {
    if (
      resourceType === "SpriteImage" ||
      (resourceType === "SpriteJSON" && url.startsWith("http://custom"))
    ) {
      return {
        url: url.replace("http://custom", "."),
      };
    }
    return {
      url,
    };
  };

  return (
    <div className={styles.home}>
      <div className={styles.header}>header</div>
      <div className={styles.content}>
        <Map
          mapLib={import("mapbox-gl")}
          initialViewState={{
            latitude: 34.448999,
            longitude: 113.625351,
            zoom: 8,
            pitch: 0,
          }}
          mapStyle={mapStyle}
          mapboxAccessToken={MAPBOX_TOKEN}
          // style={{ width: 600, height: 400 }}
          transformRequest={transformRequest}
          baseApiUrl="https://api.mapbox.cn"
        >
          <Source
            id="raster-tiles"
            type="raster"
            tiles={rasterSource.tiles}
            tileSize={256}
          >
            <Layer {...rasterLayer} />
          </Source>
          <Source id="province-line" type="geojson" data={"/json/city.json"}>
            <Layer {...pointLayer} />
          </Source>
          <GeolocateControl position="bottom-right" />
          <FullscreenControl position="bottom-right" />
          {/* <AttributionControl customAttribution="Map design by me" /> */}
        </Map>
      </div>
    </div>
  );
};

export default Home;
