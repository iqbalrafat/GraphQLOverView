const express = require ('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require ('cors');
const app =  express();
//allow cross origin server
app.use(cors());

//connect to mongoDB
mongoose.connect('mongodb+srv://riqbal:mongodeveloper@cluster0.vgbez.mongodb.net/graphql?retryWrites=true&w=majority',{useNewUrlParser: true});
mongoose.connection.once('open',()=>{
  console.log('connected to database');
});

//To make express understand graphql we use middleware graphqlHTTP which is a method and we can 
//define object in that method. So whenever we hit graphql route it invoke middleware
//This middleware should have schema by definition.
//schema:schema. since they are same so for ecma6 we can write only once
app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}));


//Sever setup
app.listen(3000,()=>{
  console.log("server running port 3000");
});