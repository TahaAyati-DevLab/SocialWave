const express = require("express")
const app = express()
const path = require("path")

const {setHeaders} = require("./middlewares/headers.js")
const {errorHandler} = require("./middlewares/errorHandler.js")


app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json({ limit: "50mb" }))

app.use(setHeaders)

app.use(express.static(path.join(__dirname, "..", "public")))
app.use("/css", express.static(path.join(__dirname, "public/css")))
app.use("/js", express.static(path.join(__dirname, "public/js")))
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")))
app.use("/images", express.static(path.join(__dirname, "public/images")))


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.render("index")
})


app.use((req, res) => {
    console.log("Page Not Found :|", req.path)
    return res.status(404).json({ message: "Page not found pleace check path/method" })
})

module.exports = app