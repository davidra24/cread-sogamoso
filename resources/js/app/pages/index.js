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
    faEyeSlash,
    faEye,
    faCalendarWeek,
    faSave
} from '@fortawesome/free-solid-svg-icons';
//import Login from './login/Login';
import Principal from './principal/Principal';
import NotFound from './notFound/NotFound';
import ProgramaAsignatura from './programa_asignatura/ProgramaAsignatura';
import Programas from '../pages/programas/Programa';
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
    faEye,
    faEyeSlash,
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
                <Route
                    exact
                    path="/"
                    component={props => (
                        <Principal
                            {...props}
                            api="/api/lessons"
                            apiSemester="/api/semesters"
                        />
                    )}
                />
                <Route
                    exact
                    path="/admin"
                    component={props => (
                        <Principal
                            {...props}
                            api="/api/lessons"
                            apiSemester="/api/semesters"
                        />
                    )}
                />
                <Route
                    exact
                    path="/careers"
                    component={props => (
                        <Programas {...props} api="/api/careers" />
                    )}
                />
                <Route
                    exact
                    path="/subjects"
                    component={props => (
                        <Asignaturas {...props} api="/api/subjects" />
                    )}
                />
                <Route
                    exact
                    path="/teachers"
                    component={props => (
                        <Docentes {...props} api="/api/teachers" />
                    )}
                />
                <Route
                    exact
                    path="/classrooms"
                    component={props => (
                        <Salones {...props} api="/api/classrooms" />
                    )}
                />
                <Route exact path="/profile" component={PanelUsuario} />
                <Route
                    exact
                    path="/careers/:id"
                    component={props => (
                        <ProgramaAsignatura
                            {...props}
                            api="/api/careersubjects"
                            apiPA="/api/subjectsfromcareer/"
                            apiAsignatura="/api/subjects"
                        />
                    )}
                />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default Index;
