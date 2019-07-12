import React, { Component } from "react";
import Loading from "../../components/loading/Loading";
import DayPicker, { DateUtils } from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/es";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class Semestres extends Component {
    validate = /\d\d\d\d-[1-2]/;
    MySwal = withReactContent(Swal);
    state = {
        data: [],
        loading: true,
        error: null,
        selected: { id: 0 },
        locale: "",
        form: {
            title: "",
            dates: [],
            enable: true
        },
        add: "Agregar semestre..."
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
                mode: "no-cors"
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
    handleDayClick = (day, { selected }) => {
        const { dates } = this.state.form;
        if (selected) {
            const selectedIndex = dates.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            dates.splice(selectedIndex, 1);
        } else {
            if (dates.length < 4) {
                dates.push(day);
            } else {
                this.MySwal.fire({
                    type: "error",
                    position: "top-end",
                    title: "Oops...",
                    text: "No se pueden colocar más de 4 fechas al semestre",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        this.setState({
            form: {
                ...this.state.form,
                dates: dates
            }
        });
    };
    searchSemester = id => {
        var results = false;
        for (let i = 0; i < this.state.data.length; i++) {
            if (parseInt(this.state.data[i]["id"]) === parseInt(id)) {
                results = true;
            }
        }
        return results;
    };
    handleChange = e => {
        if (e.target.name === "semesters") {
            if (parseInt(e.target.value) === 9999) {
                this.addSemester();
            } else {
                this.setState({ loading: true });
                if (parseInt(e.target.value) != 0) {
                    var results = {};
                    const searchField = "id";
                    const searchVal = e.target.value;
                    for (var i = 0; i < this.state.data.length; i++) {
                        if (this.state.data[i][searchField] == searchVal) {
                            results = this.state.data[i];
                            continue;
                        }
                    }
                    this.setState({
                        selected: results,
                        form: {
                            ...this.state.form,
                            title: results.title
                        },
                        loading: false
                    });
                    if (results.dates) {
                        let dates = [];
                        results.dates.forEach(element => {
                            dates.push(new Date(element.split("T")[0]));
                        });
                        this.setState({
                            form: {
                                ...this.state.form,
                                loading: false,
                                dates: dates
                            }
                        });
                    }
                }
            }
        }
    };
    async addSemester() {
        const { value: semestre } = await this.MySwal.fire({
            title: "Agregar nuevo semestre",
            input: "text",
            inputPlaceholder: "Ejemplo: 2021-2"
        });
        if (this.validate.exec(semestre)) {
            this.setState({
                form: {
                    ...this.state.form,
                    title: semestre
                },
                add: semestre,
                selected: {
                    id: 9999
                }
            });
        } else {
            this.MySwal.fire({
                title:
                    "El formato de semestre que ha suministrado no es válido",
                type: "warning"
            });
            this.setState({
                selected: {
                    id: 0
                },
                add: "Agregar semestre..."
            });
        }
    }
    post = async () => {
        if (this.state.form.title != "" && this.state.form.dates.length === 4) {
            this.setState({ loading: true });
            const response = await fetch(this.props.api, {
                method: "POST",
                body: JSON.stringify(this.state.form),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                this.MySwal.close();
                this.MySwal.fire({
                    position: "top-end",
                    type: "success",
                    title: "Se ha guardado el semestre satsfactoriamente",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                this.MySwal.close();
                this.MySwal.fire({
                    type: "error",
                    position: "top-end",
                    title: "Oops...",
                    text: "No se ha podido crear el semestre ",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            this.setState({
                loading: false,
                isPostable: false
            });
            this.get();
            this.clear();
        } else {
            this.MySwal.fire({
                type: "error",
                position: "top-end",
                title: "Oops...",
                text: "No se ha podido crear el semestre, revise las fechas",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    clear = () => {
        this.setState({
            form: {
                title: "",
                dates: [],
                enable: true
            },
            add: "Agregar semestre...",
            selected: {
                id: 0
            }
        });
    };
    render() {
        const semestres = this.state.data.sort(function(a, b) {
            return a.id - b.id;
        });
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <label htmlFor='semesters'>Semestre</label>
                        <select
                            className='form-control'
                            onChange={this.handleChange}
                            id='semesters'
                            name='semesters'
                            value={this.state.selected.id}>
                            <option value={0} />
                            {semestres.map(semestre => {
                                return (
                                    <option
                                        key={semestre.id}
                                        value={semestre.id}>
                                        {semestre.title}
                                    </option>
                                );
                            })}
                            <option value={9999}>{this.state.add}</option>
                        </select>
                        <br />
                        <br />
                        {parseInt(this.state.selected.id) != 0 ? (
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <DayPicker
                                            containerProps={{
                                                className: "col-12"
                                            }}
                                            localeUtils={MomentLocaleUtils}
                                            locale={this.state.locale}
                                            selectedDays={this.state.form.dates}
                                            onDayClick={this.handleDayClick}
                                        />
                                        <br />
                                        {this.searchSemester(
                                            this.state.selected.id
                                        ) ? (
                                            <br />
                                        ) : (
                                            <button
                                                onClick={this.post}
                                                className='btn btn-block btn-success'>
                                                Guardar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h3>Seleccione un semestre</h3>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Semestres;
