export const BASE_URL = 'http://localhost:58669'; // should be env variable
export const PING_MONITOR = '/api/pings/';
export const CREATE_MONITOR = '/api/monitors';
export const GET_MONITORS = '/api/monitors';
export const SYNC_MODE = {
  headers: {
    'X-Sync-Mode': 'CLI',
  },
};