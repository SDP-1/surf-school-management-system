const express = require("express");
const router = express.Router();

//Insert Model
const Session = require("../models/SessionModel");

//Insert User Controller
const SessionController = require("../controller/SessionControllers");

router.get("/",SessionController.getAllSessions);
router.post("/",SessionController.addSessions);
router.get("/count", SessionController.getSessionCount);   // route for getting the count of all sessions
router.get("/:id",SessionController.getById);
router.put("/:id",SessionController.updateSession);
router.delete("/:id",SessionController.deleteSession);




//export
module.exports = router;