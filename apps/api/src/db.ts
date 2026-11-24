import mongoose from 'mongoose';
import { logger } from './logger.js';

export async function connectDatabase(uri: string): Promise<void> {
  mongoose.connection.on('error', (error: Error) => {
    logger.error({ err: error }, 'MongoDB connection error');
  });
  await mongoose.connect(uri);
  logger.info('Connected to MongoDB');
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
