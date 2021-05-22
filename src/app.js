const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const cookieParser = require('cookie-parser');
const cors = require('cors');

const restRouter = require('./api/route-index');
const passport = require('passport');

const configJWTStrategy = require('./api/middleware/passport-jwt');

const morgan = require('morgan');
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use('/covers', express.static(path.join(__dirname + '/uploads/covers')));

app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use(passport.initialize());
configJWTStrategy();

app.use('/api', restRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('client/build'));

  // Handle React routing, return all requests to React app

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use((req, res, next) => {
  const error = new Error('Invalid Route');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  const status = err.code || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message, data });
});
module.exports = app;
