const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler")
const app = express();
const connectDb = require('./config/dbConnection')
const port = process.env.PORT || 3000;

//using middleware
app.use(express.json())
//connect to db
connectDb();
 // app.get('/api/contacts',(req,res)=>{
//     // res.send('get all contacts');
//     res.status(200).json({message: 'get all contacts'});
// });

const contactRoute = require("./routes/contactRoutes")
app.use('/api/contacts',contactRoute)

const userRoute = require("./routes/userRoutes")
app.use('/api/users',userRoute)

/**Your error handler should always be at the end of 
 * your application stack. Apparently it means not only after all
 *  app.use() but also after all your app.get() and app.post() 
 * calls. */
app.use(errorHandler)
app.listen(port,()=>{console.log(`Server is I love you ${port}`)})