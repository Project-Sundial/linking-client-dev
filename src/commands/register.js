import fs from 'fs';
import path from 'path';
import { replaceSystemdService } from '../services/replaceSystemdService.js';
import { EXECUTABLE_PATH } from '../constants/paths.js';
import { registerMachine } from '../services/api.js';
import readline from 'readline';

export const register = async () => {
  if (process.getuid() !== 0) {
    console.error('This command requires administrative (sudo) privileges.\n\n'+
      `Please enter the following command:\n` +
      `sudo sundial register`);
    return;
  }

  // const data = {
  //   API_KEY: options.apiKey,
  //   IP_ADDRESS: options.ipAddress
  // };

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
};