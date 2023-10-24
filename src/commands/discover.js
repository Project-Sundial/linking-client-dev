import { spawn, exec } from 'child_process';
import { wrap, parse } from '../utils/cronjob.js';
import readline from 'readline';
import cron from 'node-cron';
import { addPath } from '../utils/addPath.js';

// Main discover command
export const discover = () => {
  exec('crontab -l', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error listing crontab: ${error}`);
      return;
    }
    console.log(stdout);
    editCrontab(stdout);
  });
};

// Edits the crontab interactively
const editCrontab = (crontabText) => {
  crontabText = addPath(crontabText);
  
  const lines = crontabText.split('\n');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const modifiedLines = [];
  let count = 1;

  const processLine = (index) => {
    if (index >= lines.length) {
      rl.close();
      saveCrontab(modifiedLines.join('\n'));
      return;
    }

    let line = lines[index];
    const { schedule, command } = parse(line)
    
    if (!cron.validate(schedule) || command.startsWith('sundial run')) {
      modifiedLines.push(line);
      processLine(index + 1);
      return;
    }

    rl.question(`Add cronjob ${count}:\n${line}\n[y/n/q (quit)]: `, async (answer) => {
      count += 1;
      if (answer.toLowerCase() === 'y') {
        line = await wrap(line);
        console.log(modifiedLines);
      } else if (answer.toLowerCase() === 'q') {
        rl.close();
        modifiedLines.push(...lines.slice(index));
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
  const process = spawn('crontab', ['-']);

  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  process.on('close', (code) => {
    if (code === 0) {
      console.log('Crontab updated.');
    } else {
      console.error(`Error saving crontab, exit code: ${code}`);
    }
  });

  process.stdin.write(crontabText);
  process.stdin.end();
};
