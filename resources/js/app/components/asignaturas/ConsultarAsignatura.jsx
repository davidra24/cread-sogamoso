import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';

function AsignaturaItem(props) {
    return (
        <div className="alert alert-info ">
            <div className="row">
                <div className="col-12 col-md-10">
                    <strong>{props.subject.name}</strong>
                </div>
                <div className="col-6 col-md-1">
                    <button className="btn btn-info" onClick={props.handleEdit}>
                        <FontAwesomeIcon icon="edit" />
                    </button>
                </div>
                <div className="col-6 col-md-1">
                    <button
                        className="btn btn-danger"
                        onClick={props.handleRemove}
                    >
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
            {props.subjects.map(subject => {
                return (
                    <li key={subject.id} style={{ listStyleType: 'none' }}>
                        <AsignaturaItem
                            subject={subject}
                            handleRemove={e => props.handleRemove(e, subject)}
                            handleEdit={e => props.handleEdit(e, subject)}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default ConsultarAsignatura;
