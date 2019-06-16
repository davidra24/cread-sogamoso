import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function AsignaturaItem(props) {
    var renderEnable;
    if (props.teacher.enable) {
        renderEnable = (
            <button className="btn btn-danger" onClick={props.handleDisable}>
                <FontAwesomeIcon icon="eye-slash" />
            </button>
        );
    } else {
        renderEnable = (
            <button className="btn btn-success" onClick={props.handleEnable}>
                <FontAwesomeIcon icon="eye" />
            </button>
        );
    }
    const color = props.teacher.enable
        ? 'alert alert-info'
        : 'alert alert-dark';
    return (
        <div className={color}>
            <div className="row">
                <div className="col-12 col-md-4">
                    <strong>{props.teacher.name}</strong>
                </div>
                <div className="col-12 col-md-3">
                    <strong>{props.teacher.mail}</strong>
                </div>
                <div className="col-12 col-md-3">
                    <strong>{props.teacher.phone}</strong>
                </div>
                <div className="col-6 col-md-1">
                    <button className="btn btn-info" onClick={props.handleEdit}>
                        <FontAwesomeIcon icon="edit" />
                    </button>
                </div>
                <div className="col-6 col-md-1">{renderEnable}</div>
            </div>
        </div>
    );
}
function ConsultarAsignatura(props) {
    if (props.error) {
        return <Error error={props.error.message} />;
    }
    const teachers = props.teachers.sort(function(a, b) {
        return b.enable - a.enable;
    });
    return (
        <ul className="list-unstyled">
            {teachers.map(teacher => {
                return (
                    <li key={teacher.id} style={{ listStyleType: 'none' }}>
                        <AsignaturaItem
                            teacher={teacher}
                            handleRemove={e => props.handleRemove(e, teacher)}
                            handleEnable={e => props.handleEnable(e, teacher)}
                            handleDisable={e => props.handleDisable(e, teacher)}
                            handleEdit={e => props.handleEdit(e, teacher)}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default ConsultarAsignatura;
