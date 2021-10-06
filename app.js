/*function sayHello(name){
    console.log('Hello '+name);
}

//sayHello('Tehreem');
console.log(window);

const log = require('./logger');

log('message');

//console.log(logger);

const path = require('path'); 

var pathObject=path.parse(__filename);

console.log(pathObject);*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
require('dotenv/config');


const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const databaseName = 'test'
const client = new MongoClient(url);

async function getData() {
    let result = await client.connect();
    db = result.db(databaseName);
    collection = db.collection('stores')
    console.log(`****DB connected **** ${databaseName}`);
    let data = await collection.find({}).toArray();
    console.log(data)
}

getData();


const app = express();

app.use(cors());
app.use(bodyParser.json());


//Import Routes

const postRoutes = require('./routes/posts');

const storeRoutes = require('./routes/stores');

//Middlewares

app.use('/posts', postRoutes);

app.use('/stores', storeRoutes);

//ROUTES

app.get('/', (req, res) => {
    res.send(' Welcome! We are in home');
});

//CONNECT TO DB

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log("Connected to DB....."))
    .catch(err => console.log("Failed to connect to DB", err));


//Listening 
app.listen(3000);