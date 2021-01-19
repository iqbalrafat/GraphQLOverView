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

export {getAuthorsQuery,getBooksQuery};
