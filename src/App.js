import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from "./Book"
import BookShelf from "./BookShelf"
import SearchInput from "./SearchInput"
import { Route } from "react-router-dom"
import { Link } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    showingBooks: [],
    query: ""
  }
  componentDidMount(){
    this.getAllBooks()
  }
  resetSearch = () =>{
    this.setState({ showSearchPage: false,
    showingBooks: this.state.books })
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books =>
      this.setState({books: books})
    )
  }

  updateBooks = (books) => {
    this.setState({showingBooks: books})
  }
  updateBook = (book) => {
    BooksAPI.update(book ,book.shelf)
    .then(books => this.setState({
      books: books}))
  }
  render() {
    if(!this.state.showingBooks){
      this.setState({
        showingBooks: this.state.books
      })
    }
    return (
      <div className="app">
        <Route path="/search"
          render = { () => (<div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
                <button className="close-search" onClick={() => this.resetSearch()}>Close</button>
              </Link>
              <SearchInput updateBooks={this.updateBooks} />
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.showingBooks
                  .map(book =>
                    <li key={book.id}><Book book={book} updateBook={this.updateBook}></Book></li>
                  )}
                </ol>
              </div>
            </div>
          )
          }
          />

          <Route exact path="/"
            render = { () => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf shelf="Currently Reading" books={this.state.books} updateBook={this.updateBook} />
                    <BookShelf shelf="Want To Read" books={this.state.books} updateBook={this.updateBook} />
                    <BookShelf shelf="Read" books={this.state.books} updateBook={this.updateBook} />
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button />
                  </Link>
                </div>
              </div>
            )
          }
        />

      </div>
    )
  }
}

export default BooksApp
