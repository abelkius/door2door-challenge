import express from 'express';
import bodyParser from 'body-parser';
import {restRouter} from './api';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(restRouter);

// app.all('*', (req, res) => {
//   res.json({ok: true});
// });

export default app;
