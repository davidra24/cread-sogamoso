import React, { Component } from 'react';

function AgregarAsignatura(props) {
    return (
        <form className='form-group' onSubmit={props.handleSubmit}>
            <div className='container-fluid'>
                <div className='alert addBorder'>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <label>Nombre:</label>
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                onChange={props.handleChange}
                                value={props.formNombre}
                            />
                        </div>
                        <div className='col-12 col-md-3'>
                            <label>Correo:</label>
                            <input
                                type='email'
                                className='form-control'
                                name='mail'
                                onChange={props.handleChange}
                                value={props.formCorreo}
                            />
                        </div>
                        <div className='col-12 col-md-3'>
                            <label>Teléfono:</label>
                            <input
                                type='number'
                                className='form-control'
                                name='phone'
                                onChange={props.handleChange}
                                value={props.formTelefono}
                            />
                        </div>
                        <div className='col-12 col-md-2'>
                            <br />
                            <button className='btn btn-success btn-block form-control'>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AgregarAsignatura;
