// libs
import React, {PropTypes} from 'react';
// components
import {Modal as OverlayModal} from 'react-overlays';
// other
import styles from './index.css';

export default function Modal({show, onHide, children}) {
  return (<OverlayModal
    show={show}
    backdropClassName={styles.backdrop}
    onHide={onHide}
  >
    <div className={styles.dialog}>
      {children}
    </div>
  </OverlayModal>);
}
Modal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
