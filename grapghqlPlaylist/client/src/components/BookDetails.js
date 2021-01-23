import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries'
// Now we like to write a query to display the detail of each book once clicked
class BookDetails extends Component{
  displayBookDetails(){
    const {book} = this.props.data;
    if(book){
      return(
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All Books By this author</p>
          <ul className="other-books">
              {book.author.books.map(item=>{
              return<li key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    }
    else{
      return(
        <div>No Book selected</div>
      )
    }
  }

render(){
  
  return(
    <div id="book-details">
      {this.displayBookDetails()}
    </div>
  )
}
}
//bind the query with component
//to get the props due to query we will set the query variable that will update the 
// bookId as soon as props change.
export default graphql(getBookQuery,
  {
    options:(props)=>{
      return{
        variables:{
          id:props.bookId
        }
      }
    }
  })(BookDetails);

