import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarModal from './CalendarModal';

function getRows(props) {
    let arr = new Array();
    props.lessons.map(lesson => {
        const horario = JSON.parse(JSON.parse(lesson.schedule));
        var days = [];
        horario.days.forEach(element => {
            const t = element.split('T');
            const dt = t[0].split('-');
            const d = new Date(dt[0], parseInt(dt[1]) - 1, dt[2]);
            days.push(d);
        });
        arr.push(
            <tr key={lesson.id_subject}>
                <th scope="row">{lesson.subject_semster}</th>
                <td>{lesson.name_subject}</td>
                <td>{lesson.name_teacher}</td>
                <td>{lesson.phone_teacher}</td>
                <td>
                    {lesson.name_classroom} - {lesson.location_classroom}
                </td>
                <td>{`${horario.start_h} - ${horario.end_h}`}</td>
                <td>
                    <button className="btn btn-info" onClick={props.openModal}>
                        <FontAwesomeIcon icon="calendar-alt" />
                    </button>
                    <CalendarModal
                        onDeleteBadge={props.onDeleteBadge}
                        onCloseModal={props.onCloseModal}
                        isOpen={props.modalIsOpen}
                        selectedDays={days}
                        onDayClick={props.onDayClick}
                    />
                </td>
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
                                        <th scope="col">Días</th>
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
