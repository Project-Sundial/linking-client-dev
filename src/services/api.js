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
    const remoteIP = getRemoteIpAddress() || {};
    const { data } = await axios.post(URL, { ...ping, remoteIP }, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createMonitor = async (newMonitor) => {
  try {
    const HEADERS = getHeaders();
    const BASE_URL = getBaseUrl();
    const remoteIP = getRemoteIpAddress() || {};
    const { data } = await axios.post(BASE_URL + CREATE_MONITOR, { ...newMonitor, remoteIP }, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const registerMachine = async () => {
  try {
    const HEADERS = getHeaders();
    const BASE_URL = getBaseUrl();
    const remoteIP = getRemoteIpAddress() || {};
    console.log(remoteIP);
    const { data } = await axios.put(BASE_URL + CREATE_MACHINE, { remoteIP }, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getUpdates = async () => {
  try {
    const HEADERS = getHeaders();
    const BASE_URL = getBaseUrl();
    const remoteIP = getRemoteIpAddress() || {};
    const params = { remoteIP };
    const config = {
      headers: HEADERS,
      params: params,
    };

    const { data } = await axios.get(BASE_URL + GET_MONITORS, config);
    return data;
  } catch (error) {
    console.error('Error fetching updates:', error);
    throw error;
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