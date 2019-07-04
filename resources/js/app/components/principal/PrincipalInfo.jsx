import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarModal from './CalendarModal';

function getRows(props) {
    let arr = [];
    props.lessons.map(lesson => {
        arr.push(
            <tr
                key={`${lesson.id_subject}0${lesson.start_hour}0${
                    lesson.end_hour
                }`}
            >
                <th scope="row">{lesson.subject_semster}</th>
                <td>{lesson.name_subject}</td>
                <td>{lesson.name_teacher}</td>
                <td>{lesson.phone_teacher}</td>
                <td>
                    {lesson.name_classroom} - {lesson.location_classroom}
                </td>
                <td>{`${lesson.start_hour} - ${lesson.end_hour}`}</td>
            </tr>
        );
    });
    return arr;
}

function PrincipalInfo(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {props.lessons.lenght === 0 ? (
                        <h1>Aún no hay horarios asignados</h1>
                    ) : (
                        <Fragment>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Semestre</th>
                                        <th scope="col">Asignatura</th>
                                        <th scope="col">Docente</th>
                                        <th scope="col">Teléfono</th>
                                        <th scope="col">Aula</th>
                                        <th scope="col">Hora</th>
                                    </tr>
                                </thead>
                                <tbody>{getRows(props)}</tbody>
                            </table>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PrincipalInfo;
