import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import Client from './pages/Client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import {
    faEdit,
    faTrash,
    faEyeSlash,
    faEye,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import 'react-day-picker/lib/style.css';

library.add(faEye, faEyeSlash, faEdit, faTrash, faCalendarAlt);
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
