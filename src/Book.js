import React, { Component } from "react"

class Book extends Component{
  state={
    book: {}
  }

  componentDidMount(){
    this.setState({book: this.props.book})
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    let book = this.state.book
    book.shelf = e.target.value
    this.setState({
      book: book
    })
    this.props.updateBook(this.state.book)
  }
  render(){
    const options = [
      "Currently Reading",
      "Want To Read",
      "Read",
      "None"
    ]
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.state.book.coverURL})` }}></div>
          <div className="book-shelf-changer">
            <select value= {this.state.book.shelf} onChange={this.handleChange}>
              <option value="move" disabled>Move to...</option>
              {options.map(option =>
                option === this.state.book.shelf ?
                (<option key={this.state.book.id + " " + option} value={option} selected>{this.state.book.shelf}</option>)
                :
                (<option key={this.state.book.id + " " + option} value={option}>{option}</option>)
              )}
            </select>
          </div>
        </div>
        <div className="book-title">{this.state.book.name}</div>
        <div className="book-authors">{this.state.book.author}</div>
      </div>
    )
  }
}

export default Book
