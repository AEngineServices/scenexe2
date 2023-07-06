const express = require("express")
const app = express()
const request = require("request")
const path = require("path")

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const requestParams = (url, type, body) => ({
    url,
    gzip: true,
    method: type ? type : "GET",
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3163.100 Safari/537.36"
    }
})

app.all("/*", (req, res) => {
  console.log(req.path)
    request(requestParams('https://scenexe2.repl.co'+req.path, req.method), (err, _, body) => {
        res.send(body)
    })
})

app.listen(8080)
