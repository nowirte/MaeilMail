import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
  const { onClose } = props;
  return (
    <div className={classes.backdrop} onClose={onClose}>
      {' '}
    </div>
  );
};

const ModalOverlay = props => {
  const { onClose } = props;
  return (
    <div className={classes.modal} onClose={onClose}>
      <div className={classes.content} onClose={onClose}>
        {' '}
      </div>
    </div>
  );
};

const portalEl = document.getElementById('overlays');

const Modal = props => {
  const { onClose } = props;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalEl)}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>hi</ModalOverlay>,
        portalEl
      )}
    </>
  );
};

export default Modal;
