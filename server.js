const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require('body-parser')
const ejs = require('ejs')
app.use(express.static("public"))
const https = require('https')
const {response} = require('express')
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs')


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
                    res.render(__dirname+'/routes/views/main.ejs',{
                        currency: price,
                        symbol1: symbol
                    })
                })
            })
        })
    })
})


app.use("/aboutus", require("./routes/aboutus"));
app.use("/cart", require("./routes/cart"));
app.use("/catalog", require("./routes/catalog"));
app.use("/compare", require("./routes/compare"));
app.use("/contacts", require("./routes/contacts"));
app.use("/login", require("./routes/login"));
app.use("/sign", require("./routes/sign"));
app.use("/sign/register", require("./routes/register"));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

