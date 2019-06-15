import React from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
  if (!props.isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div>hola mundo</div>,
    document.getElementById('modal')
  );
}

export default Modal;
