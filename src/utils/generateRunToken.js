import crypto from 'crypto';
import { RUN_TOKEN_LENGTH } from "../constants/runToken.js";

export const generateRunToken = () => {
  const bytes = crypto.randomBytes(RUN_TOKEN_LENGTH / 2); // Divide by 2 to get the number of bytes
  return bytes.toString('hex');
}

export const generateMockEndpoint = () => {
  const bytes = crypto.randomBytes(RUN_TOKEN_LENGTH / 2); // Divide by 2 to get the number of bytes
  return bytes.toString('hex');
}