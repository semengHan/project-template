import { GET, POST, PUT } from "@/utils/request";
import * as API from "./apis";

export function getRadarImageList(params) {
  return GET(API.RADAR_IMAGE_LIST, params);
}

export function getEcData(params) {
  return GET(API.ISOBANDS_LIST, params);
}
