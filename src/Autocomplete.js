//Source: https://blog.bitsrc.io/building-a-react-autocomplete-component-from-scratch-b78105324f4c
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';
import MovieDetail from './MovieDetail';
import Card from 'react-bootstrap/Card';
import { useTheme } from 'styled-components';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

export class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };

  constructor(propTypes) {
    super(propTypes);

    this.state = {
      clicked: false,
      activeOptionIndex: 0,
      movies: [],
      showOptions: false,
      userInput: ''
    };
  }

  onChange = (e) => {
    const userInput = e.target.value;
<<<<<<< HEAD
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeOptionIndex: 0,
      filteredOptions,
      showOptions: true,
      userInput
    });
    cardList = "";
  };

  onClick = (e) => {
    this.setState({
      clicked: true,
      activeOptionIndex: 0,
      filteredOption: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });

    cardList = {};
    cardList = (
      //Source: https://react-bootstrap.github.io/components/cards/


      <div className="row ml-4 mr-4 mt-4">
        <div className="col col-sm-3">
          <Card style={{ width: '18rem', background: '#D4FACE'}}>
            <Card.Body>
              <Card.Title>Card Title 1</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col col-sm-3">
          <Card style={{ width: '18rem', background: '#D4FACE' }}>
            <Card.Body>
              <Card.Title>Card Title 2</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col col-sm-3">
          <Card style={{ width: '18rem', background: '#D4FACE' }}>
            <Card.Body>
              <Card.Title>Card Title 3</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col col-sm-3">
          <Card style={{ width: '18rem', background: '#D4FACE' }}>
            <Card.Body>
              <Card.Title>Card Title 4</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
            </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

    );
  };

  onKeyDown = (e) => {
    const { activeOptionIndex, filteredOptions } = this.state;
    if (e.keyCode === 13) {     //select an item
      this.setState({
        activeOptionIndex: 0,
        showSuggestions: false,
        userInput: filteredOptions[activeOptionIndex]
      });
    } else if (e.keyCode === 38) {        //down arrow
      if (activeOptionIndex === 0) {
        return;
=======
    const url = `https://api-tutorial4.herokuapp.com/movies?title_like=${userInput}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          activeOptionIndex: 0,
          movies: data,
          showOptions: true,
          userInput
        })
>>>>>>> tutorial-3
      }
      )
      .catch(err => console.log(err));
  };
  render() {

    const {
      onChange,
      state: { activeOptionIndex, movies, showOptions, userInput }
    } = this;

<<<<<<< HEAD
    let optionList;

    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="suggestions">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOptionIndex) {
                className = 'suggestion-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                  {cardList}
                </li>
              );
            })}
          </ul>
        );

      } else {
        optionList = (
=======
     if (showOptions && userInput) {
      if (movies.length) { return(
        <div className="search">
        <input type="text" className="search-box" placeholder="Enter a keyword!"
          onChange={onChange}
          value={userInput}
        /><input type="submit" value="" className="search-btn" value="Search" />
        <Router>
        <div className="row ml-4 mr-4 mt-4">
            {this.state.movies.map((items, id) => { return(
              <div className="col col-sm-3 mt-3" >
                <Card style={{ width: '18rem', background: '#D4FACE', height: '10rem' }}>
                  
                  <Card.Body>
                    <Card.Title><Link to={`/movieDetail/${items.show_id}`}>{items.title}</Link></Card.Title>
                    <Card.Text>{items.show_id}</Card.Text>
                  </Card.Body>
                </Card>
                
                <Route path='/movieDetail/:showId' component={MovieDetail}/>
             
              </div>
              )})}
          </div>
          </Router>  
          </div>);
          
      } else { return (
        <div className="search">
        <input type="text" className="search-box" placeholder="Enter a keyword!"
          onChange={onChange}
          value={userInput}
        />
        <input type="submit" value="" className="search-btn" value="Search" />
>>>>>>> tutorial-3
          <div className="no-suggestions">
            <em>No Option!</em>
          </div>
          </div>
        );
      }
    }
    return (
      <div className="search">
        <input type="text" className="search-box" placeholder="Enter a keyword!"
          onChange={onChange}
          value={userInput}
        />
<<<<<<< HEAD

        {optionList}
        <input type="submit" value="" className="search-btn" value="Search" />
        {this.state.clicked && <div>{cardList}</div>}
      </div>
=======
        <input type="submit" value="" className="search-btn" value="Search" />
       </div>
>>>>>>> tutorial-3
    );
  }
}

export default Autocomplete;