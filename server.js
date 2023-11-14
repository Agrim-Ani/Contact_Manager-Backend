const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler")
const app = express();
const connectDb = require('./config/dbConnection')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const port = process.env.PORT || 3000;

const swaggerOptions = {

    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'Backend Infrastructure of a Contact Manager Application',
            description:'1.) Authentication:\n\n a.) User First Registers in the platform\n\nb.) Login will return an access token \n\nc.) Use token for authorization in the authorization button\n\n'+
                        '2.) Authorization and CRUD:\n\n a.) Create some contacts under the existing user i.e {POST: /api/contacts} (one with the current token)\n\nb.)Use the other routes to perform the CRUD operations\n\n'+
                        '*NOTE* : The token will expire every 15 min for demonstration purposes, the user needs to login again after 15 min ',
            version: '0.0.1',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer Token',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        // security: [{
        //     bearerAuth: [],
        // },],
        servers: [
            {
            url: 'http://localhost:3000/',
            description: 'Local server',
            },
        ],
    }, 
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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

const userRoute = require("./routes/userRoutes");
app.use('/api/users',userRoute)

/**Your error handler should always be at the end of 
 * your application stack. Apparently it means not only after all
 *  app.use() but also after all your app.get() and app.post() 
 * calls. */
app.use(errorHandler)
app.listen(port,()=>{console.log(`Server is runnning on port ${port}`)})