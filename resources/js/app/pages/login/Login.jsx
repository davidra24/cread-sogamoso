import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import logo from '../../images/logo.png';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.comprobarSesion(true);
  };

  comprobarSesion(iniciar) {
    this.props.history.push('/', { logged: iniciar });
    if (iniciar === true) {
      document.body.style.background = 'white';
    }
  }

  render() {
    if (this.props.location.state.logged) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container text-center">
        <div className="row justify-content-center my-auto">
          <div className="col-12 col-md-8 col-lg-6">
            <img src={logo} alt="" />
          </div>
          <div className="col-12 col-md-8 col-lg-6">
            <div className="text-center">
              <form onSubmit={this.handleSubmit} className="form-group ">
                <FontAwesomeIcon icon="user-circle" size="3x" />
                <br />
                <br />
                <div>
                  <label className="input-group-text">
                    Usuario:&nbsp;&nbsp;
                    <input className="form-control " type="text" />
                  </label>
                </div>
                <div>
                  <label className="input-group-text">
                    Contraseña:&nbsp;&nbsp;
                    <input className="form-control " type="password" />
                  </label>
                  <br />
                  <button
                    onClick={this.handleLogin}
                    className="form-control btn btn-success"
                  >
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
