import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function getRows(props) {
    let arr = [];
    props.lessons.map((lesson) => {
        arr.push(
            <tr
                key={`${lesson.id_subject}0${lesson.start_hour}0${
                    lesson.end_hour
                }`}>
                <th scope='row'>{lesson.subject_semster}</th>
                <td>{lesson.name_subject}</td>
                <td>{lesson.name_teacher}</td>
                <td>{lesson.phone_teacher}</td>
                <td>
                    {lesson.name_classroom} - {lesson.location_classroom}
                </td>
                <td>{`${lesson.start_hour} - ${lesson.end_hour}`}</td>
                <td>
                    <button
                        className='btn btn-danger'
                        onClick={(e) => props.remove(e, lesson)}>
                        <FontAwesomeIcon icon='trash' />
                    </button>
                </td>
            </tr>,
        );
    });
    return arr;
}

function PrincipalInfo(props) {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    {props.lessons.lenght === 0 ? (
                        <h1>Aún no hay horarios asignados</h1>
                    ) : (
                        <Fragment>
                            <table className='bg1 table table-bordered'>
                                <thead className='bg1'>
                                    <tr>
                                        <th scope='col'>Semestre</th>
                                        <th scope='col'>Asignatura</th>
                                        <th scope='col'>Docente</th>
                                        <th scope='col'>Teléfono</th>
                                        <th scope='col'>Aula</th>
                                        <th scope='col'>Hora</th>
                                        <th scope='col'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className='bg1'>{getRows(props)}</tbody>
                            </table>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PrincipalInfo;
