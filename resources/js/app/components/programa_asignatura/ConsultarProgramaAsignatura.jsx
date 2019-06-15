import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';
import Loading from '../loading/Loading';

function ItemProgramaAsignatura(props) {
  return (
    <div className="alert color-alert-info ">
      <div className="row">
        <div className="col-12 col-md-3">
          <strong>{props.nombreAsignatura}</strong>
        </div>
        <div className="col-12 col-md-3">
          <strong>{props.careerSubject.semestre} semestre</strong>
        </div>
        <div className="col-12 col-md-3">
          <strong>{props.careerSubject.creditos} creditos</strong>
        </div>
        <div className="col-12 col-md-2">
          <button className="btn btn-danger" onClick={props.handleRemove}>
            <FontAwesomeIcon icon="trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
class ConsultarProgramaAsignatura extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  state = {
    asignatura: [],
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
        asignatura: data
      });
      console.log(data);
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };
  buscarAsignatura(id) {
    var results = {};
    this.state.asignatura.forEach(element => {
      if (element.id == id) {
        results = element;
      }
    });
    return results.nombre;
  }
  render() {
    if (this.error) {
      return <Error error={this.error.message} />;
    }
    const careersSubjects = this.props.careersSubjects.sort(function(a, b) {
      return a.semestre - b.semestre;
    });
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <ul className="list-unstyled">
            {careersSubjects.map(careerSubject => {
              return (
                <li key={careerSubject.id} style={{ listStyleType: 'none' }}>
                  <ItemProgramaAsignatura
                    careerSubject={careerSubject}
                    nombreAsignatura={this.buscarAsignatura(
                      careerSubject.id_asignatura
                    )}
                    handleRemove={e =>
                      this.props.handleRemove(e, careerSubject)
                    }
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default ConsultarProgramaAsignatura;
