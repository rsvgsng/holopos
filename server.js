const port = 80 || process.env.PORT 

const mongoose = require('mongoose');
const express = require("express")
const mainRoute = require('./routes/routeMain')
const app = express()
const dotenv =  require('dotenv')
const bodyParser = require('body-parser')
const upload = require('express-fileupload')
const itemModel = require('./models/ItemModel')


dotenv.config()
app.use(express.static('public'))
app.use(upload())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.set('strictQuery', false);

app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'HOLOPOS');
    res.setHeader('Server', 'Numa Server');
    next();
});

// Image Route Definitions

app.get("/api/v1/ProductImage/:image", async(req, res) => {
    try{
        
          a = await  itemModel.find({
            ItemImage:req.params.image
            })

        if(a.length<1) return res.status(404).send("<h1> 404 File not found </h1>")

         res.sendFile(__dirname + "/files/ProductImages/" + req.params.image)

    }catch{
        res.status(404).send("<h1> 404 File not found </h1>")
    }

})

app.get("/", (req, res) => {
    res.send("<h1> Server is up and running :) </h1>")
})

app.use("/api/v1/",mainRoute)

app.get("*", (req, res) => {
    res.status(404).send("<h1> 404 Page not found </h1>")
})

app.listen(port, () => {
    console.log("Server is running on port "+port)
})

mongoose.connect('mongodb://127.0.0.1:27017/holopos').then(() => console.log('Connected!'));
