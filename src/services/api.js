import axios from "axios";
import {
  BASE_URL,
  CREATE_MONITOR,
  PING_MONITOR,
  GET_MONITORS,
  ADD_ERROR_LOG,
} from "../constants/routes.js";
import {
  getHeaders
} from "../services/headers.js";

export const pingMonitor = async (ping, endpointKey, event) => {
  try {
    const HEADERS = getHeaders();
    const URL = BASE_URL + PING_MONITOR + endpointKey + '?event=' + event
    const { data } = await axios.post(URL, ping, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const addErrorLog = async (entry) => {
  try {
    const HEADERS = getHeaders();
    const { data } = await axios.put(BASE_URL + ADD_ERROR_LOG, entry, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createMonitor = async (newMonitor) => {
  try {
    const HEADERS = getHeaders();
    const { data } = await axios.post(BASE_URL + CREATE_MONITOR, newMonitor, HEADERS);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getUpdates = async () => {
  try {
    const HEADERS = getHeaders();
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