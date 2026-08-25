import express from 'express';
import db from './config/database';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  const connected = db.readyState === 1;
  res.status(200).json({
    status: 'ok',
    database: connected ? 'connected' : 'disconnected'
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
