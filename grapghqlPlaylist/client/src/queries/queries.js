import {gql} from 'apollo-boost';

//we use gql to create the query. To get all books we create a query
// Get BookQuery. The result of the query we create store in component props
//object's data property.
const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`
const getAuthorsQuery =gql`{ 
  authors{
    name
    id
  }
}
`
//for mutation we need add data into DB. For that we use query variable by using $ sign
//These are the variable which are also define in state. The variable with ! mean not null
const addBookMutation =gql`
mutation($name:String!, $genre:String!, $authorId:ID!) {
    addBook(name:$name,genre:$genre,authorId:$authorId){
    name
    id
  }
}
`
const getBookQuery=gql`
query($id:ID){
  book{
    id
    name
    genre
    author{
      id
      name
      age
      books{
        name
        id
      }
    }
  }
}
`

export {getAuthorsQuery,getBooksQuery, addBookMutation,getBookQuery};
