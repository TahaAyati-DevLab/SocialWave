const express = require("express")
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname,"..","public")))
app.use("/css",express.static(path.join(__dirname,"public/css")))
app.use("/js",express.static(path.join(__dirname,"public/js")))
app.use("/fonts",express.static(path.join(__dirname,"public/fonts")))
app.use("/images",express.static(path.join(__dirname,"public/images")))


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.get("/",(req,res)=>{
    res.render("index")
})

module.exports = app