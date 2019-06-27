import React, { Component } from 'react';
import Loading from '../../components/loading/Loading';
import PrincipalForm from '../../components/principal/PrincipalForm';
import PrincipalInfo from '../../components/principal/PrincipalInfo';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DateUtils } from 'react-day-picker';
import load from '../../images/loading.gif';

class Principal extends Component {
    validate = /\d\d\d\d-[1-2]/;
    MySwal = withReactContent(Swal);
    constructor(props) {
        super(props);
    }
    state = {
        form: {
            id_semester: '',
            id_career: ''
        },
        semesters: [],
        careers: [],
        loadingSemesters: true,
        loadingCareers: true,
        loading: false,
        data: [],
        error: null,
        semes: [],
        caree: [],
        responseUpdated: false,
        modalIsOpen: false,
        selectedDays: []
    };
    handleOpenModal = e => {
        this.setState({ modalIsOpen: true });
    };
    handleCloseModal = e => {
        this.setState({ modalIsOpen: false });
    };
    fillSemesters() {
        let arr = new Array();
        const semestres = this.state.semesters.sort(function(a, b) {
            return a.id - b.id;
        });
        semestres.map(semestre => {
            arr.push(
                <option key={semestre.id} value={semestre.id}>
                    {semestre.title}
                </option>
            );
            if (semestre.enable) {
                this.setState({
                    form: {
                        ...this.state.form,
                        id_semester: semestre.id
                    }
                });
            }
        });
        arr.push(
            <option key={0} value={0}>
                Agregar semestre...
            </option>
        );
        this.setState({
            semes: arr,
            loadingSemesters: false
        });
    }
    async addSemester() {
        const { value: semestre } = await this.MySwal.fire({
            title: 'Agregar nuevo semestre',
            input: 'text',
            inputPlaceholder: 'Ejemplo: 2021-2'
        });
        if (this.validate.exec(semestre)) {
            this.postSemester(semestre);
            this.MySwal.fire({
                title: '<strong>CARGANDO...</strong>',
                imageUrl: load,
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                showConfirmButton: false
            });
        } else {
            this.MySwal.fire({
                title:
                    'El formato de semestre que ha suministrado no es válido',
                type: 'warning'
            });
        }
    }
    async postSemester(semestre) {
        const response = await fetch(this.props.apiSemester, {
            method: 'POST',
            body: JSON.stringify({ title: semestre, enable: true }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            this.MySwal.close();
            this.MySwal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Se ha guardado el semestre satsfactoriamente',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            this.MySwal.close();
            this.MySwal.fire({
                type: 'error',
                position: 'top-end',
                title: 'Oops...',
                text: 'No se ha podido crear el semestre ',
                showConfirmButton: false,
                timer: 1500
            });
        }
        this.setState({
            loadingSemesters: true
        });
        this.clear();
        this.getSemester();
    }
    clear() {
        this.setState({
            form: {
                id_semester: '',
                id_career: ''
            }
        });
    }
    fillCareers() {
        let arr = new Array();
        arr.push(<option key={0} value={0} />);
        this.state.careers.map(career => {
            arr.push(
                <option key={career.id} value={career.id}>
                    {career.name}
                </option>
            );
        });
        this.setState({
            caree: arr,
            loadingCareers: false
        });
    }
    componentDidMount() {
        this.getSemester();
        this.getCareer();
    }
    getSemester = async () => {
        this.setState({
            loadingSemesters: true,
            error: null
        });
        try {
            const response = await fetch(this.props.apiSemester);
            const data = await response.json();
            this.setState({
                semesters: data
            });
            await this.fillSemesters();
        } catch (error) {
            this.setState({
                loadingSemesters: false,
                error: error
            });
        }
    };
    getCareer = async () => {
        this.setState({
            loadingCareers: true,
            error: null
        });
        try {
            const response = await fetch(this.props.apiCareer);
            const data = await response.json();
            this.setState({
                careers: data
            });
            await this.fillCareers();
        } catch (error) {
            this.setState({
                loadingCareers: false,
                error: error
            });
        }
    };
    get = async (id_semester, id_career) => {
        try {
            const response = await fetch(
                `${this.props.api}/${id_semester}/${id_career}`
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
    updateSemester = async semestre => {
        this.setState({
            loadingSemesters: true
        });
        await fetch(`${this.props.apiSemester}/${semestre.id}`, {
            method: 'PUT',
            body: JSON.stringify(semestre),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (parseInt(res.status) === 200) {
                this.setState({
                    responseUpdated: true
                });
            } else {
                this.setState({
                    responseUpdated: false
                });
            }
        });
    };
    updateSemesters = id_semestre => {
        this.state.semesters.map(semestre => {
            if (parseInt(id_semestre) === parseInt(semestre.id)) {
                semestre = { ...semestre, enable: true };
                this.updateSemester(semestre);
                this.setState({
                    loadingSemesters: false
                });
            } else {
                if (semestre.enable) {
                    semestre = { ...semestre, enable: false };
                    this.updateSemester(semestre);
                    this.setState({
                        loadingSemesters: false
                    });
                }
            }
        });
    };
    handleChange = e => {
        const historySemester = this.state.form.id_semester;
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        if (e.target.name === 'id_semester') {
            if (parseInt(e.target.value) === 0) {
                this.setState({
                    form: {
                        ...this.state.form,
                        id_semester: historySemester
                    }
                });
            } else {
                this.setState({
                    loadingSemesters: true,
                    form: {
                        id_semester: e.target.value,
                        id_career: 0
                    }
                });
                this.updateSemesters(e.target.value);
            }
        } else {
            if (
                parseInt(this.state.form.id_semester) != 0 &&
                parseInt(e.target.value) != 0
            ) {
                this.setState({
                    loading: true,
                    error: null
                });
                this.get(this.state.form.id_semester, e.target.value);
            }
        }
    };
    openModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    };
    render() {
        return (
            <div>
                {this.state.loadingSemesters || this.state.loadingCareers ? (
                    <Loading />
                ) : (
                    <PrincipalForm
                        semesters={this.state.semes}
                        careers={this.state.caree}
                        formSemestre={this.state.form.id_semester}
                        formCareer={this.state.form.id_career}
                        handleChange={this.handleChange}
                    />
                )}
                <br />
                {this.loading ? (
                    <Loading />
                ) : this.state.form.id_career ? (
                    <PrincipalInfo
                        lessons={this.state.data}
                        onCloseModal={this.handleCloseModal}
                        onOpenModal={this.handleOpenModal}
                        modalIsOpen={this.state.modalIsOpen}
                        selectedDays={this.selectedDays}
                        onDayClick={this.handleDayClick}
                        openModal={this.openModal}
                    />
                ) : (
                    <h2>Seleccione un programa</h2>
                )}
            </div>
        );
    }
}

export default Principal;
