// const express = require("express");
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


import express from "express";
import { MongoClient } from "mongodb";

const app = express();


// const MONGO_URL = "mongodb://127.0.0.1";

//we hode port in env to deploy online in vercel
const MONGO_URL = process.env.MONGO_URL;

//mongo atlas
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");



const PORT = process.env.PORT;
app.get("/movies", async function (request, response) {
  const movies= await client.db('mongodb&node').collection('movies').find({}).toArray()
  response.send(movies);
});




// now post medthod to insert data in mondodb through node js or serve in postman 

app.post("/movies", express.json(), async function (request, response) {
  const data = request.body;
  const result = await client.db('mongodb&node').collection('movies').insertMany(data)
  response.send(result);
});



app.get("/", function (request, response) {
  response.send("boss work hard");
});

app.get("/movies/:id", async function (request, response) {
  const {id} = request.params;

// get data  from local 
  // const datas = movies.find((e)=>e.id === id);
// now getting data with mongo db and connect with node js

const datas = await client.db('mongodb&node').collection('movies').findOne({id: id})

  datas ?   response.send(datas)
:   response.status(404).send(" data not found")

});


//delete data in node
app.delete("/movies/:id", async function (request, response) {
  const {id} = request.params;

  const datas = await client.db('mongodb&node').collection('movies').deleteOne({id: id})
  
  datas.deletedCount >= 1 ?   response.send({messsage: "deleted sucess"}) : response.status(404).send({messsage: "not deleted"})
})

//update data using node
app.put("/movies/:id",express.json(), async function (request, response) {
  const {id} = request.params;
  const data=request.body;

  const datas = await client.db('mongodb&node').collection('movies').updateOne({id: id}, {$set:data});
  response.send(datas)

})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
