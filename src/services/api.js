import axios from "axios";
import {
  BASE_URL,
  CREATE_MONITOR,
  PING_MONITOR,
  GET_UPDATES
} from "../constants/routes.js";

export const pingMonitor = async (ping, endpointKey, event) => {
  try {
    const URL = BASE_URL + PING_MONITOR + endpointKey + '?event=' + event
    const { data } = await axios.post(URL, ping);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createMonitor = async (newMonitor) => {
  try {
    const { data } = await axios.post(BASE_URL + CREATE_MONITOR, newMonitor);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getUpdates = async () => {
  try {
    const { data } = await axios.get(BASE_URL + GET_UPDATES);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const successfulSync = async (updates) => {
  try {
    const { data } = await axios.post(BASE_URL + '/api/synced', updates);
    return data;
  } catch (e) {
    console.error(e);
  }
};