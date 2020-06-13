const HttpStatus = require('http-status-codes');
const Keyv = require('keyv');
// const { KeyvFile } = require('keyv-file');

// const debugFileStore = (namespace) => ({
//   store: new KeyvFile({
//     filename: `${__dirname}/../tmp/${namespace}.json`,
//     encode: JSON.stringify,
//     decode: JSON.parse,
//   }),
//   namespace,
// });


// const userStore = new Keyv(debugFileStore('userStore'));
// const gameStore = new Keyv(debugFileStore('gameStore'));
// const scoreStore = new Keyv(debugFileStore('scoreStore'));

const userStore = new Keyv({ namespace: 'userStore' });
const gameStore = new Keyv({ namespace: 'gameStore' });
const scoreStore = new Keyv({ namespace: 'scoreStore' });

function store(req, res, next) {
  req.userStore = userStore;
  req.gameStore = gameStore;
  req.scoreStore = scoreStore;
  next();
}

function notFound(req, res, next) {
  res.status(HttpStatus.NOT_FOUND);
  const error = new Error(`Not Found!!1 - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== HttpStatus.OK
    ? res.statusCode
    : HttpStatus.INTERNAL_SERVER_ERROR;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production'
      ? 'Unknown ERROR' : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
  store,
};
