import fs from 'fs';
import { CONFIG_PATH } from '../constants/paths.js';
import { BACKEND_PORT } from "../constants/ports.js";
import { error } from 'console';
import os from 'os';

export const getHeaders = () => {
  let apiKey = '';

  try {
    const configFileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = JSON.parse(configFileContents);
    apiKey = config.API_KEY;
  } catch(e) {
    error(`Error:`, e);
    error(`Please register your API key with sundial register before using the CLI`);
  }

  return {
    headers: {
      'X-Sync-Mode': 'CLI',
      'Authorization': `Bearer ${btoa(apiKey)}`,
    },
  };
};

export const getApplicationIpAddress = () => {
  let ipAddress='';

  try {
    const configFileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = JSON.parse(configFileContents);
    ipAddress = config.IP_ADDRESS
  } catch(e) {
    error(`Error:`, e);
    error(`Please register your backends private IP address with sundial register before using the CLI`);
  }

  return ipAddress;
};

export const getBaseUrl = () => {
  return getApplicationIpAddress() + ':' + BACKEND_PORT;
};

export function getCLIIP() {
  const interfaces = os.networkInterfaces();
  let IP = null;

  for (const interfaceName in interfaces) {
    if (interfaceName.startsWith('eth') || interfaceName.startsWith('ens')) {
      // Check if the interface is not a loopback and is IPv4
      const iface = interfaces[interfaceName].find(iface => !iface.internal && iface.family === 'IPv4');

      if (iface) {
        IP = iface.address;
        break;
      }
    }
  }

  return { IP };
}
