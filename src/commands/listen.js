import express from 'express';
import { spawn } from 'child_process';
import { EXECUTABLE_PATH } from '../constants/paths.js';
import { LISTENER_PORT } from '../constants/ports.js';

export const listen = () => {
  const app = express();

  app.post('/trigger-sync', (req, res) => {
    const executablePath = EXECUTABLE_PATH;
    const args = [process.argv[1], 'update'];

    const process1 = spawn(executablePath, args);

    process1.stdout.on('data', (data) => {
      console.log(`Output: ${data}`);
    });

    process1.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    process1.on('close', (code) => {
      if (code !== 0) {
        console.error(`Error: Process exited with code ${code}`);
      }
    });

    console.log('Received trigger request. Initiating sundial update request.');
    res.status(200).send('CLI update call initiated.');
  });

  app.listen(LISTENER_PORT, () => {
    console.log(`Host daemon listening on ${LISTENER_PORT}`);
  });
};
