import React from 'react';
import Loading from '../loading/Loading';
function AgregarProgramaAsignatura(props) {
    return (
        <form className="form-group" onSubmit={props.handleSubmit}>
            <div className="container-fluid">
                <div className="alert addBorder">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-3">
                            <label>Asignatura: </label>
                            <select
                                className="form-control"
                                name="id_subject"
                                onChange={props.handleChange}
                                value={props.formAsignatura}
                            >
                                <option key={0} />
                                {props.subjects.map(subject => {
                                    return (
                                        <option
                                            key={subject.id}
                                            value={subject.id}
                                        >
                                            {subject.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <label>Semestre: </label>
                            <select
                                id="selectSemestres"
                                className="form-control"
                                name="semester"
                                onChange={props.handleChange}
                                value={props.formSemestre}
                            >
                                {props.semestres}
                            </select>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <label>Créditos: </label>
                            <select
                                className="form-control"
                                name="credits"
                                onChange={props.handleChange}
                                value={props.formCreditos}
                            >
                                {props.creditos}
                            </select>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <br />
                            <button className="btn btn-success btn-block form-control">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AgregarProgramaAsignatura;
