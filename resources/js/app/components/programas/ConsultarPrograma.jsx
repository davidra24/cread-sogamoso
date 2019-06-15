import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';
import { Link } from 'react-router-dom';

function ProgramaItem(props) {
  return (
    <div className="alert color-alert-info ">
      <div className="row">
        <div className="col-12 col-md-6">
          <strong>{props.career.nombre}</strong>
        </div>
        <div className="col-12 col-md-4">
          <strong>{props.career.semestres} semestres</strong>
        </div>
        <div className="col-6 col-md-1">
          <button className="btn btn-info" onClick={props.handleEdit}>
            <FontAwesomeIcon icon="edit" />
          </button>
        </div>
        <div className="col-6 col-md-1">
          <button className="btn btn-danger" onClick={props.handleRemove}>
            <FontAwesomeIcon icon="trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
function ConsultarPrograma(props) {
  if (props.error) {
    return <Error error={props.error.message} />;
  }
  return (
    <ul className="list-unstyled">
      {props.careers.map(career => {
        return (
          <li key={career.id} style={{ listStyleType: 'none' }}>
            <Link
              className="text-reset text-decoration-none"
              to={{
                pathname: `/careers/${career.id}`,
                state: {
                  semestres: career.semestres,
                  api: '/api/programas_asignaturas',
                  apiPA: `/api/asignaturas_programa/${career.id}`
                }
              }}
            >
              <ProgramaItem
                career={career}
                handleRemove={e => props.handleRemove(e, career)}
                handleEdit={e => props.handleEdit(e, career)}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default ConsultarPrograma;
