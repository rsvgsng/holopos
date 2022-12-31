const express = require("express")
const app = express()
const port = 80 || process.env.PORT 

app.get("/", (req, res) => {
   res.send("<h1> Server is up and running :) </h1>")
})

app.listen(port, () => {
    console.log("Server is running on port "+port)
})