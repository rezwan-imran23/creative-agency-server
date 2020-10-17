const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require ('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mu8kf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;




const app = express()
app.use(bodyParser.json());
app.use(cors());
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const registrationCollection = client.db("creative-agency").collection("registration");

app.post('/addRegister', (req,res)=>{
    const registration = req.body;
    console.log(registration);
    registrationCollection.insertOne(registration)
    .then(result => {
        res.send(result.insertedCount>0)
    })
})

});

app.listen(process.env.PORT || port);