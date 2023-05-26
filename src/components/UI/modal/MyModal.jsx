import React from 'react';
import styles from './MyModal.module.css';
import { createPortal } from 'react-dom';

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return createPortal(
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default MyModal;
