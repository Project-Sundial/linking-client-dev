import { spawn } from 'child_process';
import { generateRunToken } from '../utils/generateRunToken.js'
import { pingMonitor } from '../services/api.js';

export const run = async (program) => {
  console.log('Start of a run!');

  // Create ping info
  const ping = { 
    time: new Date(), 
    runToken: generateRunToken() 
  };
  let event = 'started';

  // Store run info
  const commandString = program.args.slice(2).join(' ');
  const endpointKey = program.args[1];

  // Ping monitor
  await pingMonitor(ping, endpointKey, event);

  // Execute the command using the shell, inherit the standard I/O streams
  const childProcess = spawn(commandString, {
    shell: true,
    stdio: 'inherit',
  });

  // Check for errors when spinning up child process
  childProcess.on('error', (error) => {
    console.error('Error:', error);
  });

  // End ping upon exit from process
  await childProcess.on('exit', async (code) => {

    // Store additional end ping info
    ping.time = new Date();

    if (code === 0) {
      console.log('Command completed successfully');
      event = 'completed';
    } else {
      console.error(`Command failed with code ${code}`);
      event = 'failed';
    }

    await pingMonitor(ping, endpointKey, event);

    console.log('End of a run!\n\n');
  });
};
