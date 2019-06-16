import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import Client from './pages/Client';

export default class App extends Component {
    render() {
        console.log(user);
        if (user == 'admin') {
            return (
                <BrowserRouter location="/">
                    <Index user={user} />
                </BrowserRouter>
            );
        } else {
            return (
                <BrowserRouter location="/">
                    <Client user={user} />
                </BrowserRouter>
            );
        }
    }
}

if (document.getElementById('content')) {
    ReactDOM.render(<App />, document.getElementById('content'));
}
