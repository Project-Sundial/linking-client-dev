import { spawn } from 'child_process';
import { generateRunToken } from '../utils/generateRunToken.js';
import { pingMonitor, addErrorLog } from '../services/api.js';

export const run = async (args) => {
  // Store start ping info
  const time = new Date();
  const runToken = generateRunToken();
  let event = "starting";

  const startPing = { time, runToken };

  // Store run info
  const commandString = args.slice(2).join(' ');
  const endpointKey = args[1];

  // Ping monitor
  pingMonitor(startPing, endpointKey, event);

  let logContent = '';

  const childProcess = spawn(commandString, {
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  childProcess.stderr.on('data', (data) => {
    logContent += data.toString();
  });

  // Check for errors when spinning up child process, send log and end ping
  // childProcess.on('error', async (error) => {

  //   const time = new Date();
  //   const endPing = { time, runToken };
  //   const event = 'failing';
  //   await pingMonitor(endPing, endpointKey, event);

  //   logContent += error.message;
  //   addErrorLog({runToken, logContent});
  // });

  // End ping upon exit from process
  childProcess.on('exit', async (code) => {
  
    // Store additional end ping info
    const time = new Date();
    const endPing = { time, runToken };

    event = (code === 0) ? 'ending' : 'failing';
    pingMonitor(endPing, endpointKey, event);
   
    if (event === 'failing') {
      addErrorLog({runToken, logContent});
    }
  });
};
