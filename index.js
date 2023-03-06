require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 9999
const fs = require("fs")

const data = fs.readFileSync("index.txt", "utf-8")
console.log(data)

app.listen(port, () => console.log("server start"))