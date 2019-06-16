import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';
import { Link } from 'react-router-dom';

function ProgramaItem(props) {
    return (
        <div className="alert alert-info ">
            <div className="row">
                <div className="col-12 col-md-6">
                    <strong>{props.career.name}</strong>
                </div>
                <div className="col-12 col-md-4">
                    <strong>{props.career.semesters} semestres</strong>
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
                                    semesters: career.semesters
                                }
                            }}
                        >
                            <ProgramaItem
                                career={career}
                                handleRemove={e =>
                                    props.handleRemove(e, career)
                                }
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
