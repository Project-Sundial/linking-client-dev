import { getUpdates, successfulSync } from '../services/api.js';
import { generateCronString } from '../utils/cronjob.js';
import { spawn } from 'child_process'

const formatCronText = ( jobs ) => {
  const wrappedJobs = jobs.map(job => generateCronString(job));
  const crontabText = wrappedJobs.join('\n ');  
  return crontabText;
};

const saveCrontab = (crontabText) => {
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
    console.log('the updates retrieved from docker app:', updates)
    if (!updates) {
      console.log('No updates retrieved.');
      return;
    }
    const crontabText = formatCronText(updates);
    console.log('Final crontab text:', crontabText);
    saveCrontab(crontabText);
    
    // await successfulSync(updates);
  } catch (error) {
    console.log('error fetching updated jobs from docker app', error)
  }
};
