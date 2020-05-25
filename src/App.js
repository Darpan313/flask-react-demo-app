import React, { Component } from 'react';
import './App.css';
import Autocomplete from './Autocomplete';
const App = () => {
  return (
    <div className="App">      
      <Autocomplete
        options={[
          'Web Development',
          'Software Development',
          'Cloud Computing',
          'Mobile Computing',
          'Machine Learning',
          'Visual analytics',
        ]}
      />
    </div>
  );
};
export default App;