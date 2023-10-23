import { spawn, exec } from 'child_process';
import generateRunToken from '../utils/generateRunToken.js'
import { pingMonitor } from '../services/serverPing.js';
import readline from 'readline';

const run = async (program) => {
  console.log("Start of a run!");

  // Store start ping info
  const startTime = Date.now();
  const runToken = generateRunToken();
  let status = "started";

  const startPing = { startTime, runToken, status };

  // Store run info
  const commandString = program.args.slice(2).join(' ');
  const endpointKey = program.args[1];

  // Ping monitor
  await pingMonitor(startPing, endpointKey);

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
    const endTime = Date.now();
    const endPing = { startTime, endTime, runToken };

    if (code === 0) {
      console.log('Command completed successfully');
      endPing.status = "completed";
    } else {
      console.error(`Command failed with code ${code}`);
      endPing.status = "failed";
    }

    await pingMonitor(endPing, endpointKey);

    console.log("End of a run!\n\n");
  });
};

// Create a function to edit the crontab interactively
const editCrontab = (crontabText) => {
  const lines = crontabText.split('\n');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const modifiedLines = [];

  const processLine = (index) => {
    if (index >= lines.length) {
      rl.close();
      saveCrontab(modifiedLines.join('\n'));
      return;
    }

    let line = lines[index];
    rl.question(`Edit line ${index + 1}:\n${line}\n[y/n/q (quit)]: `, (answer) => {
      if (answer.toLowerCase() === 'y' && validLine(line)) {
        line 
      } else if (answer.toLowerCase() === 'q') {
        rl.close();
        saveCrontab(modifiedLines.join('\n'));
        return;
      }
      modifiedLines.push(line);

      processLine(index + 1);
    });
  };

  processLine(0);
};

// Create a function to save the modified crontab
const saveCrontab = (crontabText) => {
  exec('crontab -', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error saving crontab: ${error}`);
      return;
    }
    console.log('Crontab updated.');
  }).stdin.write(crontabText);
};


const discover = () => {
  exec('crontab -l', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error listing crontab: ${error}`);
      return;
    }
    console.log(stdout);
    editCrontab(stdout);
  });
};

export default {
  run,
  discover,
};
