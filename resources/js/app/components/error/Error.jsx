import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Error(props) {
  return <h3>Ha ocurrido un error: {props.error}</h3>;
}

export default Error;
