import Map, {
  FullscreenControl,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";
import type { LayerProps } from "react-map-gl";
import { LayerConfig, SourceConfig } from "./config";

const MAPBOX_TOKEN = ""; // Set your mapbox token here

const mapStyle = {
  version: 8,

  glyphs: "./fonts/{fontstack}/{range}.pbf",
  sprite: "http://custom/images/sprites/sprites",
  // @tip 为什么不在此处初始化图层，因为现有系统我们需要对图层进行排序，如果通过初始化的方式
  // 再去实现排序会比较麻烦和不可控
  sources: {},
  layers: [],
};

const CustomMap = () => {
  const transformRequest = (url: string, resourceType: string) => {
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
      mapStyle={mapStyle}
      mapboxAccessToken={MAPBOX_TOKEN}
      // style={{ width: 600, height: 400 }}
      transformRequest={transformRequest}
      baseApiUrl="https://api.mapbox.cn"
    >
      {SourceConfig.map((item) => {
        const layer = LayerConfig.find((layer) => layer.source === item.id);

        if (layer) {
          return (
            <Source {...item}>
              <Layer {...layer} />
            </Source>
          );
        }
      })}
      <FullscreenControl position="bottom-right" />
      {/* <GeolocateControl position="bottom-right" /> */}
    </Map>
  );
};

export default CustomMap;
