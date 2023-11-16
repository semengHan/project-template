const TIAN_DI_TU_TK = "";

const LayerConfig = [
  {
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
  },
  {
    type: "raster",
    source: "raster-line-label",
    minzoom: 0,
    maxzoom: 19,
    zIndex: 80,
    paint: {
      // 'raster-resampling': 'nearest',
      "raster-fade-duration": 50,
    },
  },
  //   {
  //     type: "line",
  //     source: "vector-coastline",
  //     layout: {
  //       "line-join": "round",
  //       "line-cap": "round",
  //     },
  //     paint: {
  //       // 'line-color': 'rgba(99, 99, 99, 1)',
  //       "line-color": "rgba(80, 80, 80, .7)",
  //       "line-width": 4,
  //       "line-blur": 6,
  //       "line-offset": 2,
  //     },
  //     minzoom: 3,
  //     maxzoom: 19,
  //     zIndex: 90,
  //   },
  {
    type: "raster",
    source: "raster-text-label",
    minzoom: 0,
    maxzoom: 19,
    zIndex: 120,
    paint: {
      // 'raster-resampling': 'nearest',
      "raster-fade-duration": 50,
    },
  },
  {
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
  },
  // {
  //     type: 'symbol',
  //   source: 'static-layer',
  //   zIndex: 129,
  //   layout: {
  //     'icon-image': ['get', 'icon-image'],
  //     'icon-size': ['get', 'icon-size'],
  //     'icon-anchor': ['get', 'icon-anchor'],
  //     'icon-offset': [-0.5, 0],
  //     'icon-padding': 0,
  //     'icon-allow-overlap': true,
  //     'text-anchor': 'center',
  //     'text-field': ['get', 'name'],
  //     'text-offset': ['get', 'textOffset'],
  //     'text-size': ['get', 'textSize'],
  //     'text-font': ['Sans'],
  //     'text-allow-overlap': false,
  //   },
  //   paint: {
  //     'text-halo-width': 1,
  //     'text-halo-color': '#fff',
  //     'text-color': ['get', 'textColor'],
  //   },
  // },
];

const SourceConfig = [
  {
    id: "raster-tiles",
    type: "raster",
    tiles: Array(7)
      .fill(0)
      .map(
        (_, s) =>
          `https://t${s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${TIAN_DI_TU_TK}`
      ),
    tileSize: 256,
  },
  //   {
  //     id: "satellite-raster-tiles",
  //     type: "raster",
  //     tiles: Array(7)
  //       .fill(0)
  //       .map(
  //         (_, s) =>
  //           `https://t${s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${TIAN_DI_TU_TK}`
  //       ),
  //     tileSize: 256,
  //   },
  {
    id: "raster-line-label",
    type: "raster",
    tiles: Array(7)
      .fill(0)
      .map(
        (_, s) =>
          `https://t${s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIAN_DI_TU_TK}`
      ),
    tileSize: 256,
  },
  {
    id: "raster-text-label",
    type: "raster",
    tiles: Array(7)
      .fill(0)
      .map(
        (_, s) =>
          `https://t${s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIAN_DI_TU_TK}`
      ),
    tileSize: 256,
  },
  {
    id: "province-line",
    type: "geojson",
    data: "./json/city.json",
  },
];

export { LayerConfig, SourceConfig };
