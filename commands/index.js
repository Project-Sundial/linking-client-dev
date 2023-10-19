import { spawn } from 'child_process';
import generateRunToken from '../utils/generateRunToken.js'

const exec = (program) => {
  const endpointId = program.args[1];
  const startTime = Date.now();
  const runToken = generateRunToken();
  let status = "started";

  const startPing = { startTime, runToken, status };

  const args = program.args.slice(2);
  const commandString = args.join(' ');

  
  // Execute the command using the shell
  const childProcess = spawn(commandString, {
    shell: true,
    stdio: 'inherit', // To inherit the standard I/O streams
  });

  // Handle errors or completion
  childProcess.on('error', (error) => {
    console.error('Error:', error);
  });

  childProcess.on('exit', (code) => {
    if (code === 0) {
      console.log('Command completed successfully');
    } else {
      console.error(`Command failed with code ${code}`);
    }
  });
};

const command2 = () => {
  // Logic for command2
};

export default {
  exec,
  command2,
};
