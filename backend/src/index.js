import express from "express";
import cors from 'cors'
import db from "./config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';

import routes from "./routes/index.js";

const app = express();  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

db.connect((err) => {
  if (err) {
    console.log('error Connecting:' + err.message);
    return
  }
  console.log('Connection established')
})

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use('/medias', express.static(__dirname + '/medias'));


//routes 
app.use('/api', routes)

app.listen(8000, () => {
    console.log("App is listening on port localhost:8000")
})