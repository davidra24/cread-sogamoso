import React, { Component } from 'react';
import Loading from '../../components/loading/Loading';
import PrincipalForm from '../../components/principal/PrincipalForm';
import PrincipalInfo from '../../components/principal/PrincipalInfo';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
        caree: []
    };
    fillSemesters() {
        let arr = new Array();
        this.state.semesters.map(semestre => {
            if (semestre.enable) {
                this.setState({
                    form: {
                        ...this.state.form,
                        id_semester: semestre.id
                    }
                });
            }
            arr.push(
                <option key={semestre.id} value={semestre.id}>
                    {semestre.title}
                </option>
            );
        });
        arr.push(
            <option key={0} value={0}>
                Agregar semestre...
            </option>
        );
        this.setState({
            semes: arr
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
        arr.push(<option key={0} />);
        this.state.careers.map(career => {
            arr.push(
                <option key={career.id} value={career.id}>
                    {career.name}
                </option>
            );
        });
        this.setState({
            caree: arr
        });
    }
    componentWillMount() {
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
                semesters: data,
                loadingSemesters: false
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
                careers: data,
                loadingCareers: false
            });
            await this.fillCareers();
        } catch (error) {
            this.setState({
                loadingCareers: false,
                error: error
            });
        }
    };
    get = async () => {
        try {
            const response = await fetch(
                `${this.props.api}/${this.state.form.id_semester}/${
                    this.state.form.id_career
                }`
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
    updateSemester = async e => {
        let isUpdated = false;
        await this.state.semesters.map(semestre => {
            if (this.state.form.id_semester === semestre.id) {
                semestre.enable = true;
                const response = fetch(
                    `${this.props.apiSemester}/${semestre.id}`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(semestre),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response);
                if (response.status === 200) {
                    isUpdated = true;
                } else {
                    isUpdated = false;
                }
            } else {
                if (semestre.enable) {
                    semestre.enable = false;
                    const response = fetch(
                        `${this.props.apiSemester}/${semestre.id}`,
                        {
                            method: 'PUT',
                            body: JSON.stringify(semestre),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    console.log(response);
                    if (response.status === 200) {
                        isUpdated = true;
                    } else {
                        isUpdated = false;
                    }
                }
            }
        });
        this.setState({
            loadingSemesters: false
        });
        if (isUpdated) {
            this.MySwal.fire({
                position: 'top-end',
                type: 'success',
                title:
                    'Se ha actualizado el semestre actual satisfactoriamente',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    handleChange = e => {
        const historySemester = this.state.form.id_semester;
        console.log(e.target.name, ': ', e.target.value);
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        if (e.target.name == 'id_semester') {
            console.log('es id semestre');
            if (e.target.value == 0) {
                console.log('es 0');
                this.addSemester();
                this.setState({
                    form: {
                        ...this.state.form,
                        id_semester: historySemester
                    }
                });
            } /*else {
                console.log('no es 0');
                this.setState({
                    loadingSemesters: true
                });
                this.updateSemester();
            }*/
        }
        if (
            this.state.form.id_career != 0 &&
            this.state.form.id_semester != 0
        ) {
            this.setState({
                loading: true,
                error: null
            });
            this.get();
        }
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
                        handleChange={this.handleChange}
                    />
                )}
                <br />
                {this.state.form.id_career ? (
                    this.loading ? (
                        <Loading />
                    ) : (
                        <PrincipalInfo lessons={this.state.data} />
                    )
                ) : (
                    <h2>Seleccione un programa</h2>
                )}
            </div>
        );
    }
}

export default Principal;
