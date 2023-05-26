import './styles/App.css';
import Navbar from './components/UI/navbar/Navbar';
import AppRouter from './components/AppRouter';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuthContext } from './context';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
      <HashRouter>
        <div className='main'>
          <Navbar />
          <AppRouter />
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App;
