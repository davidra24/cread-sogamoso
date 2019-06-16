import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';
import Loading from '../loading/Loading';

function ItemProgramaAsignatura(props) {
    var renderEnable;
    if (props.careerSubject.enable) {
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
    const color = props.careerSubject.enable
        ? 'alert alert-info'
        : 'alert alert-dark';
    return (
        <div className={color}>
            <div className="row">
                <div className="col-12 col-md-4">
                    <strong>{props.nombreAsignatura}</strong>
                </div>
                <div className="col-12 col-md-4">
                    <strong>{props.careerSubject.semester} semestre</strong>
                </div>
                <div className="col-12 col-md-3">
                    <strong>{props.careerSubject.credits} creditos</strong>
                </div>
                <div className="col-12 col-md-1">{renderEnable}</div>
            </div>
        </div>
    );
}
function buscarAsignatura(id, subjects) {
    var results = {};
    subjects.forEach(element => {
        if (element.id == id) {
            results = element;
        }
    });
    return results.name;
}
function ConsultarProgramaAsignatura(props) {
    if (props.error) {
        return <Error error={props.error.message} />;
    }
    const careersSubjects = props.careersSubjects.sort(function(a, b) {
        return a.semester - b.semester;
    });
    return (
        <div>
            <ul className="list-unstyled">
                {careersSubjects.map(careerSubject => {
                    return (
                        <li
                            key={careerSubject.id}
                            style={{ listStyleType: 'none' }}
                        >
                            <ItemProgramaAsignatura
                                careerSubject={careerSubject}
                                nombreAsignatura={buscarAsignatura(
                                    careerSubject.id_subject,
                                    props.subjects
                                )}
                                handleRemove={e =>
                                    props.handleRemove(e, careerSubject)
                                }
                                handleEnable={e =>
                                    props.handleEnable(e, careerSubject)
                                }
                                handleDisable={e =>
                                    props.handleDisable(e, careerSubject)
                                }
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ConsultarProgramaAsignatura;
