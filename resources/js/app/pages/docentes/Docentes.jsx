import React, { Component } from 'react';
import AgregarDocente from '../../components/docentes/AgregarDocente';
import ConsultarDocente from '../../components/docentes/ConsultarDocente';
import Loading from '../../components/loading/Loading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Docentes extends Component {
  MySwal = withReactContent(Swal);
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    data: [],
    loading: true,
    error: null,
    form: {
      nombre: '',
      correo: '',
      telefono: ''
    }
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
    if (
      this.state.form.nombre != '' &&
      this.state.form.correo != '' &&
      this.state.form.telefono != ''
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
            title: 'Se ha guardado el docente satsfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.MySwal.fire({
            type: 'error',
            position: 'top-end',
            title: 'Oops...',
            text: 'No se ha podido crear el docente ',
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
        text: 'No se ha podido crear el docente ',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  clear = () => {
    this.setState({
      form: {
        nombre: '',
        correo: '',
        telefono: ''
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
    this.MySwal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro que desea eliminar este docente?',
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
    await this.MySwal.fire({
      title: 'Editar docente',
      html:
        '<label>Nombre:</label>' +
        `<input id="nombre_docente" class="swal2-input" placeholder="Nombre" value="${
          data.nombre
        }"/>` +
        '<label>Correo:</label>' +
        `<input id="correo_docente" class="swal2-input" placeholder="Correo" value="${
          data.correo
        }"/>` +
        '<label>Teléfono:</label>' +
        `<input id="telefono_docente" class="swal2-input" placeholder="Teléfono" value="${
          data.telefono
        }"/>`,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = document.getElementById('nombre_docente').value;
        const correo = document.getElementById('correo_docente').value;
        const telefono = document.getElementById('telefono_docente').value;
        this.setState({
          form: {
            nombre: nombre,
            correo: correo,
            telefono: telefono
          }
        });
      }
    });
    if (
      this.state.form.nombre != '' &&
      this.state.form.correo != '' &&
      this.state.form.telefono != ''
    ) {
      this.edit(data.id);
    }
  };
  edit = async id => {
    this.setState({
      loading: true,
      error: null
    });
    if (
      this.state.form.nombre != '' &&
      this.state.form.correo != '' &&
      this.state.form.telefono != ''
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
            title: 'Se ha actualizado el docente satsfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.MySwal.fire({
            type: 'error',
            position: 'top-end',
            title: 'Oops...',
            text: 'No se ha podido editar el docente ',
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
        text: 'No se ha podido editar el docente ',
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
            title: 'Se ha eliminado el docente satsfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.MySwal.fire({
            type: 'error',
            position: 'top-end',
            title: 'Oops...',
            text: 'No se ha podido eliminar el docente seleccionado',
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
          text: 'No se ha podido eliminar el docente seleccionado',
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
            <AgregarDocente
              formNombre={this.state.form.nombre}
              formCorreo={this.state.form.correo}
              formTelefono={this.state.form.telefono}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            {this.state.loading && <Loading />}
            <ConsultarDocente
              error={this.state.error}
              teachers={this.state.data}
              handleEdit={this.handleEdit}
              handleRemove={this.handleRemove}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Docentes;
