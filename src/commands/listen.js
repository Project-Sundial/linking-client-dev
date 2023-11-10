import express from 'express';
import { exec } from 'child_process';
import { EXECUTABLE_PATH } from '../constants/paths.js';
import { LISTENER_PORT } from "../constants/ports.js";

export const listen = () => {
  const app = express();
  let counter = 0;
  
  const logFile = '~/sundial_logs.txt';
  
  app.get('/', (req, res) => {
    const executablePath = `${EXECUTABLE_PATH} update > ${logFile} 2>&1`;
  
    counter += 1;
    // console.log('hi');
    // exec(executablePath, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error: ${error.message}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.error(`stderr: ${stderr}`);
    //     return;
    //   }
    //   console.log(`Output: ${stdout}`);
    // });
    res.status(200).send(`This is a test. CLI listener is running!\nCounter is at: ${counter}\nIP: ${req.ip}\n\n`);
  });

  app.post('/trigger-sync', (req, res) => {
    const executablePath = `${EXECUTABLE_PATH} update > ${logFile} 2>&1`;
  
    console.log('hi');
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
    console.log('Received trigger request. Initiating sundial update request.');
    res.status(200).send('CLI update call initiated.');
  });
  
  app.listen(LISTENER_PORT, () => {
    console.log(`Host daemon listening on ${LISTENER_PORT}`);
  });
}
