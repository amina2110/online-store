const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const userSchema = new Schema({
    name: String,
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt:{
        type: Date,
        default: () => Date.now(),
    },
    address: {
        street: String,
        city: String,
    },
    roles: [
        {type: String,
        ref: 'roles'}
    ]
})

userSchema.methods.sayHi = function() {
    console.log(`Hi. My name is ${this.name}`)
}

userSchema.statics.findByName = function (name){
    return this.find({name: new RegExp(name, 'i')})
}

userSchema.query.byName = function (name){
    return this.where({name: new RegExp(name, 'i')})
}

userSchema.virtual("namedEmail").get(function (){
    return `${this.name} <${this.email}>`
})

userSchema.pre('save', function (next){
    this.updatedAt = Date.now()
    next()
    throw new Error("Fail Save")
})

// userSchema.post('save', function (doc, next){
//     doc.sayHi()
//     next()
// })


module.exports = mongoose.model("users", userSchema)
