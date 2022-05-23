const UserModel = require('../models/User')
// const bcrypt = require("bcrypt");
const passport = require("passport");


exports.register = async (req, res) => {
    UserModel.register(
        {
            username: req.body.username,
            name: req.body.name,
            address: req.body.address,
            city: req.body.city
    }, req.body.password, function (err, user) {
        if (err){
            console.log(err)
            res.redirect("/catalog")
        }else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/settingsOfAccount")
            });
        }
    })
};



exports.login = async (req, res) => {
    let user =new UserModel({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user, function (err){
        if (err){
            console.log(err)
        }else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/settingsOfAccount")
            });
        }
    })

};


// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.name && !req.body.password && !req.body.address) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    });

    await user.save().then(data => {
        // res.send({
        //     message:"User created successfully!!",
        //     user:data
        // });

        res.render('login.ejs',{isSaved: true})

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec(); //change params to query
        //const user = await UserModel.findById(req.query.id); //change params to query
        //res.status(200).json(user);
        if (user===null){
            res.status(404).send("User not found")
        }else{
            res.status(200).render('settingsOfAccount')
        }

    } catch(error) {
        //res.status(404).json({ message: error.message});
        res.status(404).send(error.message)
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {

    const email = req.params.oldEmail;
    // const query = req.body.oldEmail;

    //await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    await UserModel.findOneAndUpdate({email: email}, {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city
    }).then(data => {
        console.log(data)
        if (!data) {
            //res.status(404).send({message: `User not found.`});
            res.status(404).send('User not found')
        }else{
            //res.send({ message: "User updated successfully." })
            res.status(200).render('settingsOfAccount', {
                username: req.body.username,
                name:  req.body.name,
                address: req.body.address,
                city: req.body.city
            })
        }
    }).catch(err => {
        //res.status(500).send({message: err.message});
        res.status(500).send(err.message)
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {

    //await UserModel.findByIdAndRemove(req.params.id).then(data => {
    let useremail = req.body.username
    await UserModel.deleteOne({email: useremail}).then(data => {
        //await UserModel.findByIdAndRemove(req.query.id).then(data => {
        //console.log(data)
        if (data.deletedCount===0) {
            //res.status(404).send({ message: `User not found.`});
            res.status(404).send("User not found")

        } else {
            //res.send({message: "User deleted successfully!"});

            res.status(200).redirect('/')
        }
    }).catch(err => {
        //res.status(500).send({ message: err.message });
        res.status(500).send(err.message)
    });
};

// exports.authGoogle = async (req, res) => {
//     passport.authenticate('google',{
//         scope: ["profile"]
//     })
// }
