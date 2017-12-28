import express from 'express';
import path from 'path';
import session from 'express-session';
import mongoose from 'mongoose';
import { version } from '../package.json';
import authApi from './auth';
import buoyApi from './buoy';

const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);

// Define if local dev or not
const isLocalDev = process.env.NODE_ENV === 'development';
const app = express();

// Instantiate request logging in the terminal for dev
app.use(logger('dev'));

// Define the CORS options
const corsOptions = {
  origin: ['http://localhost:3005', 'http://localhost:3006'],
  credentials: true,
};
app.use(cors(corsOptions));

/*
 * Instantiate the DB connection
 */

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/test');
const dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'Could not connect to MongoDB :('));
dbConn.once('open', () => {
  console.log('Connected to MongoDB successfully.');
});

const sessionStore = new MongoStore({
  mongooseConnection: dbConn,
});
// Create session tracking with secret and config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Define body parser settings for parsing JSON body from POST requests
app.use(bodyParser.json({ limit: '50mb', }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, }));

// Instantiate Cookie parser
app.use(cookieParser());

// Node status for Load balancer to ping
app.get('/__status__/node', (req, res) => {
  res.send({ version, });
});

// Create endpoint for authentication API
app.use('/auth', authApi);
// Create endpoint for buoy API
app.use('/buoy', buoyApi);

if (!isLocalDev) {
  // If we're not on local dev, then we use Express for routing to the bundle
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
