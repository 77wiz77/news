import React from 'react';
import styles from './MyModal.module.css';
import { createPortal } from 'react-dom';

const MyModal = ({ children, visible, setVisible }) => {
  //сам компонент не может контролировать свою видимость, это делает родителький компонент

  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return createPortal(
    // <div className={[styles.myModal, styles.active].join(' ')}>

    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      {/* Соединить два класса через пробел */}
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
