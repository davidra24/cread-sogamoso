import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import {
    faUserCircle,
    faEdit,
    faCogs,
    faHome,
    faTrash,
    faChalkboardTeacher,
    faBookReader,
    faBrain,
    faBuilding,
    faCalendarWeek,
    faSave
} from '@fortawesome/free-solid-svg-icons';
//import Login from './login/Login';
import Principal from './principal/Principal';
import Home from './home/Home';
import NotFound from './notFound/NotFound';
import ProgramaAsignatura from './programa_asignatura/ProgramaAsignatura';
import Programa from '../pages/programas/Programa';
import Asignaturas from '../pages/asignaturas/Asignaturas';
import Docentes from '../pages/docentes/Docentes';
import Salones from '../pages/salones/Salones';
import PanelUsuario from '../pages/panel-usuario/PanelUsuario';

library.add(
    faUserCircle,
    faCogs,
    faHome,
    faChalkboardTeacher,
    faBookReader,
    faBrain,
    faEdit,
    faTrash,
    faBuilding,
    faCalendarWeek,
    faSave
);
class Index extends Component {
    componentDidMount() {}

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Principal} isLogged="false" />
                <Route exact path="/admin" component={Home} />
                <Route exact path="/careers" component={Programa} />
                <Route exact path="/subjects" component={Asignaturas} />
                <Route exact path="/teachers" component={Docentes} />
                <Route exact path="/classrooms" component={Salones} />
                <Route exact path="/profile" component={PanelUsuario} />
                <Route
                    exact
                    path="/careers/:id"
                    component={ProgramaAsignatura}
                />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default Index;
