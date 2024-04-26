const path = require('path')
const express = require("express");
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT;
const connectDB = require('./config/db.js')
const productRoutes = require("./routes/productRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const orderRoutes = require("./routes/orderRoutes.js")
const {notFound, errorHandler} = require("./middleware/errorMiddleware.js")
const cookieParser = require("cookie-parser");
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes.js')


// console.log("********************************************************************")
// console.log(path.join(__dirname, '../frontend/dist'));
// console.log(path.resolve(__dirname,'..', 'frontend','dist','index.html'))
// console.log("********************************************************************")


connectDB(); //Connect to Mongo DB
const app = express();

//Alllow CORS
// const corsOption = {
//     origin:"all",
//     credential:true
// }


//cookie parser middleware
app.use(cookieParser());

// app.use(cors(corsOption))
// const allowCrossDomain = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin','http://localhost:5173');
//     res.header('Acess-Control-Allow-Method','GET,POST,PUT,DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Credentials", true);
//     next()
// }
// app.use(allowCrossDomain);

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

app.options('http://localhost:5173',cors())

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));






app.use('/api/users', userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload', uploadRoutes)

app.get('/api/cookies',(req,res,next)=>{
    res.send(req.cookies.jwt)
})

const __dir_name = path.resolve();
app.use('/uploads', express.static(path.join(__dir_name,'/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'..', 'frontend','dist','index.html'))
    })
}else{
    app.get('/',(req,res)=>{
        res.send('Hello')
    })
}

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log('Server Running'))
