process.env.NODE_ENV = 'production';

const functions = require('firebase-functions');

const app = require('./server');

exports.nprauth = functions.https.onRequest(app);
