import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Index from './index';

class App extends Component {
  render() {
    return (
      <BrowserRouter location="/">
        <Index />
      </BrowserRouter>
    );
  }
}

export default App;
