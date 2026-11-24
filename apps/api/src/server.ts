import 'dotenv/config';
import { app } from './app.js';
import { connectDatabase } from './db.js';
import { logger } from './logger.js';

const port = Number(process.env.PORT ?? 4000);
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is required. Copy apps/api/.env.example to apps/api/.env.');
}

app.listen(port, () => {
  logger.info({ port }, 'FinManager API listening');
});

void connectDatabase(mongoUri).catch((error: unknown) => {
  logger.error({ err: error }, 'Unable to connect to MongoDB; health endpoint will report degraded');
});
