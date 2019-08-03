import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';

function AsignaturaItem(props) {
    var renderEnable;
    if (props.teacher.enable) {
        renderEnable = (
            <button className='btn btn-danger' onClick={props.handleDisable}>
                <FontAwesomeIcon icon='eye-slash' />
            </button>
        );
    } else {
        renderEnable = (
            <button className='btn btn-success' onClick={props.handleEnable}>
                <FontAwesomeIcon icon='eye' />
            </button>
        );
    }
    const color = props.teacher.enable
        ? 'alert alert-custom'
        : 'alert alert-dark';
    return (
        <div className={color}>
            <div className='row'>
                <div className='col-12 col-md-4'>
                    <strong>{props.teacher.name}</strong>
                </div>
                <div className='col-12 col-md-3'>
                    <strong>{props.teacher.mail}</strong>
                </div>
                <div className='col-12 col-md-3'>
                    <strong>{props.teacher.phone}</strong>
                </div>
                <div className='col-6 col-md-1'>
                    <button className='btn btn-info' onClick={props.handleEdit}>
                        <FontAwesomeIcon icon='edit' />
                    </button>
                </div>
                <div className='col-6 col-md-1'>{renderEnable}</div>
            </div>
        </div>
    );
}
function useSearchTeachers(teachers) {
    const [query, setQuery] = React.useState('');
    const [filteredTeachers, setFilteredTeachers] = React.useState(teachers);

    React.useMemo(() => {
        const result = teachers.filter((teacher) => {
            return `${teacher.name} ${teacher.phone}`
                .toLowerCase()
                .includes(query.toLowerCase());
        });
        setFilteredTeachers(result);
    }, [teachers, query]);

    return { query, setQuery, filteredTeachers };
}
function ConsultarAsignatura(props) {
    const teachers = props.teachers;
    const { query, setQuery, filteredTeachers } = useSearchTeachers(teachers);
    if (props.error) {
        return <Error error={props.error.message} />;
    }
    if (filteredTeachers.length === 0 && !props.loading) {
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
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                </div>
                <h3>No se ha encontrado su búsqueda</h3>
            </div>
        );
    }
    const teach = filteredTeachers.sort(function(a, b) {
        return b.enable - a.enable;
    });
    return (
        <Fragment>
            <br />
            <input
                autoFocus
                type='text'
                className='mainLoginInput form-control'
                placeholder='&#61442;'
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
            <br />
            <ul className='list-unstyled'>
                {teach.map((teacher) => {
                    return (
                        <li key={teacher.id} style={{ listStyleType: 'none' }}>
                            <AsignaturaItem
                                teacher={teacher}
                                handleRemove={(e) =>
                                    props.handleRemove(e, teacher)
                                }
                                handleEnable={(e) =>
                                    props.handleEnable(e, teacher)
                                }
                                handleDisable={(e) =>
                                    props.handleDisable(e, teacher)
                                }
                                handleEdit={(e) => props.handleEdit(e, teacher)}
                            />
                        </li>
                    );
                })}
            </ul>
        </Fragment>
    );
}

export default ConsultarAsignatura;
