import { Router } from 'express';
import { isDatabaseConnected } from '../db.js';

export const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  const databaseConnected = isDatabaseConnected();
  response.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'degraded',
    database: databaseConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});
