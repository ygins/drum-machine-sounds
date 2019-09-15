const express=require("express");
const fs=require("fs");
const path=require("path");
const cors=require("cors");
const app=express();

app.use(cors());

app.get("/paths", (req, res)=>{
  const responseObj={};
  const sampleDir=path.join(__dirname, "..", "samples");
  fs.readdirSync(sampleDir).forEach(dir => {
    responseObj[dir]=[];
    fs.readdirSync(path.join(sampleDir, dir)).forEach(file => responseObj[dir].push(file.substring(0, file.indexOf("."))));
  });
  res.json(responseObj);
});

app.get("/sound/:dir/:sound", (req, res)=>{
  if(!req.params.dir || !req.params.sound){
    res.status(400);
    res.end();
  }
  const soundPath=path.join(__dirname, "..","samples",req.params.dir,req.params.sound);
  fs.access(soundPath, err=>{
    if(err){
      res.status(404);
      res.end();
    }
    else{
      res.status(200);
      res.download(soundPath);
    }
  });
});

app.listen(2323, ()=>console.log("Listening!"));
