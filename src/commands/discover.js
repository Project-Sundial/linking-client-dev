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
    console.log('\nCurrent crontab:');
    console.log(stdout);
    console.log('');
    editCrontab(stdout);
  });
};


const processLineFull = async (modifiedLines, line) => {
  const { schedule, command } = parse(line);
  
  if (!cron.validate(schedule) || command.startsWith('sundial run')) {
    modifiedLines.push(line);
    return;
  }

  line = await wrap(line);
  modifiedLines.push(line);
}


// Edits the crontab interactively
const editCrontab = (crontabText) => {
  crontabText = addPath(crontabText);
  
  const lines = crontabText.split('\n');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const modifiedLines = [];
  let count = 0;


  rl.question(`\nProcess full crontab or line-by-line? [(f)ull/(l)ine]: `, async (answer) => {
    if (answer.toLowerCase() === 'f' || answer.toLowerCase() === 'full') {
      for (const line of lines) {
        await processLineFull(modifiedLines, line);
      }
      rl.close();
      saveCrontab(modifiedLines.join('\n'));
    } else if (answer.toLowerCase() === 'l' || answer.toLowerCase() === 'line') {
      const processLineIndividual = (index) => {
        if (index >= lines.length) {
          rl.close();
          saveCrontab(modifiedLines.join('\n'));
          return;
        }
      
        let line = lines[index];
        const { schedule, command } = parse(line);
        
        if (!cron.validate(schedule) || command.startsWith('sundial run')) {
          modifiedLines.push(line);
          processLineIndividual(index + 1);
          return;
        }
      
        rl.question(`\nAdd cronjob ${count + 1}:\n${line}\n[y/n/q (quit)]: `, async (answer) => {
          count += 1;
          if (answer.toLowerCase() === 'y') {
            line = await wrap(line);
          } else if (answer.toLowerCase() === 'q') {
            rl.close();
            modifiedLines.push(...lines.slice(index));
            saveCrontab(modifiedLines.join('\n'));
            return;
          }
          modifiedLines.push(line);
      
          processLineIndividual(index + 1);
        });
      };

      processLineIndividual(0);
    } else {
      rl.close();
    }
  });
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
