import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "../error/Error";
import { Link } from "react-router-dom";

function ProgramaItem(props) {
    return (
        <div className='alert alert-info '>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <strong>{props.career.name}</strong>
                </div>
                <div className='col-12 col-md-4'>
                    <strong>{props.career.semesters} semestres</strong>
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
function useSearchCareers(careers) {
    const [query, setQuery] = React.useState("");
    const [filteredCareers, setFilteredCareers] = React.useState(careers);

    React.useMemo(() => {
        const result = careers.filter(career => {
            return `${career.name}`.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredCareers(result);
    }, [careers, query]);

    return { query, setQuery, filteredCareers };
}
function ConsultarPrograma(props) {
    const careers = props.careers;
    const { query, setQuery, filteredCareers } = useSearchCareers(careers);
    if (props.error) {
        return <Error error={props.error.message} />;
    }
    if (filteredCareers.length === 0 && !props.loading) {
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
                {filteredCareers.map(career => {
                    return (
                        <li key={career.id} style={{ listStyleType: "none" }}>
                            <Link
                                className='text-reset text-decoration-none'
                                to={{
                                    pathname: `/careers/${career.id}`,
                                    state: {
                                        semesters: career.semesters
                                    }
                                }}>
                                <ProgramaItem
                                    career={career}
                                    handleRemove={e =>
                                        props.handleRemove(e, career)
                                    }
                                    handleEdit={e =>
                                        props.handleEdit(e, career)
                                    }
                                />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </Fragment>
    );
}

export default ConsultarPrograma;
