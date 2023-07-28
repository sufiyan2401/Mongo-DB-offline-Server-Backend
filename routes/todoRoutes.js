const express = require("express");
const route = express.Router();
const todoController = require("../controllers/todoController");

route.post("/insertData", todoController.insertData);
route.get("/getData", todoController.getData);

module.exports = route;
