const CategoryModel = require('../models/Category')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.name && !req.body.imageSrc) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const order = new OrderModel({
        name: req.body.name,
        imageSrc: req.body.imageSrc,
    });

    await order.save().then(data => {
        res.send({
            message:"Category created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating category"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await CategoryModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await CategoryModel.findById(req.params.id);
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

    await CategoryModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Category not found.`
            });
        }else{
            res.send({ message: "Category updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await CategoryModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Category not found.`
            });
        } else {
            res.send({
                message: "Category deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
