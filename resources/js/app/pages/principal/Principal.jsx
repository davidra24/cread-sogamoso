import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import PrincipalForm from '../../components/principal/PrincipalForm';
import PrincipalInfo from '../../components/principal/PrincipalInfo';
class Principal extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        form: {
            id_semester: ''
        },
        semesters: [],
        loadingSemesters: true,
        loading: true,
        data: [],
        error: null,
        semes: []
    };
    fillSemesters() {
        let arr = new Array();
        arr.push(<option key={0} />);
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
        this.setState({
            semes: arr
        });
    }
    componentWillMount() {
        this.getSemester();
        this.get();
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
            this.fillSemesters();
        } catch (error) {
            this.setState({
                loadingSemesters: false,
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
            const response = await fetch(this.props.api);
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
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };
    render() {
        if (this.state.loading || this.state.loadingSemesters) {
            return <Loading />;
        } else {
            return (
                <div>
                    <PrincipalForm
                        semesters={this.state.semes}
                        formSemestre={this.state.form.id_semester}
                        handleChange={this.handleChange}
                    />
                    <br />
                    <PrincipalInfo />
                </div>
            );
        }
    }
}

export default Principal;
