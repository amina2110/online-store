const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const User = require('../models/User')

router
    .route("/")
    .get((req, res) => res.render("../views/register.ejs"))
    .post((req, res) => {

        mongoose.connect("mongodb://localhost/mongo", () => {
                console.log("connected")
            },
            e=>console.error(e)
        )

        async function run(){
            try {
                const user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    address: {
                        street: req.body.address,
                        city: req.body.city,
                    }
                })

                console.log(user)
                console.log(user.namedEmail)

            }catch (e){
                console.log(e.message)
            }
        }

        run()
    });

module.exports = router;
