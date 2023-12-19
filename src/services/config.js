import fs from 'fs';
import { CONFIG_PATH } from '../constants/paths.js';
import { BACKEND_PORT } from "../constants/ports.js";
import { error } from 'console';
import os from 'os';
import { PROTOCOL } from '../constants/protocols.js';

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
      'Authorization': `Bearer ${apiKey}`,
    },
  };
};

export const getHubIpAddress = () => {
  let hubIPAddress='';

  try {
    const configFileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = JSON.parse(configFileContents);
    hubIPAddress = config.HUB_IP_ADDRESS
  } catch(e) {
    error(`Error:`, e);
    error(`Please register the monitor systems private IP address with sundial register before using the CLI`);
  }

  return hubIPAddress;
};

export const getRemoteIpAddress = () => {
  let remoteIpAddress='';

  try {
    const configFileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = JSON.parse(configFileContents);
    remoteIpAddress = config.REMOTE_IP_ADDRESS;
  } catch(e) {
    error(`Error:`, e);
    error(`Please register the monitor systems private IP address with sundial register before using the CLI`);
  }

  return remoteIpAddress;
};

export const getBaseUrl = () => {
  return PROTOCOL + getHubIpAddress() + ':' + BACKEND_PORT;
};