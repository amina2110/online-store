const PositionModel = require('../models/Position')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.name && !req.body.cost && !req.body.category && !req.body.user) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const position = new PositionModel({
        name: req.body.name,
        cost: req.body.cost,
        category: req.body.category,
        user: req.body.user
    });

    await position.save().then(data => {
        res.send({
            message:"Position created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating position"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await PositionModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await PositionModel.findById(req.params.id);
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

    await PositionModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Position not found.`
            });
        }else{
            res.send({ message: "Position updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await PositionModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Position not found.`
            });
        } else {
            res.send({
                message: "Position deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
