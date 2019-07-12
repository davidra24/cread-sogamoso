import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "../error/Error";

function AsignaturaItem(props) {
    return (
        <div className='alert alert-info '>
            <div className='row'>
                <div className='col-12 col-md-10'>
                    <strong>{props.subject.name}</strong>
                </div>
                <div className='col-6 col-md-1'>
                    <button className='btn btn-info' onClick={props.handleEdit}>
                        <FontAwesomeIcon icon='edit' />
                    </button>
                </div>
                <div className='col-6 col-md-1'>
                    <button
                        className='btn btn-danger'
                        onClick={props.handleRemove}>
                        <FontAwesomeIcon icon='trash' />
                    </button>
                </div>
            </div>
        </div>
    );
}
function useSearchSubjects(subjects) {
    const [query, setQuery] = React.useState("");
    const [filteredSubjects, setFilteredSubjects] = React.useState(subjects);

    React.useMemo(() => {
        const result = subjects.filter(subject => {
            return `${subject.name}`
                .toLowerCase()
                .includes(query.toLowerCase());
        });
        setFilteredSubjects(result);
    }, [subjects, query]);

    return { query, setQuery, filteredSubjects };
}
function ConsultarAsignatura(props) {
    const subjects = props.subjects;
    const { query, setQuery, filteredSubjects } = useSearchSubjects(subjects);
    if (props.error) {
        return <Error error={props.error.message} />;
    }
    if (filteredSubjects.length === 0 && !props.loading) {
        return (
            <div>
                <div className='form-group'>
                    <label>Búsqueda</label>
                    <input
                        autoFocus
                        type='text'
                        className='mainLoginInput form-control'
                        placeholder='&#61442;'
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                        }}
                    />
                </div>
                <h3>No se ha encontrado su búsqueda</h3>
            </div>
        );
    }
    return (
        <Fragment>
            <br />
            <input
                autoFocus
                type='text'
                className='mainLoginInput form-control'
                placeholder='&#61442;'
                value={query}
                onChange={e => {
                    setQuery(e.target.value);
                }}
            />
            <br />
            <ul className='list-unstyled'>
                {filteredSubjects.map(subject => {
                    return (
                        <li key={subject.id} style={{ listStyleType: "none" }}>
                            <AsignaturaItem
                                subject={subject}
                                handleRemove={e =>
                                    props.handleRemove(e, subject)
                                }
                                handleEdit={e => props.handleEdit(e, subject)}
                            />
                        </li>
                    );
                })}
            </ul>
        </Fragment>
    );
}

export default ConsultarAsignatura;
