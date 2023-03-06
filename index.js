require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 9999
const fs = require('@cyclic.sh/s3fs') 

console.log("sat saheb")

let writer = fs.createWriteStream('hello.txt', {
    flags: 'w'
});

writer.write("sat saheb ji", (err) => {
    if (err) return console.log(err)
    const data = fs.readFileSync("hello.txt", "utf-8")
    console.log(data)
})


app.listen(port, () => console.log("server start"))