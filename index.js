import express from "express";
import fs from fs;
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname,"data","users.json")

function readusers (){
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
}




app.listen(3000,(req,res)=>{
    console.log("App is running at 3000")
})



