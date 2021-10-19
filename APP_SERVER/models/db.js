const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'mobileShopDB',
});

mongoose.connection.on('connected', () => {
  console.log('\x1b[32m%s\x1b[0m', `Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
  console.log('\x1b[31m%s\x1b[0m', 'Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('\x1b[33m%s\x1b[0m', 'Mongoose disconnected');
});

require('./phone');
