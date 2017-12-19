import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import mongoose from 'mongoose';
const mongodbConnector = Promise.promisifyAll(mongoose);
const app = express();
const PORT = 8080;

app.use(bodyParser.json());
mongodbConnector.connectAsync("mongodb://localhost/book-archive-db", { useMongoClient: true })
.then(() => {
  console.log(`MongoDB connected successfully`);
})
.catch((err) => {
  console.log(`Failed to connect MongoDB ${err}`);
});


import auth from './routes/auth';


app.use("/api/auth", auth);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
