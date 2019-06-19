import React from 'react';
import { Link } from 'react-router-dom';

function PrincipalForm(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <select
                        name="id_semester"
                        className="form-control"
                        onChange={props.handleChange}
                        value={props.formSemestre}
                    >
                        {props.semesters}
                    </select>
                    <br />
                    <select
                        name="id_career"
                        className="form-control"
                        onChange={props.handleChange}
                        value={props.formCareer}
                    >
                        {props.careers}
                    </select>
                    <br />
                    <Link
                        to={`/addLesson/${props.formSemestre}/${
                            props.formCareer
                        }`}
                        className="btn btn-block btn-success"
                    >
                        Agregar horarios
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PrincipalForm;
