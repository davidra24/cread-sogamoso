import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Index from './pages/index';

export default class App extends Component {
    render() {
        console.log(user);
        return (
            <BrowserRouter location="/">
                <Index />
            </BrowserRouter>
        );
    }
}

if (document.getElementById('content')) {
    ReactDOM.render(<App />, document.getElementById('content'));
}
