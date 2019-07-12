import React, { Component, Fragment } from "react";
import Loading from "../../components/loading/Loading";
import PrincipalForm from "../../components/principal/PrincipalForm";
import PrincipalInfo from "../../components/principal/PrincipalInfo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DateUtils } from "react-day-picker";
import load from "../../images/loading.gif";

class Principal extends Component {
    validate = /\d\d\d\d-[1-2]/;
    MySwal = withReactContent(Swal);
    constructor(props) {
        super(props);
    }
    state = {
        form: {
            id_semester: "",
            id_career: ""
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
        selectedDays: [],
        selected: {}
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
                this.searchSemester(semestre.id);
            }
        });
        this.setState({
            semes: arr,
            loadingSemesters: false
        });
    }
    handleRemove = (e, data) => {
        this.MySwal.fire({
            title: "¿Está seguro?",
            text: "¿Está seguro que desea eliminar este horario?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#808080",
            confirmButtonText: "Sí",
            cancelButtonText: "No"
        }).then(result => {
            if (result.value) {
                this.setState({ loading: true });
                this.remove(data);
            }
        });
    };
    remove = async data => {
        await fetch(
            `${this.props.api}/${data.id_classroom}/${data.id_career_subject}/${
                data.id_semester
            }/${data.id_teacher}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            }
        ).then(response => {
            if (response.status === 200) {
                this.setState({
                    loading: false
                });
                this.get(data.id_semester, data.id_career);
                this.MySwal.fire({
                    position: "top-end",
                    type: "success",
                    title: "Se ha eliminado el horario satsfactoriamente",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                this.MySwal.fire({
                    type: "error",
                    position: "top-end",
                    title: "Oops...",
                    text: "No se ha podido eliminar el horario seleccionado",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };
    /*async addSemester() {
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
    }*/
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
        this.setState({
            data: []
        });
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
            method: "PUT",
            body: JSON.stringify(semestre),
            headers: {
                "Content-Type": "application/json"
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
    searchSemester = id => {
        var results = false;
        for (let i = 0; i < this.state.semesters.length; i++) {
            if (parseInt(this.state.semesters[i]["id"]) === parseInt(id)) {
                results = true;
                const arr = [];
                this.state.semesters[i]["dates"].forEach(element => {
                    arr.push(new Date(element.split("T")[0]));
                });
                this.setState({
                    selectedDays: arr
                });
            }
        }
        return results;
    };
    handleChange = e => {
        const historySemester = this.state.form.id_semester;
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        if (e.target.name === "id_semester") {
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
                this.searchSemester(e.target.value);
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
        if (
            this.state.loading ||
            this.state.loadingSemesters ||
            this.state.loadingCareers
        ) {
            return <Loading />;
        }
        return (
            <Fragment>
                <PrincipalForm
                    semesters={this.state.semes}
                    careers={this.state.caree}
                    formSemestre={this.state.form.id_semester}
                    formCareer={this.state.form.id_career}
                    handleChange={this.handleChange}
                    onCloseModal={this.handleCloseModal}
                    onOpenModal={this.handleOpenModal}
                    modalIsOpen={this.state.modalIsOpen}
                    openModal={this.openModal}
                    selectedDays={this.state.selectedDays}
                />
                <br />
                {this.loading ? (
                    <Loading />
                ) : this.state.form.id_career != 0 ? (
                    <PrincipalInfo
                        lessons={this.state.data}
                        onDayClick={this.handleDayClick}
                        remove={this.handleRemove}
                    />
                ) : (
                    <h2>Seleccione un programa</h2>
                )}
            </Fragment>
        );
    }
}

export default Principal;
