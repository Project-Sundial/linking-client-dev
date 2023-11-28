// import express from 'express';
// import { spawn } from 'child_process';
// import { EXECUTABLE_PATH } from '../constants/paths.js';
// import { LISTENER_PORT } from '../constants/ports.js';

// export const listen = () => {
//   const app = express();

//   app.post('/trigger-sync', (req, res) => {
//     const executablePath = EXECUTABLE_PATH;
//     const args = [process.argv[1], 'update'];

//     const process1 = spawn(executablePath, args);

//     process1.stdout.on('data', (data) => {
//       console.log(`Output: ${data}`);
//     });

//     process1.stderr.on('data', (data) => {
//       console.error(`stderr: ${data}`);
//     });

//     process1.on('close', (code) => {
//       if (code !== 0) {
//         console.error(`Error: Process exited with code ${code}`);
//       }
//     });

//     console.log('Received trigger request. Initiating sundial update request.');
//     res.status(200).send('CLI update call initiated.');
//   });

//   app.listen(LISTENER_PORT, () => {
//     console.log(`Host daemon listening on ${LISTENER_PORT}`);
//   });
// };


import express from 'express';
import { spawn } from 'child_process';
import { EXECUTABLE_PATH } from '../constants/paths.js';
import { LISTENER_PORT } from '../constants/ports.js';
import fs from 'fs';

export const listen = () => {
  const app = express();
  let count = 0;

  app.post('/trigger-sync', (req, res) => {
    count += 1;

    // Log count to file
    const logFilePath = '/etc/sundial-listen.log';
    const logMessage = `Trigger count: ${count}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });

    const executablePath = EXECUTABLE_PATH;
    const args = [process.argv[1], 'update'];

    const process1 = spawn(executablePath, args);

    process1.stdout.on('data', async (data) => {
      const fetchCrontab = async () => {
        const retrieveCurrentCrontab = async () => {
          return new Promise((resolve, reject) => {
            exec('crontab -l', (error, stdout, stderr) => {
              if (error || stderr) {
                console.error(`Error listing crontab: ${error} ${stderr}`);
                reject(error);
                return;
              }
        
              resolve(stdout);
            });
          });
        };
      
        try {
          const currentCrontab = await retrieveCurrentCrontab();
          console.log('Current crontab:', currentCrontab );
          return currentCrontab;
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      let logMessage = await fetchCrontab()

      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
          console.error('Error 2: writing to log file:', err);
        }
      });
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
