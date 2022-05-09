const express = require("express");
const router = express.Router();
const ejs = require('ejs')

router
    .route("/")
    .get((req, res) => res.render("../views/main.ejs",{
        currency: 0,
        symbol1: 0
    }))
    .post((req,res) => res.send("../views/main.ejs"))

module.exports = router;
