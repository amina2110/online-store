const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(__dirname+"/aboutus.ejs"))
    .post((req, res) => res.sendFile("POST"));
module.exports = router;