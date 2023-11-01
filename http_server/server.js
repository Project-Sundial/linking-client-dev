const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 56789;

const logFile = '/Users/davidperez/Documents/Capstone/Sundial/cli/sundial_logs.txt'

app.use(express.json());

app.post('/trigger-sync', (req, res) => {
  console.log('Working!');
  const executablePath = `/usr/local/bin/sundial update > ${logFile} 2>&1`;

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