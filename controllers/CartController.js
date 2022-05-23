const cartModel = require('../models/Cart')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.name
        // !req.body.date && !req.body.order && !req.body.list && !req.body.user
    ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const cart = new cartModel({
        date: req.body.date,
        img: req.body.img,
        name: req.body.name,
        cost: req.body.cost,
    });

    await cart.save().then(data => {
        // res.send({
        //     message:"Order created successfully!!",
        //     user:data
        // });
        res.render("cart.ejs",{
            isEmpty: false,
            name: req.body.name,
            img: req.body.img,
            cost: req.body.cost,
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating order"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await cartModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await cartModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await cartModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Order not found.`
            });
        }else{
            res.send({ message: "Order updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) =>
    {
        //await UserModel.findByIdAndRemove(req.params.id).then(data => {
        let name = req.body.name
        await cartModel.deleteOne({name: name}).then(data => {
            //await UserModel.findByIdAndRemove(req.query.id).then(data => {
            //console.log(data)
            if (data.deletedCount===0) {
                //res.status(404).send({ message: `User not found.`});
                res.status(404).send("Order not found")

            } else {
                //res.send({message: "User deleted successfully!"});

                res.status(200).render("cart.ejs", {isEmpty: true})
            }
        }).catch(err => {
            //res.status(500).send({ message: err.message });
            res.status(500).send(err.message)
        });
    };

