import axios from "axios";
import {
  BASE_URL,
  CREATE_MONITOR,
  PING_MONITOR
} from "../constants/routes.js";

export const pingMonitor = async (ping, endpointKey) => {
  try {
    console.log(BASE_URL + PING_MONITOR + endpointKey);
    console.log(ping);
    const { data } = await axios.post(BASE_URL + PING_MONITOR + endpointKey, ping);
    return data;
  } catch (e) {
    console.log(e);
  }
};

// export const createMonitor = async (newMonitor) => {
//   const { data } = await axios.post(BASE_URL + CREATE_MONITOR, newMonitor);
//   return data;
// };