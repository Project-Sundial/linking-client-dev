import axios from "axios";
import {
  BASE_URL,
  CREATE_MONITOR,
  PING_MONITOR
} from "../constants/routes";

export const pingMonitor = async (ping, endpoint_key) => {
  const { data } = await axios.post(BASE_URL + PING_MONITOR + endpoint_key, ping);
  return data;
};

// export const createMonitor = async (newMonitor) => {
//   const { data } = await axios.post(BASE_URL + CREATE_MONITOR, newMonitor);
//   return data;
// };