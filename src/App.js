import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import './App.css'
import Booklist from './components/Booklist'
import Bookssearch from './components/Bookssearch'


class BooksApp extends Component {
  state = {
    Books: []
  }

  componentDidMount() {
    this.fetchdetails()
  }

  fetchdetails= () => {
    BooksAPI.getAll().then((books)=>{
      this.setState({Books: books})
    })
  }

  updatedetails = (book, shelf) => {
    BooksAPI.update(book, shelf).then(()=>{
      this.fetchdetails()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<Booklist books={this.state.Books} onChange={this.updatedetails}/>)}/>
        <Route exact path="/search" render={({history}) => (<Bookssearch onChange={this.updatedetails} myBooks={this.state.Books}/>)}/>
      </div>
    )
  }
}

export default BooksApp
