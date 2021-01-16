const graphql =require('graphql');
const _=require('lodash');
const Book= require ('../models/book');
const Author = require ('../models/author');
const{GraphQLObjectType,GraphQLString, GraphQLSchema,
   GraphQLID, GraphQLInt,GraphQLList, GraphQLNonNull} = graphql;

// //dummy Data
// var books =[
//   {name: 'Name of the Wind',genre:'Fantasy',id:'1',authorId:'1'},
//   {name: 'The Long Earth',genre:'Sci-Fi',id:'2',authorId:'2'},
//   {name: 'Ertugral The legend',genre:'History',id:'3',authorId:'3'},
//   {name: 'The Hero of Ages',genre:'Fantasy',id:'4',authorId:'2'},
//   {name: 'The Color of Magic',genre:'Fantasy',id:'5',authorId:'3'},
//   {name: 'The Light Fantastic',genre:'Fantasy',id:'6',authorId:'3'},
// ];
// var authors = [
//   {name:'Patrick Rothfuss',age:44,id:'1'},
//   {name:'James Husell',age:36,id:'2'},
//   {name:'Adriana Patrick',age:35,id:'3'},
// ]

const BookType = new GraphQLObjectType({
  name:'Book',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    author:{
      type:AuthorType,
      resolve(parent,args){
        console.log(parent);
        // return _.find(authors,{id:parent.authorId});
        return Author.findById(parent.authorId);
      }      
    }
  })
});
const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
      // return _.filter(books,{authorId:parent.id})  // we apply filter on books array to find authorId 
      return Book.find({
        authorId:parent.id
      });
    }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    book:{
      type: BookType,
      args:{id:{type:GraphQLString}},
      resolve(parent,args){
      //   //code to get data from db /other source
      //  return _.find(books,{id:args.id});
      return Book.findById(args.id);     // Here user will provide the id and we will search on that basis
      }
    },
    author:{
      type: AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        // return _.find(authors,{id:args.id});
        return Author.findById(args.id);
      }
    },
    //To display all data
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
      // return books;
      return Book.find({});

      }
    },
    authors:{
      type:new GraphQLList(AuthorType),
      resolve(parent,args){
      // return authors;
      return Author.find({});
      }
    }
  }
});
  //Mutation is the process of adding, delete, modify 
  const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
      // These are the information that user will enter from front end.
      addAuthor:{
        type: AuthorType,
        args:{
          name:{type:GraphQLNonNull(GraphQLString)}, // GraphQLNonNull will do the validation that field should not be null.
          age:{type: GraphQLNonNull(GraphQLInt)}
        },
        // Now we will take the dat provided by user and check the Author schema and enter value into database.
        resolve(parent,args){
          let author = new Author({
            name:args.name,
            age:args.age
          });
          return author.save();  // to save data in database and get the result back
        }
      },
      addBook:{
        type: BookType,
        args:{
          name:{type:GraphQLNonNull(GraphQLString)},
          genre:{type:GraphQLNonNull(GraphQLString)},
          authorId:{type:GraphQLNonNull(GraphQLID)}
        },
        resolve (parent,args){
          //create an object of Schema Book, to enter data into database 
          let book= new Book({
            name:args.name,
            genre:args.genre,
            authorId:args.authorId
          });
          return book.save();
        }
      }
    }
  }) 
module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation:Mutation

});
