const express =require('express');
const app =express();
const bodyParser=require('body-parser');
const morgan =require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');
// const multer =require('multer');

//http://localhost:3000/api/v1/products

app.use(cors());
app.options('*', cors())

require('dotenv/config');
const api=process.env.API_URL;
const productsRouter=require('./routers/products');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');

const authJwt = require('./helpers/jwt');
const errorHandler= require ('./helpers/error-handler');



//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

app.use(`${api}/products`,productsRouter);
app.use(`${api}/categories`,categoriesRouter);
app.use(`${api}/users`,usersRouter);
app.use(`${api}/orders`,ordersRouter);


mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'eshop-database'

})
.then(()=>{
    console.log('Database connection is ready')
})
.catch((err)=>{
    console.log(err);
})
// app.listen(3000);
//     ()=>{

//     console.log('server is running http://localhost:3000');
// }) 

var server=app.listen(process.env.PORT || 3000,function (){
    var port =server.address().port;
    console.log("Express is working on port" + port)
})