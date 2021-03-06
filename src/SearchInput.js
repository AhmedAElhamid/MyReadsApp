import React,{ Component } from 'react'
import * as BooksAPI from "./BooksAPI"

class SearchInput extends Component{

  state={
    query:""
  }
  // updateQuery = (query) =>{
  //   this.setState({
  //     query: query.trim() })
  // }
  // resetQuery = () => {
  //   this.setState({
  //     query: ""
  //   })
  // }

  searchByQuery = (query) => {
    this.setState({
           query: query })
    query = query.trim()
    if(query){
      BooksAPI.search(query)
      .then(books => this.props.updateBooks(books))
    }else{
      BooksAPI.getAll()
      .then(books => this.props.updateBooks(books))
    }
  }

  render(){

      return(

        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" placeholder="Search by title or author"
            value = {this.state.query} onChange = {(event) => this.searchByQuery(event.target.value)}/>

        </div>

      )
  }
}
export default SearchInput
