import React, { Component, Fragment } from 'react';
import Inicio from '../inicio/Inicio';

class Home extends Component {
    state = {
        toRender: '',
        loading: false,
        error: null
    };
    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12">{<Inicio />}</div>
                </div>
            </div>
        );
    }
}

export default Home;
