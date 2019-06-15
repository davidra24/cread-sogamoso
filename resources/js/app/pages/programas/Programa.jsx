import React, { Component } from 'react';
import AgregarPrograma from '../../components/programas/AgregarPrograma';
import ConsultarPrograma from '../../components/programas/ConsultarPrograma';
import Loading from '../../components/loading/Loading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Programa extends Component {
  MySwal = withReactContent(Swal);
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    semestres: this.semestres(),
    data: [],
    loading: false,
    error: null,
    form: {
      nombre: '',
      semestres: ''
    }
  };
  semestres() {
    let arr = new Array();
    arr.push(<option key={0} />);
    for (let i = 1; i <= 10; i++) {
      arr.push(<option key={i}>{i}</option>);
    }
    return arr;
  }
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
        mode: 'no-cors'
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
  handleSubmit(e) {
    e.preventDefault();
    this.create();
  }
  create = async () => {
    this.setState({
      loading: true,
      error: null
    });
    if (this.state.form.nombre != '') {
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
            title: 'Se ha guardado el programa satsfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.MySwal.fire({
            type: 'error',
            position: 'top-end',
            title: 'Oops...',
            text: 'No se ha podido crear el programa ',
            showConfirmButton: false,
            timer: 1500
          });
          this.setState({
            loading: false,
            error: error
          });
          return false;
        }
        return true;
      } catch (error) {
        this.setState({
          loading: false,
          error: error
        });
        return false;
      }
    } else {
      this.MySwal.fire({
        type: 'error',
        position: 'top-end',
        title: 'Oops...',
        text: 'No se ha podido crear el programa ',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  clear = () => {
    this.setState({
      form: {
        nombre: '',
        semestres: ''
      }
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
  handleRemove = (e, data) => {
    e.preventDefault();
    this.MySwal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro que desea eliminar este programa?',
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
  handleEdit = async (e, data) => {
    e.preventDefault();
    await this.MySwal.fire({
      title: 'Editar programa',
      html:
        '<label>Nombre:</label>' +
        `<input id="nombre_programa" class="swal2-input" placeholder="Nombre" value="${
          data.nombre
        }"/>` +
        '<label>Número de semestres:</label>' +
        `<input id="semestres_programa" class="swal2-input" placeholder="Semestres" value="${
          data.semestres
        }"/>`,
      focusConfirm: false,
      preConfirm: () => {
        const nombres = document.getElementById('nombre_programa').value;
        const semestres = document.getElementById('semestres_programa').value;
        this.setState({
          form: {
            nombres: nombres,
            semestres: semestres
          }
        });
      }
    });
    if (this.state.form.nombre != '' && !this.state.form.semestres.isNaN) {
      this.edit(data.id);
    }
  };
  edit = async id => {
    this.setState({
      loading: true,
      error: null
    });
    if (this.state.form.nombre != '') {
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
            title: 'Se ha actualizado el programa satsfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.MySwal.fire({
            type: 'error',
            position: 'top-end',
            title: 'Oops...',
            text: 'No se ha podido editar el programa ',
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
        text: 'No se ha podido editar el programa ',
        showConfirmButton: false,
        timer: 1500
      });
    }
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
            title: 'Se ha eliminado el programa satsfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.MySwal.fire({
            type: 'error',
            position: 'top-end',
            title: 'Oops...',
            text: 'No se ha podido eliminar el programa seleccionado',
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
          text: 'No se ha podido eliminar el programa seleccionado',
          showConfirmButton: false,
          timer: 1500
        });
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <AgregarPrograma
              semestres={this.state.semestres}
              formNombre={this.state.form.nombre}
              formSemestres={this.state.form.semestres}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            {this.state.loading && <Loading />}
            <ConsultarPrograma
              error={this.state.error}
              careers={this.state.data}
              handleEdit={this.handleEdit}
              handleRemove={this.handleRemove}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Programa;
