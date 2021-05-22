import React from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';

const JSX_BACKDROP = ({ duration, show, onClose }) => (
  <CSSTransition
    in={show}
    classNames={{
      enter: 'fade',
      enterActive: 'show',
      enterDone: 'show',
      exit: 'fade',
      exitActive: '',
    }}
    mountOnEnter
    unmountOnExit
    timeout={duration}>
    <div className='modal-backdrop' onClick={onClose}></div>
  </CSSTransition>
);

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <JSX_BACKDROP {...props} />,
    document.querySelector('#backdrop')
  );
};

export default Backdrop;
