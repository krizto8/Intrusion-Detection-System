const express = require("express");
const mongoose = require("mongoose");


const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

const { spawn } = require('child_process');

const pythonProcess = spawn('python', ['./logic/main.py']);

pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
  });
  
pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });

app.use("/api/au", require("./routes/au.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

