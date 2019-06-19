import React, { Fragment } from 'react';

function getRows(props) {
    let arr = new Array();
    props.lessons.map(lesson => {
        const horario = JSON.parse(lesson.schedule);
        const dias = horario.days;
        arr.push(
            <tr key={lesson.id_subject}>
                <th scope="row">{lesson.subject_semster}</th>
                <td>{lesson.name_subject}</td>
                <td>{lesson.name_teacher}</td>
                <td>{`${horario.start_h} - ${horario.end_h}`}</td>
                <td>
                    <span className="badge badge-info badge-span">
                        {dias[0]}
                    </span>
                    <span className="badge badge-info badge-span">
                        {dias[1]}
                    </span>
                    <span className="badge badge-info badge-span">
                        {dias[2]}
                    </span>
                    <span className="badge badge-info badge-span">
                        {dias[3]}
                    </span>
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
