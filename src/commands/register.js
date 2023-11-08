import fs from 'fs';
import path from 'path';
import { replaceSystemdService } from '../services/replaceSystemdService.js';
import { allowUFWRule } from '../services/allowUFWRule.js';
import { EXECUTABLE_PATH } from '../constants/paths.js';
import { registerMachine } from '../services/api.js';

export const register = async (args, options) => {
  if (Object.keys(options).length < 2) {
    console.error('Error: Please provide both --ip and --api arguments');
    return;
  }

  if (process.getuid() !== 0) {
    console.error('This command requires administrative (sudo) privileges.\n\n'+
      `Please enter the following command:\n` +
      `sudo sundial register -i ${options.ipAddress} -a ${options.apiKey}`);
    return;
  }

  const data = {
    API_KEY: options.apiKey,
    IP_ADDRESS: options.ipAddress
  };

  const directoryPath = '/etc/sundial';
  const filePath = path.join(directoryPath, 'config.json');

  const jsonData = JSON.stringify(data, null, 2);

  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(filePath, jsonData);
    console.log(`Data has been written to ${filePath}`);
  } catch (err) {
    console.error('Error writing data to the file:', err);
  }

  await registerMachine();
  replaceSystemdService('sundial-listen', `${EXECUTABLE_PATH} listen`);
  allowUFWRule();
};