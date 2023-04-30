import React from 'react';
import styles from './MyButton.module.css';

const MyButton = ({ children, ...props }) => {
  //отделить пропс children от остальных пропсов (те что будут передаваться в компонент MyButton)
  return (
    //вместо disabled='true'
    <button {...props} className={styles.myBtn}>
      {children}
    </button>
  );
};

export default MyButton;
