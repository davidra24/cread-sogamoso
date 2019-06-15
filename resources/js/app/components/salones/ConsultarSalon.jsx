import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';

function SalonItem(props) {
  return (
    <div className="alert color-alert-info ">
      <div className="row">
        <div className="col-12 col-md-5">
          <strong>{props.salon.nombre}</strong>
        </div>
        <div className="col-12 col-md-5">
          <strong>{props.salon.ubicacion}</strong>
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
function ConsultarSalon(props) {
  if (props.error) {
    return <Error error={props.error.message} />;
  }
  return (
    <ul className="list-unstyled">
      {props.salons.map(salon => {
        return (
          <li key={salon.id} style={{ listStyleType: 'none' }}>
            <SalonItem
              salon={salon}
              handleRemove={e => props.handleRemove(e, salon)}
              handleEdit={e => props.handleEdit(e, salon)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ConsultarSalon;
