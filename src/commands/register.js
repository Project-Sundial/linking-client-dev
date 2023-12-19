import fs from 'fs';
import path from 'path';
import { replaceSystemdService } from '../services/replaceSystemdService.js';
import { EXECUTABLE_PATH } from '../constants/paths.js';
import { registerMachine } from '../services/api.js';
import readline from 'readline';
import { allowUFWRule } from '../services/allowUFWRule.js';

export const register = async (options) => {
  if (!options.apiKey) {
    console.error('Error: Please provide --apiKey argument');
    return;
  }

  if (process.getuid() !== 0) {
    console.error('This command requires administrative (sudo) privileges.\n\n'+
      `Please enter the following command:\n` +
      `sudo sundial register -a ${options.apiKey}`);
    return;
  }

  const data = {
    API_KEY: options.apiKey,
  };

  if (options.local) {
    data.REMOTE_IP_ADDRESS = 'host.docker.internal';
    data.HUB_IP_ADDRESS = 'localhost';
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    const question1 = `\nEnter remote host (current host, where crontab is stored) private IP address: `;
    const question2 = `\nEnter monitoring system host (hub host) private IP address: `;
  
    data.REMOTE_IP_ADDRESS = await new Promise((resolve) => {
      rl.question(question1, resolve);
    });
    data.HUB_IP_ADDRESS = await new Promise((resolve) => {
      rl.question(question2, resolve);
    });
  
    rl.close();
  }

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

  if (options.ufw) {
    allowUFWRule();
  }
  await registerMachine();
  if (options.daemonizeServer) {
    replaceSystemdService('sundial-listen', `${EXECUTABLE_PATH} listen`);
  }
};