import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Principal extends Component {
    componentWillMount() {}
    handleLogin() {}
    render() {
        return <Redirect to={{ pathname: '/' }} />;
    }
}

export default Principal;
