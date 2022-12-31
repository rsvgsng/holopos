const mongoose = require('mongoose');
const express = require("express")
const mainRoute = require('./routes/routeMain')
const app = express()
const port = 80 || process.env.PORT 
mongoose.set('strictQuery', false);
app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1> Server is up and running :) </h1>")
})


app.listen(port, () => {
    console.log("Server is running on port "+port)
})
mongoose.connect('mongodb://127.0.0.1:27017/holopos').then(() => console.log('Connected!'));

app.use("/api/v1/",mainRoute)