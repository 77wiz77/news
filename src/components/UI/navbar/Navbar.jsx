import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  };
  return (
    <div className={styles.navbar}>
      <MyButton onClick={() => logout()}>Выйти</MyButton>
      <div className={styles.navbar__links}>
        <Link to='/about'>О сайте</Link>
        <Link to='/posts'>Посты</Link>
      </div>
    </div>
  );
};

export default Navbar;
