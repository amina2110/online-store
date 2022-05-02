const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render("../views/catalog.ejs"))
    .post((req, res) => res.sendFile("POST"));
module.exports = router;
