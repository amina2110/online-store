const express = require("express");
const router = express.Router();
const ejs = require('ejs')

router
    .route("/")
    .get((req, res) => res.render(__dirname+"/views/main.ejs"))
module.exports = router;
