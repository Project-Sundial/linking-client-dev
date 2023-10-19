import { spawn } from 'child_process';
import generateRunToken from '../utils/generateRunToken.js'
import { pingMonitor } from '../services/serverPing.js';

const exec = async (program) => {
  const endpointKey = program.args[1];

  const startTime = Date.now();
  const runToken = generateRunToken();
  let status = "started";

  const startPing = { startTime, runToken, status };

  const args = program.args.slice(2);
  const commandString = args.join(' ');

  await pingMonitor(startPing, endpointKey);

  // Execute the command using the shell
  const childProcess = spawn(commandString, {
    shell: true,
    stdio: 'inherit', // To inherit the standard I/O streams
  });

  childProcess.on('error', (error) => {
    console.error('Error:', error);
  });

  const endTime = Date.now();
  const endPing = { startTime, endTime, runToken };

  childProcess.on('exit', async (code) => {
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
