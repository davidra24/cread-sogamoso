import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function AsignaturaItem(props) {
  return (
    <div className="alert color-alert-info ">
      <div className="row">
        <div className="col-12 col-md-4">
          <strong>{props.teacher.nombre}</strong>
        </div>
        <div className="col-12 col-md-3">
          <strong>{props.teacher.correo}</strong>
        </div>
        <div className="col-12 col-md-3">
          <strong>{props.teacher.telefono}</strong>
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
function ConsultarAsignatura(props) {
  if (props.error) {
    return <Error error={props.error.message} />;
  }
  return (
    <ul className="list-unstyled">
      {props.teachers.map(teacher => {
        return (
          <li key={teacher.id} style={{ listStyleType: 'none' }}>
            <AsignaturaItem
              teacher={teacher}
              handleRemove={e => props.handleRemove(e, teacher)}
              handleEdit={e => props.handleEdit(e, teacher)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ConsultarAsignatura;
