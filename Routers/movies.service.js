import { client } from "../index.js";

export async function updateMovieByID(id, data) {
  return await client.db('mongodb&node').collection('movies').updateOne({ id: id }, { $set: data });
}
export async function newFunction(id) {
  return await client.db('mongodb&node').collection('movies').deleteOne({ id: id });
}
export async function getallMoviesbyID(id) {
  return await client.db('mongodb&node').collection('movies').findOne({ id: id });
}
export async function updateMovies(data) {
  return await client.db('mongodb&node').collection('movies').insertMany(data);
}
export async function allMovies() {
  return await client.db('mongodb&node').collection('movies').find({}).toArray();
}
