const express = require("express");

/////
// en el curso no colocaron estas líneas
/////
const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");
/////
const server = express();
const cors = require("cors");
const { Technology } = require("../models");

server.use(express.json());
server.use(express.static(__dirname + "/../public"));
server.use(cors());

/////
// en el curso no colocaron esta línea
/////
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
/////

//server.get("/", async(req,res)=>{
server.get("/api/technologies", async (req, res) => {
  let technologies = await Technology.find();
  console.log(technologies);
  technologies = technologies.map((technology) => {
    technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
    return technology;
  });

  /////
  // en el curso no colocaron esta línea
  /////
  mongoose.disconnect();
  /////

  return res.send({ error: false, data: technologies });
  //return res.send("<h1>H1</h1>");
});

module.exports = server;
