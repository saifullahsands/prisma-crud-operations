const express = require("express")
const globalMiddleware = require("./middlewares/global.middleware")
const reqResInspector = require("express-req-res-inspector");
const rootRoutes=require("./routes/rootRoutes")
const {Server}=require("socket.io")
const { createServer }=require("http")
const app = express()
const server=createServer(app)
const io=new Server(server)





app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(reqResInspector())


// routes define here
app.use("/api/v1",rootRoutes)


app.use(globalMiddleware)


module.exports = server