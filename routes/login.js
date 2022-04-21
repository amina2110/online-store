const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render(__dirname+"/views/login.ejs"))
    .post((req, res) => res.sendFile("POST"));
module.exports = router;
