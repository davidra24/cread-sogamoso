import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrincipalUsuario from './principal/PrincipalUsuario';
import NotFound from './notFound/NotFound';

class Index extends Component {
    componentDidMount() {}
    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    component={props => (
                        <PrincipalUsuario
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
                <Route
                    exact
                    path="/user"
                    component={props => (
                        <PrincipalUsuario
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
