import fs from 'fs';
import path from 'path';
import { replaceSystemdService } from '../services/replaceSystemdService.js';
import { EXECUTABLE_PATH } from '../constants/paths.js';
import { registerMachine } from '../services/api.js';
import readline from 'readline';

// export const register = async () => {
//   if (process.getuid() !== 0) {
//     console.error('This command requires administrative (sudo) privileges.\n\n'+
//       `Please enter the following command:\n` +
//       `sudo sundial register\n`);
//     return;
//   }

//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   const question1 = `\nPlease enter `;

//     const userResponse = await new Promise((resolve) => {
//       state.rl.question(question, resolve);
//     });

//     if (userResponse.toLowerCase() === 'y') {
//       line = await wrap(line);
//     } else if (userResponse.toLowerCase() === 'q') {
//       state.done = true;
//       return;
//     }
//   } else {
//     line = await wrap(line);
//   }




//   const data = {
//     API_KEY: options.apiKey,
//     APPLICATION_IP_ADDRESS: options.ipAddress
//     CRON_HOST_IP_ADDRESS
//   };

//   const directoryPath = '/etc/sundial';
//   const filePath = path.join(directoryPath, 'config.json');

//   const jsonData = JSON.stringify(data, null, 2);

//   try {
//     if (!fs.existsSync(directoryPath)) {
//       fs.mkdirSync(directoryPath, { recursive: true });
//     }

//     fs.writeFileSync(filePath, jsonData);
//     console.log(`Data has been written to ${filePath}`);
//   } catch (err) {
//     console.error('Error writing data to the file:', err);
//   }
//   await registerMachine();
//   replaceSystemdService('sundial-listen', `${EXECUTABLE_PATH} listen`);
//   allowUFWRule();
// };

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
};