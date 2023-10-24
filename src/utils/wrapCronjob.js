import { addMonitor } from '../services/serverPing.js';

export const wrap = async (job) => {
  // const { schedule, command, endpoint_key } = await addMonitor(parse(job));
  const { schedule, command } = parse(job);
  const endpoint_key = 'abcde'
  return `${schedule} sundial run ${endpoint_key} ${command}`;
}

export const parse = (job) => {
  const arr = job.split(' ');
  const schedule = arr.slice(0, 5).join(' ');
  const command = arr.slice(5).join(' ');
  return { schedule, command }
}