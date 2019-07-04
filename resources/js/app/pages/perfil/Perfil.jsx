import React, { Component } from 'react';
import Loading from '../../components/loading/Loading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    MySwal = withReactContent(Swal);
    state = {
        loading: true,
        data: [],
        error: null,
        form: {
            name: '',
            email: '',
            mypassword: '',
            password: ''
        },
        repassword: ''
    };
    componentDidMount() {
        this.get();
    }
    passChange = e => {
        this.setState({
            [e.target.name]: e.target.value
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
    get = async () => {
        this.setState({
            loading: true,
            error: null
        });
        try {
            const response = await fetch(
                `${this.props.api}/${this.props.user.id}`
            );
            const data = await response.json();
            this.setState({
                loading: false,
                data: data,
                form: {
                    name: data.name,
                    email: data.email,
                    password: data.password
                }
            });
        } catch (error) {
            this.setState({
                loading: false,
                error: error
            });
        }
    };
    handleSubmit = () => {
        console.log(this.state);

        /*if (this.state.form.mypassword === '') {
            this.put();
        } else if (
            this.state.form.password === this.state.repassword &&
            this.state.form.password != ''
        ) {
            this.put();
        } else {
            this.MySwal.fire({
                type: 'error',
                position: 'top-end',
                title: 'Oops...',
                text:
                    'Verifique que la nueva contraseña coincida con su confirmación',
                showConfirmButton: false,
                timer: 1500
            });
        }*/
    };
    put = async () => {
        this.setState({
            loading: true,
            error: null
        });
        if (this.state.form.name != '' && this.state.form.location != '') {
            try {
                const response = await fetch(
                    `${this.props.api}/${this.props.user.id}`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(this.state.form),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                this.setState({
                    loading: true
                });
                this.clear();
                this.get();
                if (response.status === 200) {
                    this.MySwal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Se ha actualizado el usuario satsfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    this.MySwal.fire({
                        type: 'error',
                        position: 'top-end',
                        title: 'Oops...',
                        text: 'No se ha podido editar el usuario',
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
                text: 'No se ha podido editar el usuario',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div className="container text-center">
                <h1>Información de usuario</h1>
                <div className="row border">
                    <br />
                    <br />
                    <div className="col-6 offset-3 align-self-center">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.form.name}
                        />
                    </div>
                    <br />
                    <br />
                    <div className="col-6 offset-3 align-self-center">
                        <label htmlFor="email">Correo</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.form.email}
                        />
                    </div>
                    <br />
                    <br />
                    <div className="col-6 offset-3 align-self-center">
                        <label htmlFor="mypassword">Anterior contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="mypassword"
                            onChange={this.handleChange}
                            value={this.state.mypassword}
                        />
                    </div>
                    <br />
                    <br />
                    <div className="col-6 offset-3 align-self-center">
                        <label htmlFor="password">Nueva Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    <br />
                    <br />
                    <div className="col-6 offset-3 align-self-center">
                        <label htmlFor="repassword">Repita su contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="repassword"
                            onChange={this.passChange}
                            value={this.state.repassword}
                        />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="col-6 offset-3 align-self-center">
                        <button
                            className="btn btn-info btn-block"
                            onClick={this.handleSubmit}
                        >
                            Guardar
                        </button>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}

export default Perfil;
