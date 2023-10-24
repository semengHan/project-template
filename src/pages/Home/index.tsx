import { useState, useEffect, useMemo, useCallback } from "react";
// import { Button } from "antd";
import Map, { Source, Layer } from "react-map-gl";
import styles from "./index.module.less";
import type {LayerProps} from 'react-map-gl';

import ControlPanel from './control-panel';

// import { useBearStore } from "@/store/index";

const MAPBOX_TOKEN = ''; // Set your mapbox token here

const pointLayer: LayerProps = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

function pointOnCircle({center, angle, radius}) {
  return {
    type: 'Point',
    coordinates: [center[0] + Math.cos(angle) * radius, center[1] + Math.sin(angle) * radius]
  };
}

const Home = () => {
  const [pointData, setPointData] = useState(null);

  useEffect(() => {
    const animation = window.requestAnimationFrame(() =>
      setPointData(pointOnCircle({center: [-100, 0], angle: Date.now() / 1000, radius: 20}))
    );
    return () => window.cancelAnimationFrame(animation);
  });
  return (
    <div className={styles.home}>
      <div className={styles.header}>header</div>
      <div className={styles.content}>
      <Map
        initialViewState={{
          latitude: 0,
          longitude: -100,
          zoom: 3
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{width: 600, height: 400}}
      >
        {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>
        )}
      </Map>
      <ControlPanel />
      </div>
    </div>
  );
};

export default Home;
