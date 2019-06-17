import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import Client from './pages/Client';

export default class App extends Component {
    state = {
        user: {
            id: user
        }
    };
    render() {
        if (role == 'admin') {
            return (
                <BrowserRouter location="/">
                    <Index user={this.state.user} />
                </BrowserRouter>
            );
        } else {
            return (
                <BrowserRouter location="/">
                    <Client user={this.state.user} />
                </BrowserRouter>
            );
        }
    }
}

if (document.getElementById('content')) {
    ReactDOM.render(<App />, document.getElementById('content'));
}
