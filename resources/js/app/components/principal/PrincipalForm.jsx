import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarModal from './CalendarModal';

function PrincipalForm(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-11">
                    <select
                        name="id_semester"
                        className="form-control"
                        onChange={props.handleChange}
                        value={props.formSemestre}
                    >
                        {props.semesters}
                    </select>
                </div>
                <div className="col-1">
                    <button className="btn btn-info" onClick={props.openModal}>
                        <FontAwesomeIcon icon="calendar-alt" />
                    </button>
                    <CalendarModal
                        onCloseModal={props.onCloseModal}
                        isOpen={props.modalIsOpen}
                        selectedDays={props.selectedDays}
                    />
                </div>
                <div className="col-12">
                    <br />
                    <select
                        name="id_career"
                        className="form-control"
                        onChange={props.handleChange}
                        value={props.formCareer}
                    >
                        {props.careers}
                    </select>
                    <br />
                    {props.formSemestre != '' && props.formCareer != '' ? (
                        <Link
                            to={`/add-lesson/${props.formSemestre}/${
                                props.formCareer
                            }`}
                            className="btn btn-block btn-success"
                        >
                            Agregar horarios
                        </Link>
                    ) : (
                        <button className="btn btn-block btn-dark">
                            Agregar horarios
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PrincipalForm;
