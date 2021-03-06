import React, { Component } from "react"
import Book from "./Book"

class BookShelf extends Component{

  render(){
    const shelf = this.props.shelf
    const books = this.props.books

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter((book) =>
              book.shelf === shelf)
              .map(book =>
              <li key={book.id}><Book book={book} updateBook={this.props.updateBook}></Book></li>

            )}
          </ol>
        </div>
      </div>

    )
  }
}

export default BookShelf
