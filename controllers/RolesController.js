const RoleModel = require('../models/Role')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.value) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const role = new RoleModel({
        value: req.body.value,
    });

    await role.save().then(data => {
        res.send({
            message:"Role created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating role"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await RoleModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await RoleModel.findById(req.params.id);
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

    await RoleModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Role not found.`
            });
        }else{
            res.send({ message: "Role updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await RoleModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Role not found.`
            });
        } else {
            res.send({
                message: "Role deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
