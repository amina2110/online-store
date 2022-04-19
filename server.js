const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require('body-parser')
app.use(express.static("public"))
const https = require('https')
const {response} = require('express')
app.use(bodyparser.urlencoded({extended:true}))


app.use("/", require("./routes/main"));
app.use("/sign", require("./routes/sign"));
app.use("/sign/register", require("./routes/register"));
app.use("/cart",require("./routes/cart"))
app.use("/aboutus",require("./routes/aboutus"))
app.use("/catalog",require("./routes/catalog"))
app.use("/contacts",require("./routes/contacts"))
app.use("/compare",require("./routes/compare"))
app.use("/login",require("./routes/login"))

app.set('view engine', 'ejs')


app.post('/',(req,res)=>{
    let apikey = "ae2410b0f8a14085ba316bf75c945781"
    let url = "https://api.ipgeolocation.io/ipgeo?apikey="+apikey
    https.get(url,function(response){
        response.on('data',data=>{
            let currency_code = JSON.parse(data).currency.code
            let symbol = JSON.parse(data).currency.symbol
            let apikey2 = "42909bccc86de9487243"
            let url2 = "https://free.currconv.com/api/v7/convert?q=RUB_"+currency_code+"&compact=ultra&apiKey="+apikey2
            https.get(url2,function (responsem){
                responsem.on('data2',data2=>{
                    let n = JSON.parse(data2)
                    let rub = req.body.price;
                    app.get('main',(req,res,next)=>{
                        res.render("main",{
                            var1: n*rub+" "+symbol
                        })
                    })
                })
            })
        })
    })

})




app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

