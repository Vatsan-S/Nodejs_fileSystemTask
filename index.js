import express from "express";
import * as fs from "node:fs";
import { format } from "date-fns";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

let app = express();
const PORT = 4000;


//middleware
app.use(express.json())


//Home routing
app.get("/", (req, res) => {
  res.status(200).send("Add endpoints create or read to see difference");
});



//create routing
app.get("/create", (req, res) => {
  let today = format(new Date(), "dd-MM-yy-hh-mm-ss");
  res.status(200).send(today);
  fs.writeFile(`./today/${today}.txt`, `${today}`, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("File saved");
  });
});



//read routing
app.get("/read",(req,res)=>{
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename)
  let directoryPath = path.join(__dirname,'/today');
  fs.readdir(directoryPath,(err,files)=>{
    if(err){
      console.log(err)
    }
    else{
      res.status(200).send(files)
      files.forEach((file)=>{
        let filePath = path.join(directoryPath,file);
        fs.readFile(filePath,(err,data)=>{
          if(err){
            console.log(err)
          }
          else{
            console.log(data)
          }
        })
      })
    }
  })
})



//running port
app.listen(PORT, () => {
  console.log("Hello team how are you");
});