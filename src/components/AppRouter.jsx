import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Posts from '../pages/Posts';
import About from '../pages/About';
import ErrorPage from '../pages/ErrorPage';
import PostIdPage from '../pages/PostIdPage';
import { privateRoutes, publicRoutes } from '../router';

const AppRouter = () => {
  const Auth = true;
  return Auth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
      <Route path='/error' element={<ErrorPage />} />
      <Route path='/*' element={<Navigate to='/posts' replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
      <Route path='/error' element={<ErrorPage />} />
      <Route path='/*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
};

export default AppRouter;
