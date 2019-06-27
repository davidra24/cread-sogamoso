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
                    {props.formSemestre != '' && props.formCareer != '' ? (
                        <Link
                            to={`/add-lesson/${props.formSemestre}/${
                                props.formCareer
                            }`}
                            className="btn btn-block btn-success"
                        >
                            Agregar horarios
                        </Link>
                    ) : (
                        <button className="btn btn-block btn-dark">
                            Agregar horarios
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PrincipalForm;
