const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      console.log("Error", err);
    } else {
      res.render("index", {files});
    }
  });
});

app.post("/create",(req,res)=>{
    const {title, description } = req.body
    fs.writeFile(`./files/${title.split(' ').join('')}.txt`,description,(err)=>{
        if(err){
            console.log(err)
        }
        else(
            res.redirect("/")
        )
    })
})

app.get("/show/:filename",(req,res)=>{
  const {filename} = req.params
  fs.readFile(`./files/${filename}`,"utf-8",(err,file)=>{
    if(err){
      console.log(err)
    }
    else{
      res.render("view",{filename,file})
    }
  })
})

app.listen(3000, () => {
  console.log("Server run at http://localhost:3000");
});
