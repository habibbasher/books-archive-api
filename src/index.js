/**
 * Importing node modules
 */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Promise from 'bluebird';
// const mongodbConnector = Promise.promisifyAll(mongoose);
mongoose.Promise = Promise;
/**
 * Initializing some const
 */
const app = express();
const PORT = 8080;
/**
 * Configuring dotenv. It allows to get constant data from .env file
 */
dotenv.config();
/**
 * Using body-parser for parsing data coming from UI
 */
app.use(bodyParser.json());
/**
 * Connecting MongoDB using mongoose
 */
// mongodbConnector.connectAsync(process.env.MONGODB_URL, { useMongoClient: true })
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true })
.then(() => {
  console.log(`MongoDB connected successfully`);
})
.catch((err) => {
  console.log(`Failed to connect MongoDB ${err}`);
});
/**
 * Importing custom modules for routing
 */
import auth from './routes/auth';
import users from './routes/users';
import books from './routes/books';

/**
 * Using custom routes
 */
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/books", books);

/**
 * Catching all other routes which is not defined
 */
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
/**
 * Server listening to specified port
 */
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
