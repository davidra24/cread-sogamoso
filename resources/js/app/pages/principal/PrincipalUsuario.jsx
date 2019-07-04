import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarModal from '../../components/principal/CalendarModal';
import Loading from '../../components/loading/Loading';

class PrincipalUsuario extends Component {
    state = {
        data: [],
        loading: false,
        error: null,
        semesters: [],
        careers: [],
        loadingSemesters: true,
        loadingCareers: true,
        semes: [],
        caree: [],
        modalIsOpen: false,
        selectedDays: [],
        form: {
            id_semester: '',
            id_career: 0
        }
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
    async componentDidMount() {
        await this.getSemester();
        await this.getCareer();
        await this.fillCareers();
        await this.fillSemesters();
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
    searchSemester = id => {
        var results = false;
        for (let i = 0; i < this.state.semesters.length; i++) {
            if (parseInt(this.state.semesters[i]['id']) === parseInt(id)) {
                results = true;
                const arr = [];
                this.state.semesters[i]['dates'].forEach(element => {
                    arr.push(new Date(element.split('T')[0]));
                });
                this.setState({
                    selectedDays: arr
                });
            }
        }
        this.setState({ loading: false });
        return results;
    };
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        if (e.target.name === 'id_semester') {
            this.setState({
                form: {
                    id_semester: e.target.value,
                    id_career: 0
                },
                data: []
            });
            this.searchSemester(e.target.value);
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
        const semesters = this.state.semes;
        const careers = this.state.caree;
        console.log(this.state);

        if (
            this.state.loading ||
            this.state.loadingCareers ||
            this.state.loadingSemesters
        ) {
            return <Loading />;
        }
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-11">
                            <select
                                name="id_semester"
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.form.id_semester}
                            >
                                {semesters}
                            </select>
                        </div>
                        <div className="col-1">
                            <button
                                className="btn btn-info"
                                onClick={this.openModal}
                            >
                                <FontAwesomeIcon icon="calendar-alt" />
                            </button>
                            <CalendarModal
                                onCloseModal={this.handleCloseModal}
                                onOpenModal={this.handleOpenModal}
                                openModal={this.openModal}
                                isOpen={this.state.modalIsOpen}
                                selectedDays={this.state.selectedDays}
                            />
                        </div>
                        <div className="col-12">
                            <br />
                            <select
                                name="id_career"
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.form.id_career}
                            >
                                {careers}
                            </select>
                            <br />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {this.state.data.lenght === 0 ? (
                                <h1>Aún no hay horarios asignados</h1>
                            ) : (
                                <Fragment>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Semestre</th>
                                                <th scope="col">Asignatura</th>
                                                <th scope="col">Docente</th>
                                                <th scope="col">Teléfono</th>
                                                <th scope="col">Aula</th>
                                                <th scope="col">Hora</th>
                                            </tr>
                                        </thead>
                                        <tbody>{getRows(this.state)}</tbody>
                                    </table>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function getRows(props) {
    let arr = [];
    props.data.map(lesson => {
        arr.push(
            <tr
                key={`${lesson.id_subject}0${lesson.start_hour}0${
                    lesson.end_hour
                }`}
            >
                <th scope="row">{lesson.subject_semster}</th>
                <td>{lesson.name_subject}</td>
                <td>{lesson.name_teacher}</td>
                <td>{lesson.phone_teacher}</td>
                <td>
                    {lesson.name_classroom} - {lesson.location_classroom}
                </td>
                <td>{`${lesson.start_hour} - ${lesson.end_hour}`}</td>
            </tr>
        );
    });
    return arr;
}

export default PrincipalUsuario;
