import React,{Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import './index.css'
//Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

//Apollo Client Setup
const client=new ApolloClient({
  uri:'http://localhost:3000/graphql'
})
class App extends Component{
  render(){
    return (
      //we wrap up the application to apolloProvider to out[ut dynamically react component we use {}
      //here we are outputting client that we earlier created using apolloClient.
      <ApolloProvider client={client}>
        <div id="main">      
            <h1> Books Reading List</h1>  
            <BookList />  
            <AddBook />  
        </div>
     </ApolloProvider>
    );
  }
}

export default App;
