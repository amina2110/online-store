const mongoose = require("mongoose");
const Schema =  mongoose.Schema

const roleSchema = new Schema({
    value:
        {type: String,
            default: "USER",
            ref: "users"
        },
})

module.exports = mongoose.model('roles', roleSchema)
