require('dotenv').config();
const express = require("express");
const bodyparser = require('body-parser')
const ejs = require('ejs')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const dbConfig = require('../2nd_assaignment/config/database.config.js');
const UserRoute = require('./routes/UserRoute')
const OrderRoute = require('./routes/OrderRoute')
const CategoryRoute = require('./routes/CategoryRoute')
const PositionRoute = require('./routes/PositionRoute')
const RoleRoute = require('./routes/RoleRoute')
const CartRoute = require('./routes/CartRoute')
const CartController = require(__dirname+'/controllers/CartController')
const {response} = require('express')
const https = require('https')


const session = require('express-session')
const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static("public"))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))
app.use(bodyparser.json())

const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json')

// const swaggerJSDoc = require('swagger-jsdoc')
// const swaggerUI = require('swagger-ui-express')
//
// const swaggerOptions ={
//     definition: {
//         openapi: '3.0.0',
//         info:{
//             title: 'My Online-Store',
//             version: '1.0.0',
//             description: 'Online-Store'
//             contact:{
//                 name: 'Someone',
//             },
//             servers:["http://localhost:3000"]
//         }
//     },
//     apis:["server.js"]
// }

// const swaggerDocs = swaggerJSDoc(swaggerOptions)
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))



mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.use('/cart', CartRoute)
app.use('/user',UserRoute)
app.use('/category',CategoryRoute)
app.use('/order',OrderRoute)
app.use('/position',PositionRoute)
app.use('/role',RoleRoute)



app.get('/',(req,res)=>{
    let apikey = "ae2410b0f8a14085ba316bf75c945781"
    let url = "https://api.ipgeolocation.io/ipgeo?apiKey="+apikey
    https.get(url,function(response1){
        response1.on('data',data=>{
            let text = JSON.parse(data)
            let code = String(text.currency.code)
            let symbol = text.currency.symbol
            let apiKey2 = "42909bccc86de9487243"
            let url2 = "https://free.currconv.com/api/v7/convert?q=RUB_"+code+"&compact=ultra&apiKey="+apiKey2
            https.get(url2,function (response1){
                response1.on('data',data=>{
                    let text2 = JSON.parse(data)
                    let text3 = Number(text2.RUB_KZT)
                    let price = Math.round(text3)
                    res.render(__dirname+'/views/main.ejs',{
                        currency: price,
                        symbol1: symbol
                    })
                })
            })
        })
    })
})

app.post('/',(async (req, res) => {
    await CartController.create(req, res)
}))

app.delete('cart/name?_method=DELETE',async (req, res) => {
    await CartController.destroy(req, res)
})



app.get("/login", function(req, res){
    res.render("login" ,{
        isSaved: false,
    });
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get('/settingsOfAccount',(req,res) => {
    // console.log(req.user.username)
    // console.log(req.user.name)
    // console.log(req.user.address)
    // console.log(req.user.city)

    if(req.isAuthenticated()){
        res.render('settingsOfAccount',{
            name: req.user.name,
            username: req.user.username,
            address: req.user.address,
            city: req.user.city
            }
        )
    }else{
        res.redirect("/")
    }
})

app.get('/update', (req, res) => {
    res.render('update');
});

// app.get('/changePassword', (req, res) => {
//     res.render('changePassword');
// });

app.get('/authorization', (req,res) => {
    if(req.isAuthenticated()){
        res.render('AuthorizationWithGoogle')
    }else{
        res.send("Can't authorize")
    }
})



app.get("/auth/google",
    passport.authenticate('google',{ scope: ["profile"] })

)

app.get('/auth/google/online-store',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/authorization');
    });


// app.use('/',require("./routes/main"))
app.use("/aboutus", require("./routes/aboutus"));
app.use("/cart", require("./routes/cartRoute"));
app.use("/catalog", require("./routes/catalog"));
app.use("/compare", require("./routes/compare"));
app.use("/contacts", require("./routes/contacts"));
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));


app.get("/logout",function (req, res){
    req.logout()
    res.redirect("/")
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

