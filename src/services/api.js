import axios from "axios";
import {
  CREATE_MONITOR,
  PING_MONITOR,
  GET_MONITORS,
  CREATE_MACHINE
} from "../constants/routes.js";
import {
  getHeaders,
  getBaseUrl,
  getRemoteIpAddress
} from "./config.js";


export const pingMonitor = async (ping, endpointKey, event) => {
  try {
    const HEADERS = getHeaders();
    const BASE_URL = getBaseUrl();
    const URL = BASE_URL + PING_MONITOR + endpointKey + '?event=' + event
    const { data } = await axios.post(URL, ping, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createMonitor = async (newMonitor) => {
  try {
    const HEADERS = getHeaders();
    const BASE_URL = getBaseUrl();
    const { data } = await axios.post(BASE_URL + CREATE_MONITOR, newMonitor, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const registerMachine = async () => {
  try {
    const HEADERS = getHeaders();
    const BASE_URL = getBaseUrl();
    const REMOTE_IP = getRemoteIpAddress() || {};
    console.log(REMOTE_IP);
    const { data } = await axios.put(BASE_URL + CREATE_MACHINE, REMOTE_IP, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getUpdates = async () => {
  try {
    const HEADERS = getHeaders();
    const BASE_URL = getBaseUrl();
    const { data } = await axios.get(BASE_URL + GET_MONITORS, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

// export const successfulSync = async (updates) => {
//   try {
//     const { data } = await axios.post(BASE_URL + '/api/synced', updates);
//     return data;
//   } catch (e) {
//     console.error(e);
//   }
// };