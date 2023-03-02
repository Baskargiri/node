// const express = require("express");
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


import express from "express";
import { MongoClient } from "mongodb";
import moviesRouter from './Routers/movies.router.js';
import  Cors  from 'cors';


const app = express();


// const MONGO_URL = "mongodb://127.0.0.1";

//we hode port in env to deploy online in vercel
const MONGO_URL = process.env.MONGO_URL;

//mongo atlas
export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");



const PORT = process.env.PORT;

app.use(Cors())
app.use("/movies",moviesRouter);

app.get("/", function (request, response) {
  response.send("boss work hard");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
