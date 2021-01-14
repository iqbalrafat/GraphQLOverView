const express = require ('express');
const graphqlHTTP = require('express-graphql');


//To make express understand graphql we use middleware graphqlHTTP which is a method and we can 
//define object in that method. So whenever we hit graphql route it invoke middleware
//This middleware should have schema by definition.
app.use('/graphql',graphqlHTTP({}
));

const app =  express();





app.listen(3000,()=>console.log('server is running on port 3000')
);