import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';

export class Autocomplete extends Component {
static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
};

constructor(propTypes) {
  super(propTypes);

  this.state = {
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
};

onClick = (e) => {
  this.setState({
    activeOptionIndex: 0,
    filteredOption: [],
    showOptions: false,
    userInput: e.currentTarget.innerText
  });
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
            <ul className="options">
              {filteredOptions.map((optionName, index) => {
                let className;
                if (index === activeOptionIndex) {
                  className = 'option-active';
                }
                return (
                  <li className={className} key={optionName} onClick={onClick}>
                    {optionName}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          optionList = (
            <div className="no-options">
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
          <br></br>
          <input type="submit" value="" className="search-btn" value="Search"/>
          {optionList}
        </div>
    );
  }
}

export default Autocomplete;