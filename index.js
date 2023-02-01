const pup = require("puppeteer");
const express = require("express");
 const app = express();
const ejs = require("ejs");
const bp = require("body-parser");


app.use(bp.urlencoded({extended:true}));
app.use(express.static("public"))



const func = async(url) =>{
    const browser = await pup.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path:"public/example.jpg",fullPage:true });
    console.log("sucess");
    await browser.close();
}


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.post("/",(req,res)=>{
    const url = req.body.url;
    func(url);
    console.log("went");
    res.redirect("/");
})




app.listen(3000,() =>{
    console.log("server running on port 3000");
})
