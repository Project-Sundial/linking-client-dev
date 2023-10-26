import axios from "axios";
import {
  BASE_URL,
  CREATE_MONITOR,
  PING_MONITOR
} from "../constants/routes.js";

export const pingMonitor = async (ping, endpointKey, event) => {
  try {
    const URL = BASE_URL + PING_MONITOR + endpointKey + '?event=' + event
    console.log(URL);
    console.log(ping, event);
    const { data } = await axios.post(URL, ping);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createMonitor = async (newMonitor) => {
  try {
    const { data } = await axios.post(BASE_URL + CREATE_MONITOR, newMonitor);
    return data;
  } catch (e) {
    console.log(e);
  }
};