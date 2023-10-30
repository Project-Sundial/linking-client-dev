import { getUpdates, successfulSync } from '../services/api.js';
import { generateCronString, parse } from '../utils/cronjob.js';
import { exec, spawn } from 'child_process'

const editCrontab = async (crontabText, job) => {
  const newLine = generateCronString(job);
  const newCrontabText = crontabText + '\n' + newLine;
  console.log('newcrontab text:', newCrontabText);
  saveCrontab(newCrontabText);
};

const saveCrontab = (crontabText) => {
  console.log('in save crontab', crontabText)
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
    console.log('the updates retrieved from docker app:', updates)

    exec('crontab -l > /Users/Sofia/Programming/Capstone/capstone-project/cli/log.txt',  { timeout: 5000 }, (error, stdout, stderr) => {
      console.log('in exec')
      if (error) {
        console.error(`Error listing crontab: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log('\nCurrent crontab:');
      console.log(stdout);
      console.log('');
      editCrontab(stdout, updates);
    });
    await successfulSync(updates);
  } catch (error) {
    console.log('error fetching updated from docker app', error)
  }
};
