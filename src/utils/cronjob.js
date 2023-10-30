import { createMonitor } from '../services/api.js';

export const wrap = async (job) => {
  const { schedule, command, endpoint_key } = await createMonitor(parse(job));
  return `${schedule} sundial run ${endpoint_key} ${command}`;
}

export const generateCronString = (job) => {
  const { schedule, command, endpointKey } = job
  return `${schedule} sundial run ${endpointKey} ${command}`;
}

export const parse = (job) => {
  const arr = job.split(' ');
  const schedule = arr.slice(0, 5).join(' ');
  const command = arr.slice(5).join(' ');
  return { schedule, command, type:'dual' }
}