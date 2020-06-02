//Source: https://blog.bitsrc.io/building-a-react-autocomplete-component-from-scratch-b78105324f4c
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';
import MovieDetail from './MovieDetail';
import Card from 'react-bootstrap/Card';
import { useTheme } from 'styled-components';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

export class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };

  constructor(propTypes) {
    super(propTypes);

    this.inputTxt = React.createRef();

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
        this.inputTxt.current.focus(); 
      }
      )
      .catch(err => console.log(err));
  };

  render() {
    
    const {
      onChange,
      state: { activeOptionIndex, movies, showOptions, userInput }
    } = this;

     if (showOptions && userInput) {
      if (movies.length) { return(
        <Router>
          <Switch>
            <Route path='/movieDetail/:showId/:title' component={MovieDetail}/>
            <div>
              <div className="search">
              <input type="text" className="search-box" placeholder="Enter a keyword!"
                onChange={onChange}
                value={userInput}/>
              <input type="submit" value="" className="search-btn" value="Search" />
            
              <div className="row ml-4 mr-4 mt-4">
                  {this.state.movies.map((items, id) => { return(
                    <div className="col col-sm-3 mt-3" key = {id}>
                      <Card style={{ width: '18rem', background: '#D4FACE', height: '10rem' }}>
                        
                        <Card.Body>
                          <Card.Title><Link to={`/movieDetail/${items.show_id}/${items.title}`}>{items.title}</Link></Card.Title>
                          <Card.Text>{items.show_id}</Card.Text>
                        </Card.Body>
                      </Card>
                      
                    </div>
                    )})}
                </div>
            </div>
          </div>
        </Switch>
      </Router>  
      );
          
      } else { return (
        <Router>
          <Switch>
            <Route path='/movieDetail/:showId/:title' component={MovieDetail}/>
            <div>
              <div className="search">
              <input type="text" className="search-box" placeholder="Enter a keyword!"
                onChange={onChange}
                value={userInput}/>
              <input type="submit" value="" className="search-btn" value="Search" />
                <div className="no-suggestions">
                  <em>No Movie!</em>
                </div>
              <div className="row ml-4 mr-4 mt-4">
                  {this.state.movies.map((items, id) => { return(
                    <div className="col col-sm-3 mt-3" key = {id}>
                      <Card style={{ width: '18rem', background: '#D4FACE', height: '10rem' }}>
                        
                        <Card.Body>
                          <Card.Title><Link to={`/movieDetail/${items.show_id}/${items.title}`}>{items.title}</Link></Card.Title>
                          <Card.Text>{items.show_id}</Card.Text>
                        </Card.Body>
                      </Card>
                      
                    </div>
                    )})}
                </div>
            </div>
          </div>
        </Switch>
      </Router> 
        );
      }
    }
    return (
      <Router>
          <Switch>
            <Route path='/movieDetail/:showId/:title' component={MovieDetail}/>
            <div>
              <div className="search">
              <input type="text" className="search-box" placeholder="Enter a keyword!"
                onChange={onChange}
                value={userInput}/>
              <input type="submit" value="" className="search-btn" value="Search" />
            
              <div className="row ml-4 mr-4 mt-4">
                  {this.state.movies.map((items, id) => { return(
                    <div className="col col-sm-3 mt-3" key = {id}>
                      <Card style={{ width: '18rem', background: '#D4FACE', height: '10rem' }}>
                        
                        <Card.Body>
                          <Card.Title><Link to={`/movieDetail/${items.show_id}/${items.title}`}>{items.title}</Link></Card.Title>
                          <Card.Text>{items.show_id}</Card.Text>
                        </Card.Body>
                      </Card>
                      
                    </div>
                    )})}
                </div>
            </div>
          </div>
        </Switch>
      </Router> 
    );
  }
}

export default Autocomplete;