import { spawn, exec } from 'child_process';
import { wrap, parse } from '../utils/cronjob.js';
import readline from 'readline';
import cron from 'node-cron';
import { addPath, convertPath } from '../utils/path.js';

// Main discover command
export const discover = (options) => {
  exec('crontab -l', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error listing crontab: ${error}`);
      return;
    }
    if (!options.full) {
      console.log('\nCurrent crontab:');
      console.log(stdout);
      console.log('');
    }
    editCrontab(stdout, options.full);
  });
};

// Edits the crontab interactively
const editCrontab = async (crontabText, full) => {
  crontabText = addPath(crontabText);
  const lines = crontabText.split('\n');

  let state = { 
    modifiedLines: [],
    count: 0,
    rl: readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    }),
    done: false,
  };

  let index = 0;
  for (const line of lines) {
    state.line = line;
    await processLine(state, full);
    if (state.done) {
      state.modifiedLines.push(...lines.slice(index));
      state.modifiedLines.push('\n');
      break;
    }
    index += 1;
  }

  state.rl.close();
  saveCrontab(state.modifiedLines.join('\n'));
};

const processLine = async (state, full) => {
  let { modifiedLines, line } = state;
  const { schedule, command } = parse(line);

  if (!cron.validate(schedule) || command.startsWith('sundial run')) {
    modifiedLines.push(convertPath(line));
    return;
  }

  state.count += 1;
  if (!full) {
    const question = `\nAdd cronjob ${state.count}:\n${line}\n[y/n/q (quit)]: `;

    const userResponse = await new Promise((resolve) => {
      state.rl.question(question, resolve);
    });

    if (userResponse.toLowerCase() === 'y') {
      line = await wrap(line);
    } else if (userResponse.toLowerCase() === 'q') {
      state.done = true;
      return;
    }
  } else {
    line = await wrap(line);
  }

  modifiedLines.push(line);
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
