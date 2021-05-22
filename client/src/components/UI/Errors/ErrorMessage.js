import React from 'react';

import { CSSTransition } from 'react-transition-group';

import classes from './ErrorMessage.module.css';

const ErrorMessage = ({ error, onClose, title, className }) => (
  <CSSTransition
    in={error !== null}
    classNames={{
      enter: '',
      enterActive: classes.messageFadeIn,
      enterDone: classes.messageFadeInDone,
      exit: classes.messageFadeOut,
      exitActive: classes.messageFadeOut,
      exitDone: classes.messageFadeDone,
    }}
    mountOnEnter
    unmountOnExit
    timeout={200}>
    <div className={`ui error message ${className} ${classes.message}`}>
      <i className='close icon' onClick={onClose}></i>
      <div className='header'>{title}</div>
      <ul className='list'>{error && <li>{error}</li>}</ul>
    </div>
  </CSSTransition>
);

export default ErrorMessage;
