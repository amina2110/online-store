const mongoose = require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')
const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

let userSchema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        lowercase: true,
        unique: true,
        sparse:true,
        index:true,
    },
    password: {
        type: String,
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
    address: String,
    city: String,
    roles: [
        {type: String,
        ref: 'roles'
        }
    ],

    googleId: String
})


userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)


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

let userModel = new mongoose.model("User", userSchema);

passport.use(userModel.createStrategy())
// passport.serializeUser(userModel.serializeUser())
// passport.deserializeUser(userModel.deserializeUser())


passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err,user)
    })
})

//level 6
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/online-store"
    },
    function(accessToken, refreshToken, profile, cb) {
        userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

module.exports = userModel
