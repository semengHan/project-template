// import { useState, useEffect, useMemo, useCallback } from "react";
// import { Button } from "antd";
import Map, { Source, Layer } from "react-map-gl";
import styles from "./index.module.less";
import type { LayerProps } from "react-map-gl";

// import { useBearStore } from "@/store/index";

const MAPBOX_TOKEN = ""; // Set your mapbox token here
const TIAN_DI_TU_TK = "d2bd6bfcdc8673df254fc333915c6d72";

// const mapStyle = {
//   version: 8,
//   glyphs: "./fonts/{fontstack}/{range}.pbf",
//   sources: {},
//   layers: [
//     {
//       id: "background",
//       type: "background",
//       layout: {
//         visibility: "none",
//       },
//     },
//   ],
// };

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
  const pointData = {
    type: "raster",
    tiles: Array(7)
      .fill(0)
      .map(
        (_, s) =>
          `https://t${s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${TIAN_DI_TU_TK}`
      ),
    tileSize: 256,
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
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: 600, height: 400 }}
        >
          <Source
            id="province-line"
            type="geojson"
            data={"../../../public/json/city.json"}
          >
            <Layer {...pointLayer} />
          </Source>
        </Map>
      </div>
    </div>
  );
};

export default Home;
