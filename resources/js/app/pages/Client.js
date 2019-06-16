import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import NotFound from './notFound/NotFound';

library.add(faUserCircle);
class Index extends Component {
    componentDidMount() {}
    render() {
        return (
            <Switch>
                <Route exact path="/user" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default Index;
