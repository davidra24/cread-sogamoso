import React, { Component } from 'react';

function AgregarPrograma(props) {
    return (
        <form className="form-group" onSubmit={props.handleSubmit}>
            <div className="container-fluid">
                <div className="alert addBorder">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={props.handleChange}
                                value={props.formNombre}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <label>Número de semestres: </label>
                            <select
                                className="form-control"
                                name="semesters"
                                onChange={props.handleChange}
                                value={props.formSemestres}
                            >
                                {props.semestres}
                            </select>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
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

export default AgregarPrograma;
