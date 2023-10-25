import {
  BASE_URL,
  CREATE_MONITOR,
  PING_MONITOR
} from "../constants/routes.js";

export const pingMonitor = async (ping, endpointKey) => {
  try {
    console.log(BASE_URL + PING_MONITOR + endpointKey);
    console.log(ping);
    const url = BASE_URL + PING_MONITOR + endpointKey;
    const options = {
      method: 'POST', 
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(ping)
    }
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    return data;

  } catch (e) {
    console.log(e);
  }
};

export const createMonitor = async (newMonitor) => {
  try {
    const url = BASE_URL + CREATE_MONITOR;
    const options = {
      method: 'POST', 
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(newMonitor)
    }

  
    const response = await fetch(url, options);
    const data = await response.json();
      
    return data;
  } catch (e) {
    console.log(e);
  }
};