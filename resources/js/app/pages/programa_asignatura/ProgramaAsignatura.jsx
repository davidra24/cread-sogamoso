import React, { Component } from 'react';
import AgregarProgramaAsignatura from '../../components/programa_asignatura/AgregarProgramaAsignatura';
import ConsultarProgramaAsignatura from '../../components/programa_asignatura/ConsultarProgramaAsignatura';
import Navbar from '../../components/navbar/Navbar';
import Loading from '../../components/loading/Loading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class ProgramaAsignatura extends Component {
    MySwal = withReactContent(Swal);
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        semestres: this.semestres(),
        creditos: this.creditos(),
        data: [],
        loading: true,
        error: null,
        form: {
            id: '',
            id_programa: this.props.match.params.id,
            id_asignatura: '',
            semestre: '',
            creditos: ''
        },
        programas: []
    };

    semestres() {
        let arr = new Array();
        arr.push(<option key={0} />);
        for (let i = 1; i <= this.props.location.state.semestres; i++) {
            arr.push(<option key={i}>{i}</option>);
        }
        return arr;
    }
    creditos() {
        let arr = new Array();
        arr.push(<option key={0} />);
        for (let i = 1; i <= 4; i++) {
            arr.push(<option key={i}>{i}</option>);
        }
        return arr;
    }
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
    remove = async id => {
        await fetch(`${this.props.location.state.api}/${id}`, {
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
    handleSubmit(e) {
        e.preventDefault();
        this.create();
    }
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
                id: `${this.state.form.id_programa}0${
                    this.state.form.id_asignatura
                }`
            }
        });
    };
    create = async () => {
        this.setState({
            loading: true,
            error: null
        });
        console.log(this.state.form);
        if (
            this.state.form.id != '' &&
            this.state.form.id_programa != '' &&
            this.state.form.id_asignatura &&
            this.state.form.semestre != '' &&
            this.state.form.creditos != ''
        ) {
            try {
                const response = await fetch(this.props.location.state.api, {
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
                text: 'No se ha podido crear la asignatura ',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    clear = () => {
        this.setState({
            form: {
                id: '',
                id_programa: this.props.match.params.id,
                id_asignatura: '',
                semestre: '',
                creditos: ''
            }
        });
    };

    componentDidMount() {
        this.get();
        console.log(this.state.data);
    }
    get = async () => {
        this.setState({
            loading: true,
            error: null
        });
        try {
            const response = await fetch(this.props.location.state.apiPA, {
                mode: 'no-cors'
            });
            const data = await response.json();
            this.setState({
                loading: false,
                data: data
            });
            if (data) {
                await this.getAsignatura();
            }
        } catch (error) {
            this.setState({
                loading: false,
                error: error
            });
        }
    };

    render() {
        return (
            <Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <AgregarProgramaAsignatura
                                semestres={this.state.semestres}
                                creditos={this.state.creditos}
                                formPrograma={this.state.form.id_programa}
                                formAsignatura={this.state.form.id_asignatura}
                                formSemestre={this.state.form.semestre}
                                formCreditos={this.state.form.creditos}
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                                id={this.props.match.params.id}
                                api={this.props.location.api}
                                apiAsignatura="/api/asignaturas"
                            />
                            <ConsultarProgramaAsignatura
                                error={this.state.error}
                                careersSubjects={this.state.data}
                                programas={this.state.programas}
                                handleRemove={this.handleRemove}
                                apiAsignatura="/api/asignaturas"
                            />
                            {this.state.loading && <Loading />}
                        </div>
                    </div>
                </div>
            </Navbar>
        );
    }
}

export default ProgramaAsignatura;
