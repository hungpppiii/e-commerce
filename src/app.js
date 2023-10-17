// require('dotenv').config();
import 'dotenv/config'
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// init middlewares
app.use(morgan('dev')); //logging
app.use(helmet()); // security - block curl --include...
app.use(compression()); //

app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// init db
import './dbs/init.mongodb.js'
import { checkOverload } from './helpers/check.connect.js';
checkOverload();
// init routes

// errors handler

app.use('/', (req, res) => {
    res.send('Hello people!');
})

export default app;