import express from 'express';
import {restRouter} from './api';

const app = express();

app.use('/api', restRouter);

app.all('*', (req, res) => {
  res.json({ok: true});
});

export default app;
