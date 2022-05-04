const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController')

router
    .route("/")
    .get((req, res) => res.render("../views/register.ejs"))
    .post((req, res) => UserController.create(req, res))

module.exports = router;
