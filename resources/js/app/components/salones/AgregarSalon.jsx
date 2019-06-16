import React from 'react';

function AgregarSalon(props) {
    return (
        <form className="form-group" onSubmit={props.handleSubmit}>
            <div className="container-fluid">
                <div className="alert addBorder">
                    <div className="row">
                        <div className="col-12 col-md-5">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={props.handleChange}
                                value={props.formNombre}
                            />
                        </div>
                        <div className="col-12 col-md-5">
                            <label>Ubicación:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                onChange={props.handleChange}
                                value={props.formUbicacion}
                            />
                        </div>
                        <div className="col-12 col-md-2">
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

export default AgregarSalon;
