import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import {getAuthorsQuery,addBookMutation} from '../queries/queries'

class AddBook extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      genre:'',
      authorId:''
    }
  }
displayAuthors(){
  var data=this.props.getAuthorsQuery;
  if(data.loading){
    return ('Loading authors list')
  }
  else {
    return data.authors.map(author=>{
        return (<option key={author.id} value={author.id}>{author.name}</option>);
      })        
  }
}
 // The current state of form is empty string so to change the state we use setState. 
// when we type it generate event that event need to be change
submitForm(e){
  e.preventDefault();
  this.props.addBookMutation()
  
}
render(){
  return(
    <form id="add-book" onSubmit={this.submitForm.bind(this)}>
      <div className="field">
        <label>Book Name:</label>
     
        <input type="text" onChange={(e)=>this.setState({name:e.target.value})} />    
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e)=>this.setState({Genre:e.target.value})}/>    
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
        <option onChange={(e)=>this.setState({authorId:e.target.value})}>Select Author</option>
          {this.displayAuthors()}
        </select> 
      </div>
      <button>Add</button>          
    </form>
  );
 }
}
//when we need to bind two queries with component then there are different methods 
//are available. We are using compose method

export default compose(
   graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
   graphql(addBookMutation,{name:"addBookMutation"})  
   )(AddBook);


 