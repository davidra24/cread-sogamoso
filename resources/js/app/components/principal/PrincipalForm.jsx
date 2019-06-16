import React from 'react';

function PrincipalForm(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <select
                        name="id_semester"
                        className="form-control"
                        onChange={props.handleChange}
                        value={props.formSemestre}
                    >
                        {props.semesters}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default PrincipalForm;
