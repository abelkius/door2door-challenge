const express = require('express');
const bodyParser = require('body-parser');
const appRouter = require('./appRouter');
const cors = require('cors');

// create an express app
const app = express();
// allow cross origin resource sharing
app.use(cors());
// parse the body content
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// use the appRouter
app.use(appRouter);

module.exports = app;
