//Source: https://blog.bitsrc.io/building-a-react-autocomplete-component-from-scratch-b78105324f4c
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';
import Card from 'react-bootstrap/Card';

let cardList;

export class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };

  constructor(propTypes) {
    super(propTypes);

    this.state = {
      clicked: false,
      activeOptionIndex: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: ''
    };
  }

  onChange = (e) => {
    const { options } = this.props;
    const userInput = e.target.value;
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
      }
      this.setState({ activeOptionIndex: activeOptionIndex - 1 });
    } else if (e.keyCode === 40) {        //up arrow
      if (activeOptionIndex - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeOptionIndex: activeOptionIndex + 1 });
    }
  };

  render() {

    const {
      onChange,
      onKeyDown,
      onClick,
      state: { activeOptionIndex, filteredOptions, showOptions, userInput }
    } = this;

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
          <div className="no-suggestions">
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <div className="search">
        <input type="text" className="search-box" placeholder="Enter a keyword!"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />

        {optionList}
        <input type="submit" value="" className="search-btn" value="Search" />
        {this.state.clicked && <div>{cardList}</div>}
      </div>
    );
  }
}

export default Autocomplete;