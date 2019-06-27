import React, { Component } from 'react';
import AgregarAsignatura from '../../components/asignaturas/AgregarAsignatura';
import ConsultarAsignatura from '../../components/asignaturas/ConsultarAsignatura';
import Loading from '../../components/loading/Loading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Asignaturas extends Component {
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
            name: ''
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
        if (this.state.form.name != '') {
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
                        title: 'Se ha guardado la asignatura satsfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    this.MySwal.fire({
                        type: 'error',
                        position: 'top-end',
                        title: 'Oops...',
                        text: 'No se ha podido crear la asignatura ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.setState({
                        loading: false
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
                text: 'No se ha podido crear la asignatura ',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    clear = () => {
        this.setState({
            form: {
                name: ''
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
            text: '¿Está seguro que desea eliminar esta asignatura?',
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
            title: 'Editar asignatura',
            html:
                '<label>Nombre:</label>' +
                `<input id="nombre_asignatura" class="swal2-input" placeholder="Nombre" value="${
                    data.name
                }"/>`,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('nombre_asignatura').value;
                this.setState({
                    form: {
                        name: name
                    }
                });
            }
        });
        if (this.state.form.name != '') {
            this.edit(data.id);
        }
    };
    edit = async id => {
        this.setState({
            loading: true,
            error: null
        });
        if (this.state.form.name != '') {
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
                        title:
                            'Se ha actualizado la asignatura satsfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    this.MySwal.fire({
                        type: 'error',
                        position: 'top-end',
                        title: 'Oops...',
                        text: 'No se ha podido editar la asignatura ',
                        showConfirmButton: false,
                        timer: 1500
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
                text: 'No se ha podido editar la asignatura',
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
                        title:
                            'Se ha eliminado la asignatura satsfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    this.MySwal.fire({
                        type: 'error',
                        position: 'top-end',
                        title: 'Oops...',
                        text:
                            'No se ha podido eliminar la asignatura seleccionada',
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
                    text: 'No se ha podido eliminar la asignatura seleccionada',
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
                        <AgregarAsignatura
                            formNombre={this.state.form.name}
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                        />
                        {this.state.loading && <Loading />}
                        <ConsultarAsignatura
                            error={this.state.error}
                            subjects={this.state.data}
                            handleEdit={this.handleEdit}
                            handleRemove={this.handleRemove}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Asignaturas;
