import axios from "axios";
import { generateMockEndpoint } from '../utils/generateRunToken.js';
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

export const addMonitor = async ({ schedule, command }) => {
  try {
    const { data } = await axios.post(BASE_URL + PING_MONITOR + endpointKey, { schedule, command });
    // With server running:
    // return data;

    // Mock data:
    const endpoint_key = generateMockEndpoint();
    return { schedule, command, endpoint_key }
  } catch (e) {
    console.log(e);
  }
}

// export const createMonitor = async (newMonitor) => {
//   const { data } = await axios.post(BASE_URL + CREATE_MONITOR, newMonitor);
//   return data;
// };