import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-cread.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed
      ? 'collapse navbar-collapse'
      : 'collapse navbar-collapse show';
    const classTwo = collapsed
      ? 'navbar-toggler navbar-toggler-right collapsed'
      : 'navbar-toggler navbar-toggler-right';
    return (
      <Fragment>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ backgroundColor: '#1B2021' }}
        >
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo-uptc" className="reduce" />
          </Link>
          <button
            onClick={this.toggleNavbar}
            className={`${classTwo}`}
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`${classOne}`} id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active" onClick={this.toggleNavbar}>
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/home">
                    <FontAwesomeIcon icon="home" size="3x" />
                    <h3>Inicio</h3>
                    <span className="sr-only">(current)</span>
                  </Link>
                </div>
              </li>
              <li className="nav-item" onClick={this.toggleNavbar}>
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/careers">
                    <FontAwesomeIcon icon="brain" size="3x" />
                    <h3>Programas</h3>
                  </Link>
                </div>
              </li>
              <li className="nav-item" onClick={this.toggleNavbar}>
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/subjects">
                    <FontAwesomeIcon icon="book-reader" size="3x" />
                    <h3>Asignaturas</h3>
                  </Link>
                </div>
              </li>
              <li className="nav-item" onClick={this.toggleNavbar}>
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/teachers">
                    <FontAwesomeIcon icon="chalkboard-teacher" size="3x" />
                    <h3>Docentes</h3>
                  </Link>
                </div>
              </li>
              <li className="nav-item" onClick={this.toggleNavbar}>
                <div className="justify-content-center text-center">
                  <Link className="nav-link" to="/classrooms">
                    <FontAwesomeIcon icon="building" size="3x" />
                    <h3>Salones</h3>
                  </Link>
                </div>
              </li>
              <li className="nav-item" onClick={this.toggleNavbar}>
                <div className="justify-content-center text-center">
                  <Link className="nav-link " to="/profile">
                    <FontAwesomeIcon icon="cogs" size="3x" />
                    <h3>Panel de usuario</h3>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <Fragment>{this.props.children}</Fragment>
      </Fragment>
    );
  }
}

export default Navbar;
