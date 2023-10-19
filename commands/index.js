import { spawn } from 'child_process';
import generateRunToken from '../utils/generateRunToken.js'
import { pingMonitor } from '../services/serverPing.js';

const exec = async (program) => {
  // Store start ping info
  const startTime = Date.now();
  const runToken = generateRunToken();
  let status = "started";

  const startPing = { startTime, runToken, status };

  // Store run info
  const commandString = program.args.slice(2).join(' ');
  const endpointKey = program.args[1];

  // Ping monitor
  await pingMonitor(startPing, endpointKey);

  // Execute the command using the shell, inherit the standard I/O streams
  const childProcess = spawn(commandString, {
    shell: true,
    stdio: 'inherit',
  });

  // Check for errors when spinning up child process
  childProcess.on('error', (error) => {
    console.error('Error:', error);
  });

  // Store additional end ping info
  const endTime = Date.now();
  const endPing = { startTime, endTime, runToken };

  // End ping upon exit from process
  await childProcess.on('exit', async (code) => {
    if (code === 0) {
      console.log('Command completed successfully');
      endPing.status = "completed";
    } else {
      console.error(`Command failed with code ${code}`);
      endPing.status = "failed";
    }

    await pingMonitor(endPing, endpointKey);
  });
};

const command2 = () => {
  // Logic for command2
};

export default {
  exec,
  command2,
};
