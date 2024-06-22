import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
// import path  from "path";
// import { fileURLToPath } from "url";
import cors from 'cors';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "../dist")));
app.use(cors({
    origin: 'http://localhost:5173'

}));

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})