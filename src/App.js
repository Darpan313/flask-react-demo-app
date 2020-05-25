import React, { Component } from 'react';
import './App.css';
import Autocomplete from './Autocomplete';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">

    <div>
        <p>
          <b>CSCI5709 - Advanced Web Services</b>
        </p>
        <p>
          <b>Group 19</b>
          <br></br><br></br>
          1. Darpan Patel (B00843607)
          <br></br>
          2. Deep Patel (B00845028)
          <br></br>
          3. Krutarth Patel (B00835794)
          <br></br>
          4. Niharika Prasad (B00835801)
          <br></br>
          5. Shwetha Subash (B00852743)
          <br></br>
          6. Yuganthi Krishnamurthy (B00839935)
        </p>
    </div>

    <div>      
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
    </div>
  );
};
export default App;