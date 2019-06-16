import React, { Component } from 'react';
import AgregarSalon from '../../components/salones/AgregarSalon';
import ConsultarSalon from '../../components/salones/ConsultarSalon';
import Loading from '../../components/loading/Loading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Salones extends Component {
    MySwal = withReactContent(Swal);
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        data: [],
        loading: true,
        error: null,
        form: {
            name: '',
            location: '',
            enable: true
        }
    };
    componentDidMount() {
        this.get();
    }
    get = async () => {
        this.setState({
            loading: true,
            error: null
        });
        try {
            const response = await fetch(this.props.api, {
                mode: 'no-cors'
            });
            const data = await response.json();
            this.setState({
                loading: false,
                data: data
            });
        } catch (error) {
            this.setState({
                loading: false,
                error: error
            });
        }
    };
    handleSubmit(e) {
        e.preventDefault();
        this.create();
    }
    create = async () => {
        this.setState({
            loading: true,
            error: null
        });
        if (this.state.form.name != '' && this.state.form.location != '') {
            try {
                const response = await fetch(this.props.api, {
                    method: 'POST',
                    body: JSON.stringify(this.state.form),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.setState({
                    loading: true
                });
                this.clear();
                this.get();
                if (response.status === 200) {
                    this.MySwal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Se ha guardado el salón satsfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    this.MySwal.fire({
                        type: 'error',
                        position: 'top-end',
                        title: 'Oops...',
                        text: 'No se ha podido crear el salón ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.setState({
                        loading: false,
                        error: error
                    });
                    return false;
                }
                return true;
            } catch (error) {
                this.setState({
                    loading: false,
                    error: error
                });
                return false;
            }
        } else {
            this.MySwal.fire({
                type: 'error',
                position: 'top-end',
                title: 'Oops...',
                text: 'No se ha podido crear el salón ',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    clear = () => {
        this.setState({
            form: {
                name: '',
                location: '',
                enable: true
            }
        });
    };
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };
    handleRemove = (e, data) => {
        this.MySwal.fire({
            title: '¿Está seguro?',
            text: '¿Está seguro que desea eliminar este salón?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#808080',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then(result => {
            if (result.value) {
                this.remove(data.id);
            }
        });
    };
    handleEdit = async (e, data) => {
        await this.MySwal.fire({
            title: 'Editar salón',
            html:
                '<label>Nombre:</label>' +
                `<input id="nombre_salon" class="swal2-input" placeholder="Nombre" value="${
                    data.name
                }"/>` +
                '<label>Ubicacion:</label>' +
                `<input id="ubicacion_salon" class="swal2-input" placeholder="Ubicación" value="${
                    data.location
                }"/>`,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('nombre_salon').value;
                const location = document.getElementById('ubicacion_salon')
                    .value;
                this.setState({
                    form: {
                        name: name,
                        location: location,
                        enable: this.state.form.enable
                    }
                });
            }
        });
        if (this.state.form.name != '' && this.state.form.location != '') {
            this.edit(data.id);
        }
    };
    handleEnable = async (e, data) => {
        await this.setState({
            form: {
                name: data.name,
                location: data.location,
                enable: true
            }
        });
        this.edit(data.id);
    };
    handleDisable = async (e, data) => {
        await this.setState({
            form: {
                name: data.name,
                location: data.location,
                enable: false
            }
        });
        this.edit(data.id);
    };
    edit = async id => {
        this.setState({
            loading: true,
            error: null
        });
        if (this.state.form.name != '' && this.state.form.location != '') {
            try {
                const response = await fetch(`${this.props.api}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(this.state.form),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.setState({
                    loading: true
                });
                this.clear();
                this.get();
                if (response.status === 200) {
                    this.MySwal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Se ha actualizado el salón satsfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    this.MySwal.fire({
                        type: 'error',
                        position: 'top-end',
                        title: 'Oops...',
                        text: 'No se ha podido editar el salón ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.setState({
                        loading: false,
                        error: error
                    });
                }
            } catch (error) {
                this.setState({
                    loading: false,
                    error: error
                });
            }
        } else {
            this.MySwal.fire({
                type: 'error',
                position: 'top-end',
                title: 'Oops...',
                text: 'No se ha podido editar el salón ',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    remove = async id => {
        await fetch(`${this.props.api}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        loading: true
                    });
                    this.get();
                    this.MySwal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Se ha eliminado el salón satsfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    this.MySwal.fire({
                        type: 'error',
                        position: 'top-end',
                        title: 'Oops...',
                        text: 'No se ha podido eliminar el salón seleccionado',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                this.MySwal.fire({
                    type: 'error',
                    position: 'top-end',
                    title: 'Oops...',
                    text: 'No se ha podido eliminar el salón seleccionado',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <AgregarSalon
                            formNombre={this.state.form.name}
                            formUbicacion={this.state.form.location}
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                        />
                        {this.state.loading && <Loading />}
                        <ConsultarSalon
                            error={this.state.error}
                            classrooms={this.state.data}
                            handleEdit={this.handleEdit}
                            handleEnable={this.handleEnable}
                            handleDisable={this.handleDisable}
                            handleRemove={this.handleRemove}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Salones;
