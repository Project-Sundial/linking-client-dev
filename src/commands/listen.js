import express from 'express';
import { exec } from 'child_process';
import { EXECUTABLE_PATH } from '../constants/paths.js';
import { LISTENER_PORT } from "../constants/ports.js";

export const listen = () => {
  const app = express();
  let counter = 0;

  app.post('/trigger-sync', (req, res) => {
    const executablePath = `${EXECUTABLE_PATH} update`;

    counter += 1;
    exec(executablePath, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`Output: ${stdout}`);
    });
    console.log(`Received trigger request. Initiating sundial update request number ${counter}.`);
    res.status(200).send('CLI update call initiated. Count: ');
  });
  
  app.listen(LISTENER_PORT, () => {
    console.log(`Remote host daemon listening on ${LISTENER_PORT}`);
  });
}
