import React ,{Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
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
class BookList extends Component{
displayBooks(){
  var data=this.props.data;
  if (data.loading){
return <div>Loading books</div>
  }
  else {
    return data.books.map(book=>{
        return  (
           <li key={book.id}>{book.name}</li>
        );
    })
  }
}
  render(){
    // console.log(this.props);
  return(
    <div>
      <ul id="book-list">  
        {this.displayBooks()}
      </ul>
    </div>
    );
  }
}
// Once we create Query to get the result we have to export it. We use another
// package called graphql which is a function, it binds Query with component.

export default graphql(getBooksQuery)(BookList);