const express = require ('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const app =  express();


//To make express understand graphql we use middleware graphqlHTTP which is a method and we can 
//define object in that method. So whenever we hit graphql route it invoke middleware
//This middleware should have schema by definition.
//schema:schema. since they are same so for ecma6 we can write only once
app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}));




app.listen(3000,()=>{console.log('server is running on port 3000');
});