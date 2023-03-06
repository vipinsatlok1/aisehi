require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 9999
const filevale = require('@cyclic.sh/s3fs')



app.get("/", (req, res) => {

    filevale.writeFile("satsahebji.txt", "hello ji mera naam vipin hai", "utf-8", (err, data) => {
        filevale.readFile("satsahebji.txt", "utf-8", (err, data) => {
            res.send("data")
        })
    })
    
})



// let writer = filevale.createWriteStream('hello.txt', {
//     flags: 'w'
// });

// writer.write("sat saheb ji", (err) => {
//     if (err) return console.log(err)
//     const data = filevale.readFileSync("hello.txt", "utf-8")
//     console.log(data)
// })


app.listen(port, () => console.log("server start"))