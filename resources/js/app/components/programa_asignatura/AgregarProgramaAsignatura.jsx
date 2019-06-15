import React, { Component } from 'react';
import Loading from '../loading/Loading';
class AgregarProgramaAsignatura extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    asignaturas: [],
    loading: true,
    error: null
  };
  componentDidMount() {
    this.getAsignaturas();
  }
  getAsignaturas = async () => {
    try {
      const response = await fetch(this.props.apiAsignatura, {
        mode: 'no-cors'
      });
      const data = await response.json();
      this.setState({
        loading: false,
        asignaturas: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };
  render() {
    return (
      <form className="form-group" onSubmit={this.props.handleSubmit}>
        <div className="container-fluid">
          <div className="alert addBorder">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3">
                <label>Asignatura: </label>
                <select
                  className="form-control"
                  name="id_asignatura"
                  onChange={this.props.handleChange}
                  value={this.props.formAsignatura}
                >
                  <option key={0} />
                  {this.state.asignaturas.map(asignatura => {
                    return (
                      <option key={asignatura.id} value={asignatura.id}>
                        {asignatura.nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label>Semestre: </label>
                <select
                  id="selectSemestres"
                  className="form-control"
                  name="semestre"
                  onChange={this.props.handleChange}
                  value={this.props.formSemestre}
                >
                  {this.props.semestres}
                </select>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label>Créditos: </label>
                <select
                  className="form-control"
                  name="creditos"
                  onChange={this.props.handleChange}
                  value={this.props.formCreditos}
                >
                  {this.props.creditos}
                </select>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <br />
                <button className="btn btn-success btn-block form-control">
                  Guardar
                </button>
              </div>
            </div>
          </div>
          {this.state.loading && <Loading />}
        </div>
      </form>
    );
  }
}

export default AgregarProgramaAsignatura;
