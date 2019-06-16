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
        console.log('props... ', props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        semestres: this.semestres(),
        creditos: this.creditos(),
        data: [],
        loading: true,
        error: null,
        loadingS: true,
        form: {
            id: '',
            id_career: this.props.match.params.id,
            id_subject: '',
            semester: '',
            credits: '',
            enable: true
        },
        programas: [],
        subjects: []
    };
    semestres() {
        let arr = new Array();
        arr.push(<option key={0} />);
        for (let i = 1; i <= this.props.location.state.semesters; i++) {
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
    handleSubmit(e) {
        e.preventDefault();
        this.create();
    }
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
                id: `${this.state.form.id_career}0${this.state.form.id_subject}`
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
            this.state.form.id_career != '' &&
            this.state.form.id_subject &&
            this.state.form.semester != '' &&
            this.state.form.credits != ''
        ) {
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
                }
            } catch (error) {
                this.setState({
                    loading: false
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
                id_career: this.props.match.params.id,
                id_subject: '',
                semester: '',
                credits: '',
                enable: true
            }
        });
    };

    componentDidMount() {
        this.get();
        this.getAsignaturas();
    }
    getAsignaturas = async () => {
        try {
            const response = await fetch(this.props.apiAsignatura, {
                mode: 'no-cors'
            });
            const subjects = await response.json();
            this.setState({
                subjects: subjects,
                loadingS: false
            });
        } catch (error) {
            console.log(error);
            this.setState({
                loadingS: false,
                error: error
            });
        }
    };
    get = async () => {
        this.setState({
            loading: true,
            error: null
        });
        try {
            const response = await fetch(
                `${this.props.apiPA}${this.props.match.params.id}`
            );
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
    handleEnable = async (e, data) => {
        await this.setState({
            form: {
                id_career: this.props.match.params.id,
                id_subject: data.id_subject,
                semester: data.semester,
                credits: data.credits,
                enable: true
            }
        });
        this.edit(data.id);
    };
    handleDisable = async (e, data) => {
        await this.setState({
            form: {
                id_career: this.props.match.params.id,
                id_subject: data.id_subject,
                semester: data.semester,
                credits: data.credits,
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
        if (
            this.state.form.id_career != '' &&
            this.state.form.id_subject != '' &&
            this.state.form.semester != '' &&
            this.state.form.credits != ''
        ) {
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
                text: 'No se ha podidos editar la asignatura ',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    render() {
        if (this.state.loading || this.state.loadingS) {
            return <Loading />;
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <AgregarProgramaAsignatura
                                semestres={this.state.semestres}
                                creditos={this.state.creditos}
                                formPrograma={this.state.form.id_career}
                                formAsignatura={this.state.form.id_subject}
                                formSemestre={this.state.form.semester}
                                formCreditos={this.state.form.credits}
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                                id={this.props.match.params.id}
                                subjects={this.state.subjects}
                            />
                            <ConsultarProgramaAsignatura
                                error={this.state.error}
                                careersSubjects={this.state.data}
                                programas={this.state.programas}
                                handleRemove={this.handleRemove}
                                subjects={this.state.subjects}
                                handleEnable={this.handleEnable}
                                handleDisable={this.handleDisable}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ProgramaAsignatura;
