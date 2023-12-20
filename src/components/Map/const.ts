const stationPoint = [
  {
    type: "Feature",
    properties: {
      lineKey: "L1/L3",
      name: "二七广场站",
      lineName: "1号线/3号线",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L1P16",
    },
    geometry: {
      type: "Point",
      coordinates: [113.6591567993164, 34.75349426269531],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L2/L3",
      name: "东大街站",
      lineName: "2号线/3号线",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L2P14",
    },
    geometry: {
      type: "Point",
      coordinates: [113.67594146728516, 34.75017547607422],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L10Ph1",
      name: "荥阳中医院站",
      lineName: "10号线一期",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L10Ph1P7",
    },
    geometry: {
      type: "Point",
      coordinates: [113.35834503173828, 34.7856559753418],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L10Ph1",
      name: "畅园站",
      lineName: "10号线一期",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L10Ph1P8",
    },
    geometry: {
      type: "Point",
      coordinates: [113.37770080566406, 34.78331756591797],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L6Ph1",
      name: "金桢路站",
      lineName: "6号线一期",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L6Ph1P7",
    },
    geometry: {
      type: "Point",
      coordinates: [113.50656127929688, 34.735538482666016],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L6Ph1",
      name: "奥体中心西站",
      lineName: "6号线一期",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L6Ph1P8",
    },
    geometry: {
      type: "Point",
      coordinates: [113.51826477050781, 34.74090576171875],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L6Ph1Swe",
      name: "昆仑路站",
      lineName: "6号线一期东北段",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L6Ph1SweP2",
    },
    geometry: {
      type: "Point",
      coordinates: [113.58846282958984, 34.730125427246094],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L6Ph1Swe",
      name: "秦岭路二站",
      lineName: "6号线一期东北段",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L6Ph1SweP3",
    },
    geometry: {
      type: "Point",
      coordinates: [113.5974349975586, 34.73013687133789],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L1/L14",
      name: "铁炉站",
      lineName: "1号线/14号线",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L1P6",
    },
    geometry: {
      type: "Point",
      coordinates: [113.5345458984375, 34.76870346069336],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L1",
      name: "市民中心站",
      lineName: "1号线",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L1P7",
    },
    geometry: {
      type: "Point",
      coordinates: [113.54779052734375, 34.763240814208984],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L2",
      name: "刘庄站",
      lineName: "2号线",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L2P7",
    },
    geometry: {
      type: "Point",
      coordinates: [113.67240142822266, 34.84645462036133],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L2",
      name: "柳林站",
      lineName: "2号线",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroStations",
      key: "L2P8",
    },
    geometry: {
      type: "Point",
      coordinates: [113.67509460449219, 34.82931137084961],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L8Ph1",
      name: "东风路主变电所",
      lineName: "8号线一期",
      isSuppliesStation: true,
      havingSignInStation: false,
      type: "MetroSubstations",
      key: "L8Ph1D1",
    },
    geometry: {
      type: "Point",
      coordinates: [113.71295928955078, 34.79795837402344],
    },
  },
  {
    type: "Feature",
    properties: {
      lineKey: "L8Ph1",
      name: "绿博大道主变电所",
      lineName: "8号线一期",
      isSuppliesStation: false,
      havingSignInStation: false,
      type: "MetroSubstations",
      key: "L8Ph1D2",
    },
    geometry: {
      type: "Point",
      coordinates: [113.85543823242188, 34.76416015625],
    },
  },
];

const StationType = {
  MetroStations: {
    icon: "subway",
    focusIcon: "subwayF",
    anchor: "bottom",
  },
  MetroSubstations: {
    icon: "substation",
    anchor: "bottom",
    focusIcon: "substationF",
  },
};

export { stationPoint, StationType };
