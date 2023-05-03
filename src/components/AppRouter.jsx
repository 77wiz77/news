import React from 'react';
import { Routes, Route, Link, Error, Navigate } from 'react-router-dom';
import Posts from '../pages/Posts';
import About from '../pages/About';
import ErrorPage from '../pages/ErrorPage';
import Navbar from '../components/UI/navbar/Navbar';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/about' element={<About />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/error' element={<ErrorPage />} />
      <Route path='/*' element={<Navigate to='/error' replace />} />
    </Routes>
  );
};

export default AppRouter;
