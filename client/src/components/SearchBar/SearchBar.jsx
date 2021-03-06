import React from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './searchbar.scss'
import { withRouter } from 'react-router-dom';
class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: "All",
            showDropdown: false,
            searchText: ""
        }
    }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.searchText}`);
  }
    render(){
        const capitalize = (word) => {
            const firstLetter = word[0].toUpperCase();
            const restWord = word.slice(1).toLowerCase();
            return firstLetter + restWord;
        }
        const categories = [
            "all",
            "instruments",
            "recording",
            "amplifiers",
            "karaoke"
        ];
        const dropdownContent = categories.map((category, i) => (
            <li key={i} onMouseDown={() => {
              this.setState({ category });
              this.props.history.push(`/search/${category}`)
            }}>{capitalize(category)}</li>
        ));
        return (
          <div className="search-bar">
            <div className="select-box">
              <div tabIndex="0" className="select-background" onMouseDown={() => {
                  this.setState(prevState => ({
                    showDropdown: !prevState.showDropdown
                  }));
              }} onBlur={() => {
                this.setState({ showDropdown: false });
              }}>
                <p className="select-display">
                  {capitalize(this.state.category)}
                </p>
                <div>
                  <i className="arrow-down left"></i>
                </div>
              </div>
              <div className="custom-relative">
                <ul className={!this.state.showDropdown ? "dropdown-content" : "dropdown-content show-drop" }>{dropdownContent}</ul>
              </div>
            </div>
            <div className="search-input">
              <form onSubmit={this.handleSearch}>
                <input className="search-text" type="text" value={this.state.searchText}
                onChange={(e) => this.setState({ searchText: e.currentTarget.value })}/>
              </form>
            </div>
            <div className="magnifier-box" onClick={this.handleSearch}>
              <FontAwesomeIcon
                icon={faSearch}
                color="black"
                className="amz-search-icon"
              />
            </div>
          </div>
        );
    }
}

export default withRouter(SearchBar);