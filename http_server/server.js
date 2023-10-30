const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 56789;

app.post('/trigger-sync', (req, res) => {
  const executablePath = '/usr/local/bin/sundial update';

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