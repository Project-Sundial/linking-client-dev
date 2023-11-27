import { getUpdates } from '../services/api.js';
import { parse } from '../utils/cronjob.js';
import { addPath } from '../utils/path.js';
import { generateCronString } from '../utils/cronjob.js';
import { exec, spawn } from 'child_process'
import cron from 'node-cron';


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

const isJob = ( line ) => {
  const { schedule } = parse(line);
  return cron.validate(schedule);
}

const generateCrontab = async ( newData ) => {
  const currentCrontab = await fetchCrontab();
  const path = addPath('');
  const newCrontab = path ? [] : [path];
  console.log("Current", currentCrontab)
  console.log("New data", newData)

  const lines = currentCrontab.split('\n');
  for (const line of lines) {
    if (!isJob(line) && line.trim().length > 0) {
      newCrontab.push(line);
    }
  };

  newCrontab.push('\n');
  newData.forEach(job => newCrontab.push(generateCronString(job)));
  console.log(newCrontab)
  return newCrontab.join('\n')+'\n';
}

const saveCrontab = ( crontabText ) => {
  console.log('In save crontab, text:', crontabText)
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

export const update = async () => {
  try {
    const updates = await getUpdates();
    console.log('The updates retrieved from docker app:', updates)
    if (!updates) {
      console.log('No updates retrieved.');
      return;
    }
    const crontabText = await generateCrontab(updates);
    console.log('Final crontab text before save:', crontabText);
    saveCrontab(crontabText);
  } catch (error) {
    console.log('Error updating the crontab.', error);
  }
};
