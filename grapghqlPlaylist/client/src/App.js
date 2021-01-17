import React,{Component} from 'react';
import BookList from './components/BookList'
// import logo from './logo.svg';
// import './App.css';
import './index.css'

class App extends Component{
  render(){
    return (
    <div id="main">      
        <h1> GraphQL OverView</h1>  
        <BookList />    
     </div>
    );
  }
}

export default App;
