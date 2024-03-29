import React, { Component, Fragment } from 'react';
import Loading from '../../components/loading/Loading';
import 'moment/locale/es';
import Collapsible from 'react-collapsible';
import TimeKeeper from 'react-timekeeper';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Miniloading from '../../components/loading/Miniloading';

class AddLesson extends Component {
    MySwal = withReactContent(Swal);
    constructor(props) {
        super(props);
        this.handleItem = this.handleItem.bind(this);
        this.handleInitialTimeChange = this.handleInitialTimeChange.bind(this);
        this.handleFinalTimeChange = this.handleFinalTimeChange.bind(this);
    }
    state = {
        data: [],
        subjects: [],
        teachers: [],
        classrooms: [],
        career: {},
        semester: {},
        title_semester: '',
        name_career: '',
        loading: false,
        loadingSemester: true,
        loadingCareer: true,
        loadingSubjects: true,
        loadingTeachers: true,
        loadingClassrooms: true,
        error: null,
        listCarrersToAssing: [],
        id_career: this.props.match.params.id_career,
        form: {
            id_semester: this.props.match.params.id_semester,
            id_career_subject: '',
            id_teacher: '',
            id_classroom: '',
            start_hour: '12:00',
            end_hour: '12:00',
        },
        init_hour: '12:00 pm',
        final_hour: '12:00 pm',
        selected: '',
        locale: 'es',

        visible: false,
        teacherloading: false,
        timeTeacher: [],

        visibleclass: false,
        classloading: false,
        timeClass: [],
    };
    handleInitialTimeChange = (newTime) => {
        this.setState({
            form: {
                ...this.state.form,
                start_hour: newTime.formatted24,
            },
            init_hour: newTime.formatted,
        });
    };
    handleFinalTimeChange = (newTime) => {
        this.setState({
            form: {
                ...this.state.form,
                end_hour: newTime.formatted24,
            },
            final_hour: newTime.formatted,
        });
    };
    async componentDidMount() {
        await this.get();
        await this.getCareer();
        await this.getSubjects();
        await this.getSemester();
        await this.validateSubjects();
        await this.getTeachers();
        await this.getClassrooms();
    }
    validateSubjects = async () => {
        await this.state.subjects.map((subject) => {
            if (!subject.enable) {
                const index = this.state.subjects.findIndex(
                    (x) => parseInt(x.id) === parseInt(subject.id),
                );
                this.state.subjects.splice(index, 1);
            }
        });
    };
    getClassrooms = async () => {
        this.setState({
            loadingClassrooms: true,
            error: null,
        });
        try {
            const response = await fetch(this.props.apiClassrooms);
            const data = await response.json();
            this.setState({
                loadingClassrooms: false,
                classrooms: data,
            });
        } catch (error) {
            this.setState({
                loadingClassrooms: false,
                error: error,
            });
        }
    };
    get = async () => {
        this.setState({
            loading: true,
            error: null,
        });
        try {
            const response = await fetch(
                `${this.props.api}/${this.state.form.id_semester}/${
                    this.state.id_career
                }`,
            );
            const data = await response.json();
            this.setState({
                loading: false,
                data: data,
            });
        } catch (error) {
            this.setState({
                loading: false,
                error: error,
            });
        }
    };
    getSubjects = async () => {
        this.setState({
            loadingSubjects: true,
            error: null,
        });
        try {
            const response = await fetch(
                `${this.props.apiPA}/${this.state.id_career}`,
            );
            const data = await response.json();
            this.setState({
                loadingSubjects: false,
                subjects: data,
            });
        } catch (error) {
            this.setState({
                loadingSubjects: false,
                error: error,
            });
        }
    };
    getTeachers = async () => {
        this.setState({
            loadingTeachers: true,
            error: null,
        });
        try {
            const response = await fetch(this.props.apiDocentes);
            const data = await response.json();
            this.setState({
                loadingTeachers: false,
                teachers: data,
            });
        } catch (error) {
            this.setState({
                loadingTeachers: false,
                error: error,
            });
        }
    };
    getSemester = async () => {
        this.setState({
            loadingSemester: true,
            error: null,
        });
        try {
            const response = await fetch(
                `${this.props.apiSemester}/${this.state.form.id_semester}`,
            );
            const data = await response.json();
            this.setState({
                loadingSemester: false,
                semester: data,
            });
        } catch (error) {
            this.setState({
                loadingSemester: false,
                error: error,
            });
        }
    };
    getCareer = async () => {
        this.setState({
            loadingCareer: true,
            error: null,
        });
        try {
            const response = await fetch(
                `${this.props.apiCareer}/${this.state.id_career}`,
            );
            const data = await response.json();
            this.setState({
                career: data,
                loadingCareer: false,
            });
        } catch (error) {
            this.setState({
                loadingCareer: false,
                error: error,
            });
        }
    };
    clear = () => {
        this.setState({
            form: {
                id_semester: this.props.match.params.id_semester,
                id_career_subject: '',
                id_teacher: '',
                id_classroom: '',
                start_hour: '12:00',
                end_hour: '12:00',
            },
            init_hour: '12:00 pm',
            final_hour: '12:00 pm',
        });
    };
    handleItem = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                id_teacher: 0,
                id_career_subject: e.target.value,
            },
        });
    };
    handleClass = async (id) => {
        this.setState({
            classloading: true,
        });
        try {
            const response = await fetch(
                `/api/lessons/${
                    this.props.match.params.id_semester
                }/classroom/${id}`,
            );
            const data = await response.json();
            this.setState({
                timeClass: data,
                classloading: false,
            });
        } catch (error) {
            this.setState({
                classloading: false,
                error: error,
            });
        }
    };
    handleSelectedChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                id_teacher: e.target.value,
            },
        });
        if (e.target.value != 0) {
            this.setState({
                visible: true,
            });
            this.handleTime(e.target.value);
        } else {
            this.setState({
                visible: false,
            });
        }
    };
    handleSelectedChangeClass = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                id_classroom: e.target.value,
            },
        });
        if (e.target.value != 0) {
            this.setState({
                visibleclass: true,
            });
            this.handleClass(e.target.value);
        } else {
            this.setState({
                visibleclass: false,
            });
        }
    };
    getSubjectInfo = () => {
        var s = '';
        this.state.subjects.map((subject) => {
            if (
                parseInt(subject.id) ===
                parseInt(this.state.form.id_career_subject)
            ) {
                s = subject;
            }
        });
        return s;
    };
    validateHour = () => {
        if (
            parseInt(this.state.form.start_hour.split(':')[0]) >=
            parseInt(this.state.form.end_hour.split(':')[0])
        ) {
            this.MySwal.fire({
                type: 'error',
                position: 'top-end',
                title: 'Oops...',
                text: 'No se puede asignar una hora menor o igual a la inicial',
                showConfirmButton: false,
                timer: 1500,
            });
            return false;
        } else {
            return true;
        }
    };
    handleSave = () => {
        if (
            this.state.form.id_career_subject != '' &&
            this.state.form.id_teacher != '' &&
            this.state.form.start_hour != '' &&
            this.state.form.end_hour != '' &&
            this.state.form.id_classroom != ''
        ) {
            if (this.validateHour()) {
                this.post();
            }
        } else {
            this.MySwal.fire({
                type: 'error',
                position: 'top-end',
                title: 'Oops...',
                text: 'Rellene todos los campos antes de guardar el registro',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    handleTime = async (id) => {
        this.setState({
            teacherloading: true,
        });
        try {
            const response = await fetch(
                `/api/lessons/${
                    this.props.match.params.id_semester
                }/teacher/${id}`,
            );
            const data = await response.json();
            this.setState({
                timeTeacher: data,
                teacherloading: false,
            });
        } catch (error) {
            this.setState({
                teacherloading: false,
                error: error,
            });
        }
    };
    post = async () => {
        this.setState({
            loading: true,
            error: null,
        });
        try {
            const response = await fetch(this.props.api, {
                method: 'POST',
                body: JSON.stringify(this.state.form),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.setState({
                loading: true,
            });
            this.clear();
            this.get();
            const msg = await response.json();
            if (response.status === 200) {
                if (msg.hasOwnProperty('mensaje')) {
                    this.MySwal.fire({
                        type: 'error',
                        position: 'top-end',
                        title: 'Oops...',
                        text: msg.mensaje,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    this.MySwal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Se ha guardado la clase satsfactoriamente',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                this.MySwal.fire({
                    type: 'error',
                    position: 'top-end',
                    title: 'Oops...',
                    text: 'No se ha podido crear la clase ',
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.setState({
                    loading: false,
                });
            }
        } catch (error) {
            this.setState({
                loading: false,
                error: error,
            });
        }
    };
    render() {
        if (
            this.state.loading ||
            this.state.loadingSubjects ||
            this.state.loadingSemester ||
            this.state.loadingCareer ||
            this.state.loadingTeachers ||
            this.state.loadingClassrooms
        ) {
            return <Loading />;
        }
        const subjects = this.state.subjects.sort(function(a, b) {
            return a.semester - b.semester;
        });
        const subjectInfo = this.getSubjectInfo();
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h1>Agregar horario de clase</h1>
                        <h2>
                            {this.state.semester.title} •{' '}
                            {this.state.career.name}
                        </h2>
                        <br />
                        {/*<div className="col-12">
                            <Collapsible
                                triggerClassName="col-12 btn btn-block btn-info pointer"
                                triggerOpenedClassName="col-12 btn btn-block btn-info pointer"
                                contentInnerClassName="card"
                                trigger="Fechas"
                            >
                                <DayPicker
                                    localeUtils={MomentLocaleUtils}
                                    locale={this.state.locale}
                                    selectedDays={this.state.form.schedule.days}
                                    onDayClick={this.handleDayClick}
                                />
                            </Collapsible>
                            <br />
                        </div>*/}
                    </div>
                    <div className='col-12 col-md-6'>
                        <ul className='list-group'>
                            {subjects.map((subject) => {
                                return (
                                    <li
                                        className='list-group-item list-group-item-action pointer alert-success'
                                        onClick={this.handleItem}
                                        key={subject.id}
                                        value={subject.id}>
                                        {subject.name_subject}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className=''>
                            <h3>
                                {subjectInfo.name_subject
                                    ? subjectInfo.name_subject
                                    : 'Haga click en una asignatura'}
                            </h3>
                            <br />
                            <strong>Docentes</strong>
                            <select
                                className='form-control'
                                name='teacher'
                                onChange={this.handleSelectedChange}
                                value={this.state.form.id_teacher}>
                                <option key={0} value={0} />
                                {this.state.teachers.map((teacher) => {
                                    return (
                                        <option
                                            key={teacher.id}
                                            value={teacher.id}>
                                            {teacher.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <br />
                            {this.state.visible ? (
                                <div className='card'>
                                    {this.state.teacherloading ? (
                                        <Miniloading />
                                    ) : (
                                        <ul className='list-group'>
                                            {this.state.timeTeacher != [] &&
                                            this.state.timeTeacher.length ? (
                                                <Fragment>
                                                    <strong>
                                                        Los horarios del docente
                                                        son:
                                                    </strong>
                                                    {this.state.timeTeacher.map(
                                                        (time, index) => {
                                                            return (
                                                                <li
                                                                    className='list-group-item'
                                                                    key={index}>
                                                                    <strong>
                                                                        {time}
                                                                    </strong>
                                                                </li>
                                                            );
                                                        },
                                                    )}
                                                </Fragment>
                                            ) : (
                                                <strong>
                                                    El docente no tiene horarios
                                                    asignados
                                                </strong>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <Fragment />
                            )}
                            <br />
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-6'>
                                    <strong>Hora inicial</strong>
                                    <br />
                                    <TimeKeeper
                                        time={this.state.init_hour}
                                        onChange={this.handleInitialTimeChange}
                                    />
                                </div>
                                <br />
                                <div className='col-12 col-md-12 col-lg-6'>
                                    <strong>Hora final</strong>
                                    <br />
                                    <TimeKeeper
                                        time={this.state.final_hour}
                                        onChange={this.handleFinalTimeChange}
                                    />
                                </div>
                            </div>
                            <br />
                            <strong>Salón de clases</strong>
                            <select
                                className='form-control'
                                name='classroom'
                                onChange={this.handleSelectedChangeClass}
                                value={this.state.form.id_classroom}>
                                <option key={0} value={0} />
                                {this.state.classrooms.map((classroom) => {
                                    return (
                                        <option
                                            key={classroom.id}
                                            value={classroom.id}>
                                            {classroom.name} =>
                                            {' ' + classroom.location}
                                        </option>
                                    );
                                })}
                            </select>
                            <br />
                            {this.state.visibleclass ? (
                                <div className='card'>
                                    {this.state.classloading ? (
                                        <Miniloading />
                                    ) : (
                                        <ul className='list-group'>
                                            {this.state.timeClass != [] &&
                                            this.state.timeClass.length ? (
                                                <Fragment>
                                                    <strong>
                                                        Los horarios del salón
                                                        son:
                                                    </strong>
                                                    {this.state.timeClass.map(
                                                        (time, index) => {
                                                            return (
                                                                <li
                                                                    className='list-group-item'
                                                                    key={index}>
                                                                    <strong>
                                                                        {time}
                                                                    </strong>
                                                                </li>
                                                            );
                                                        },
                                                    )}
                                                </Fragment>
                                            ) : (
                                                <strong>
                                                    El salón no tiene horarios
                                                    asignados
                                                </strong>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <Fragment />
                            )}
                            <br />
                            <button
                                className='btn-success btn btn-block'
                                onClick={this.handleSave}>
                                Guardar
                            </button>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddLesson;
