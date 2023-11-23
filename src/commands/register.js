import fs from 'fs';
import path from 'path';
import { replaceSystemdService } from '../services/replaceSystemdService.js';
import { EXECUTABLE_PATH } from '../constants/paths.js';
import { registerMachine } from '../services/api.js';
import readline from 'readline';

export const register = async (options) => {
  if (!Object.values(options).every((v) => v)) {
    console.error('Error: Please provide both --ip and --api arguments');
    return;
  }

  if (process.getuid() !== 0) {
    console.error('This command requires administrative (sudo) privileges.\n\n'+
      `Please enter the following command:\n` +
      `sudo sundial register -i ${options.hubIpAddress} -a ${options.apiKey}`);
    return;
  }

  const data = {
    API_KEY: options.apiKey,
    HUB_IP_ADDRESS: options.hubIpAddress
  };

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = `\nEnter remote host (current host, where crontab is stored) private IP address: `;

  data.REMOTE_IP_ADDRESS = await new Promise((resolve) => {
    rl.question(question, resolve);
  });

  rl.close();

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
  // replaceSystemdService('sundial-listen', `${EXECUTABLE_PATH} listen`);
};