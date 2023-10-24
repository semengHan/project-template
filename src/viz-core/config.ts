import { AnyLayer, AnySourceData } from 'mapbox-gl';

const accessTokens = [
  'f2505a74cb33a46138e4904ed38d1567',
  '43dc56f9516dfedb64196da436b6dec3',
  '2e62cd5c9c64163f67f03dcec2807638',
  'e47e604e3b39c97fa14a1396797aa087',
  'd2bd6bfcdc8673df254fc333915c6d72',
];

export const TIAN_DI_TU_TK = accessTokens[Math.floor(Math.random() * accessTokens.length)];

export type ILayerType = AnyLayer & {
  zIndex?: number;
};

export const MAP_CONFIG = {
  sources: {
    // 行政瓦片底图
    'raster-tiles': {
      type: 'raster',
      tiles: Array(7)
        .fill(0)
        .map(
          (_, s) =>
            `https://t${s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${TIAN_DI_TU_TK}`,
        ),
      tileSize: 256,
    },
    'satellite-raster-tiles': {
      type: 'raster',
      tiles: Array(7)
        .fill(0)
        .map(
          (_, s) =>
            `https://t${s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${TIAN_DI_TU_TK}`,
        ),
      tileSize: 256,
    },
    // 路网
    'raster-line-label': {
      type: 'raster',
      tiles: Array(7)
        .fill(0)
        .map(
          (_, s) =>
            `https://t${s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIAN_DI_TU_TK}`,
        ),
      tileSize: 256,
    },
    // 标注
    'raster-text-label': {
      type: 'raster',
      tiles: Array(7)
        .fill(0)
        .map(
          (_, s) =>
            `https://t${s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIAN_DI_TU_TK}`,
        ),
      tileSize: 256,
    },
    'province-line': {
      type: 'geojson',
      data: './json/city.json',
    },
    'static-layer': {
      type: 'geojson',
      data: './json/static.geojson',
    },

    pickSource(id): [string, AnySourceData] {
      return [id, this[id]];
    },
  },
  layers: {
    'raster-tiles': {
      type: 'raster',
      source: 'raster-tiles',
      zIndex: 0,
      minzoom: 0,
      maxzoom: 19,
      paint: {
        'raster-resampling': 'nearest',
        'raster-fade-duration': 50,
        'raster-opacity': 0.9,
      },
    },
    'raster-line-label': {
      type: 'raster',
      source: 'raster-line-label',
      minzoom: 0,
      maxzoom: 19,
      zIndex: 80,
      paint: {
        // 'raster-resampling': 'nearest',
        'raster-fade-duration': 50,
      },
    },
    'vector-coastline-blur': {
      type: 'line',
      source: 'vector-coastline',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        // 'line-color': 'rgba(99, 99, 99, 1)',
        'line-color': 'rgba(80, 80, 80, .7)',
        'line-width': 4,
        'line-blur': 6,
        'line-offset': 2,
      },
      minzoom: 3,
      maxzoom: 19,
      zIndex: 90,
    },
    'raster-text-label': {
      type: 'raster',
      source: 'raster-text-label',
      minzoom: 0,
      maxzoom: 19,
      zIndex: 120,
      paint: {
        // 'raster-resampling': 'nearest',
        'raster-fade-duration': 50,
      },
    },
    'province-line': {
      type: 'line',
      source: 'province-line',
      layout: {
        'line-cap': 'butt',
        'line-join': 'round',
      },
      zIndex: 100,
      paint: {
        'line-translate-anchor': 'viewport',
        'line-width': 4,
        'line-gap-width': 0,
        // 'line-border-width': 0,
        // 'line-border-color': '#4a4a4a',
        'line-color': '#9C9C9C',
      },
      // filter: ['all', ['in', 'adcode', '410100', '410182']],
    },
    'province-line-blur': {
      type: 'line',
      source: 'province-line',
      layout: {
        'line-cap': 'butt',
        'line-join': 'round',
      },
      zIndex: 101,
      paint: {
        'line-translate-anchor': 'viewport',
        'line-width': 1,
        'line-gap-width': 0,
        'line-dasharray': [6, 3, 4, 3, 4, 3],
        // 'line-border-color': '#4a4a4a',
        'line-color': '#ffffff',
      },
      // filter: ['all', ['in', 'adcode', '410100', '410182']],
    },
    'subgrade-section-layer': {
      type: 'fill',
      source: 'static-layer',
      layout: {},
      zIndex: 99,
      paint: {
        'fill-color': '#ffd300',
      },
    },
    'opening-layer': {
      type: 'symbol',
      source: 'static-layer',
      zIndex: 129,
      layout: {
        'icon-image': ['get', 'icon-image'],
        'icon-size': ['get', 'icon-size'],
        'icon-anchor': ['get', 'icon-anchor'],
        'icon-offset': [-0.5, 0],
        'icon-padding': 0,
        'icon-allow-overlap': true,
        'text-anchor': 'center',
        'text-field': ['get', 'name'],
        'text-offset': ['get', 'textOffset'],
        'text-size': ['get', 'textSize'],
        'text-font': ['Sans'],
        'text-allow-overlap': false,
      },
      paint: {
        'text-halo-width': 1,
        'text-halo-color': '#fff',
        'text-color': ['get', 'textColor'],
      },
      // filter: ['all', ['in', 'adcode', '410100', '410182']],
    },
    pickLayer(id): [ILayerType, string | undefined] {
      const layer = this[id];
      layer.id = id;
      let before;
      if (layer.before) {
        before = layer.before;
        delete layer.before;
      }
      return [layer, before];
    },
  },
};

export const LAYER_CONFIG = [
  {
    id: 'TT2',
    label: '温度',
    type: 'isosurface',
    serviceType: 'ec',
    icon: 'icon-temp',
  },
  {
    id: 'WS',
    label: '风力',
    type: 'isosurface',
    serviceType: 'ec',
    icon: 'icon-wind',
  },
  {
    id: 'RH',
    label: '湿度',
    type: 'isosurface',
    serviceType: 'ec',
    icon: 'icon-rh',
  },
  {
    id: 'PS',
    label: '气压',
    type: 'isosurface',
    serviceType: 'ec',
    icon: 'icon-ps',
  },
  {
    id: 'RAIN',
    label: '降水',
    icon: 'icon-rain',
    children: [
      {
        id: 'RAIN_RADAR',
        label: '雷达图',
        type: 'isosurface',
        serviceType: 'ec',
      },
      {
        id: 'RAIN_HOUR',
        label: '逐小时',
        type: 'isosurface',
        serviceType: 'ec',
      },
      {
        id: 'RAIN_ADD',
        label: '累计降水',
        type: 'isosurface',
        serviceType: 'ec/rain12',
      },
    ],
  },
  {
    id: 'lightning',
    label: '闪电',
    serviceType: '',
    type: 'marker',
    icon: 'icon-lightning',
  },
  {
    id: 'convective',
    label: '强对流',
    serviceType: 'scmocs',
    type: 'isosurface',
    icon: 'icon-sc',
  },
];

export interface Option {
  value: string | number;
  label: string;
  coordinates: [number, number];
  children?: Option[];
}

export const cityOptions: Option[] = [
  {
    value: 410100,
    label: '郑州市',
    coordinates: [113.625351, 34.748999],
    children: [
      {
        value: 410102,
        label: '中原区',
        coordinates: [113.611576, 34.748286],
      },
      {
        value: 410103,
        label: '二七区',
        coordinates: [113.645422, 34.730936],
      },
      {
        value: 410104,
        label: '管城回族区',
        coordinates: [113.685313, 34.746453],
      },
      {
        value: 410105,
        label: '金水区',
        coordinates: [113.686037, 34.775838],
      },
      {
        value: 410106,
        label: '上街区',
        coordinates: [113.298282, 34.808689],
      },
      {
        value: 410108,
        label: '惠济区',
        coordinates: [113.61836, 34.828591],
      },
      {
        value: 410122,
        label: '中牟县',
        coordinates: [114.022521, 34.721976],
      },
      {
        value: 410181,
        label: '巩义市',
        coordinates: [112.98283, 34.75218],
      },
      {
        value: 410182,
        label: '荥阳市',
        coordinates: [113.391523, 34.789077],
      },
      // {
      //   value: 410183,
      //   label: '新密市',
      //   coordinates: [
      //     113.380616,
      //     34.537846
      //   ],
      // },
      {
        value: 410184,
        label: '新郑市',
        coordinates: [113.73967, 34.394219],
      },
      // {
      //   value: 410185,
      //   label: '登封市',
      //   coordinates: [
      //     113.037768,
      //     34.459939
      //   ],
      // },
    ],
  },
  {
    value: 411000,
    label: '许昌市',
    coordinates: [113.826063, 34.022956],
    children: [
      {
        value: 411002,
        label: '魏都区',
        coordinates: [113.828307, 34.02711],
      },
      {
        value: 411003,
        label: '建安区',
        coordinates: [113.842898, 34.005018],
      },
      {
        value: 411082,
        label: '长葛市',
        coordinates: [113.768912, 34.219257],
      },
    ],
  },
];
