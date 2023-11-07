import fs from 'fs';
import { CONFIG_PATH } from '../constants/paths.js';
import { BACKEND_PORT } from "../constants/ports.js";
import { error } from 'console';


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

export const getBaseUrl = () => {
  let baseUrl='';

  try {
    const configFileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = JSON.parse(configFileContents);
    baseUrl = config.IP_ADDRESS + ':' + BACKEND_PORT;
  } catch(e) {
    error(`Error:`, e);
    error(`Please register your API key with sundial register before using the CLI`);
  }

  return baseUrl;
};