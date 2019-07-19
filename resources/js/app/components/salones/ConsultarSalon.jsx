import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../error/Error';

function SalonItem(props) {
    var renderEnable;
    if (props.salon.enable) {
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
    const color = props.salon.enable ? 'alert alert-info' : 'alert alert-dark';
    return (
        <div className={color}>
            <div className='row'>
                <div className='col-12 col-md-5'>
                    <strong>{props.salon.name}</strong>
                </div>
                <div className='col-12 col-md-5'>
                    <strong>{props.salon.location}</strong>
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
function useSearchClassRooms(classRooms) {
    const [query, setQuery] = React.useState('');
    const [filteredClassRooms, setFilteredClassRooms] = React.useState(
        classRooms
    );

    React.useMemo(() => {
        const result = classRooms.filter((classRoom) => {
            return `${classRoom.name}`
                .toLowerCase()
                .includes(query.toLowerCase());
        });
        setFilteredClassRooms(result);
    }, [classRooms, query]);

    return { query, setQuery, filteredClassRooms };
}
function ConsultarSalon(props) {
    const classRooms = props.classrooms;
    const { query, setQuery, filteredClassRooms } = useSearchClassRooms(
        classRooms
    );
    if (props.error) {
        return <Error error={props.error.message} />;
    }
    if (filteredClassRooms.length === 0 && !props.loading) {
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
    const classrooms = filteredClassRooms.sort(function(a, b) {
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
                {classrooms.map((salon) => {
                    return (
                        <li key={salon.id} style={{ listStyleType: 'none' }}>
                            <SalonItem
                                salon={salon}
                                handleRemove={(e) =>
                                    props.handleRemove(e, salon)
                                }
                                handleEnable={(e) =>
                                    props.handleEnable(e, salon)
                                }
                                handleDisable={(e) =>
                                    props.handleDisable(e, salon)
                                }
                                handleEdit={(e) => props.handleEdit(e, salon)}
                            />
                        </li>
                    );
                })}
            </ul>
        </Fragment>
    );
}

export default ConsultarSalon;
