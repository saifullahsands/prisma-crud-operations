const express = require("express")
const globalMiddleware = require("./middlewares/global.middleware")
const reqResInspector = require("express-req-res-inspector");
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(reqResInspector())


// routes define here



app.use(globalMiddleware)


module.exports = app