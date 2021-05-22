import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop/backdrop';

import classes from './Modal.module.css';
import { CSSTransition } from 'react-transition-group';

const duration = 300;

const JSX_MODAL = ({ onClose, title, children, show }) => {
  return (
    <>
      <Backdrop duration={duration} show={show} onClose={onClose} />
      <CSSTransition
        in={show}
        classNames={{
          enter: '',
          enterActive: classes.modalFadeIn,
          enterDone: classes.modalFadeIn,
          exit: classes.modalFadeOut,
          exitActive: '',
        }}
        mountOnEnter
        unmountOnExit
        timeout={duration}>
        <div className={`modal ${classes.modal}`}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{title}</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={onClose}></button>
              </div>
              <div className='modal-body'>{children}</div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

const Modal = (props) => {
  return ReactDOM.createPortal(
    <JSX_MODAL {...props} />,
    document.querySelector('#modal')
  );
};
export default Modal;
