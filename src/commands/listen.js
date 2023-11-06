import express from 'express';
import { exec } from 'child_process';

export const listen = () => {
  const app = express();
  const port = 56789;
  
  const logFile = '/Users/davidperez/Documents/Capstone/Sundial/cli/sundial_logs.txt';
  
  app.get('/', (req, res) => {
    const executablePath = `/usr/local/bin/sundial update > ${logFile} 2>&1`;
  
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
  });

  app.post('/trigger-sync', (req, res) => {
    const executablePath = `/usr/local/bin/sundial update > ${logFile} 2>&1`;
  
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
  
  app.listen(port, () => {
    console.log(`Host daemon listening on ${port}`);
  });
}
