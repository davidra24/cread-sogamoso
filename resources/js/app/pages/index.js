import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//import Login from './login/Login';
import Principal from './principal/Principal';
import NotFound from './notFound/NotFound';
import ProgramaAsignatura from './programa_asignatura/ProgramaAsignatura';
import Programas from './programas/Programa';
import Asignaturas from './asignaturas/Asignaturas';
import Docentes from './docentes/Docentes';
import Salones from './salones/Salones';
import PanelUsuario from './panel-usuario/PanelUsuario';
import AddLesson from './principal/AddLesson';
import Semestres from './semestres/Semestres';

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
                    path="/semesters"
                    component={props => (
                        <Semestres {...props} api="/api/semesters" />
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
                            apiCareer="/api/careers"
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
                            apiPA="/api/subjectsfromcareer"
                            apiAsignatura="/api/subjects"
                        />
                    )}
                />
                <Route
                    exact
                    path="/add-lesson/:id_semester/:id_career"
                    component={props => (
                        <AddLesson
                            {...props}
                            api="/api/lessons"
                            apiSemester="/api/semesters"
                            apiCareer="/api/careers"
                            apiPA="/api/subjectsfromcareer"
                            apiDocentes="/api/teachers"
                            apiClassrooms="/api/classrooms"
                        />
                    )}
                />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default Index;
