import { getUpdates } from '../services/api.js';
import { generateCronString } from '../utils/cronjob.js';
import { exec, spawn } from 'child_process'

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

const hasUpdatesorDeletes = ( newCronData ) => {
  return newCronData.delete.length > 0 || newCronData.update.length > 0;
}

const getLinesEndpointKey = (line) => {
  const arr = line.split(' ');
  let command = arr.slice(5).join(' ');
  let endpointKey;
  if (command.startsWith('sundial run')) {
    endpointKey = arr.slice(7,8)[0];
  }

  return endpointKey;
}


const generateCrontab = async ( newData ) => {
  const currentCrontab = await fetchCrontab();
  const newCrontab = [];
  console.log("Curent", currentCrontab)
  console.log("New data", newData)

  if (hasUpdatesorDeletes(newData)) {
    const lines = currentCrontab.split('\n');

    for (const line of lines) {
      if (line.length < 1) {
        continue;
      }
      if (line[0] === '#') {
        newCrontab.push(line);
        continue;
      }
      const endpointKey = getLinesEndpointKey(line);
      const deletedJob = newData.delete.find(job => job.endpointKey === endpointKey);
      if (deletedJob) {
        continue;
      }
      const updatedJob = newData.update.find(job => job.endpointKey === endpointKey);
      if (updatedJob) {
        newCrontab.push(generateCronString(updatedJob));
        continue;
      }

      newCrontab.push(line);
    };
  } else {
    newCrontab.push(currentCrontab); // assumes the job will not already be in file
  }

  newData.add.forEach(job => newCrontab.push(generateCronString(job)));
  return newCrontab.join('\n');
}

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
    // const updates = await getUpdates();
    const updates = { //for testing
        "add": [{
            "command": "heyfromPostpam",
            "schedule": "* * * * *",
            "endpointKey": "1"
        }],
        "delete": [],
        "update": []
    }
    console.log('the updates retrieved from docker app:', updates)
    if (!updates) {
      console.log('No updates retrieved.');
      return;
    }
    const crontabText = await generateCrontab(updates);
    console.log('Final crontab text before save:', crontabText);
    saveCrontab(crontabText);
  } catch (error) {
    console.log('Error fetching updated jobs from app.', error);
  }
};
