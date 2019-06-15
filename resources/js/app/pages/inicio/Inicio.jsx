import React, { Component, Fragment } from 'react';
import construccion from '../../images/construccion.png';

class Inicio extends Component {
  render() {
    return (
      <Fragment>
        <br />
        <br />
        <div className="d-flex justify-content-center">
          <img
            src={construccion}
            alt="estamos en contrucción"
            style={{ width: '25%', height: '25%' }}
          />
        </div>
        <h1>Estamos en contrucción...</h1>
      </Fragment>
    );
  }
}

export default Inicio;
