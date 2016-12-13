// libs
import React, {PropTypes} from 'react';
// components
import {Modal as OverlayModal} from 'react-overlays';
// other
import styles from './index.css';

export default function Modal({title, show, onHide, children}) {
  return (<OverlayModal
    show={show}
    title={title}
    backdropClassName={styles.backdrop}
    onHide={onHide}
  >
    <div className={styles.dialog}>
      <button type="button" className="close" onClick={onHide}>
        <span>&times;</span>
      </button>
      <h4 className={styles.title}>{title}</h4>

      {children}
    </div>
  </OverlayModal>);
}
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
