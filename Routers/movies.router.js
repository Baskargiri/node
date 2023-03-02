import  express  from "express";
import { allMovies, updateMovies, getallMoviesbyID, newFunction, updateMovieByID } from "./movies.service.js";

const router = express.Router();








router.get("/", async function (request, response) {
  const movies= await allMovies()
  response.send(movies);
});
// now post medthod to insert data in mondodb through node js or serve in postman 

router.post("/", express.json(), async function (request, response) {
  const data = request.body;
  const result = await updateMovies(data)
  response.send(result);
});

router.get("/:id", async function (request, response) {
  const {id} = request.params;

// get data  from local
  // const datas = movies.find((e)=>e.id === id);
// now getting data with mongo db and connect with node js

const datas = await getallMoviesbyID(id)

  datas ?   response.send(datas)
:   response.status(404).send(" data not found")

});


//delete data in node
router.delete("/:id", async function (request, response) {
  const {id} = request.params;

  const datas = await newFunction(id)
  
  datas.deletedCount >= 1 ?   response.send({messsage: "deleted sucess"}) : response.status(404).send({messsage: "not deleted"})
})

//update data using node
router.put("/:id",express.json(), async function (request, response) {
  const {id} = request.params;
  const data=request.body;

  const datas = await updateMovieByID(id, data);
  response.send(datas)

})

export default router;


