import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AsteroidsCart, About, AsteroidsPage } from '../../features';

export const PATH = {
  main: '/',
  order: '/order',
  about: '/about',
};

export function AppRouter() {
  return (
    <Routes>
      <Route path={PATH.main} element={<AsteroidsPage />} />
      <Route path={PATH.order} element={<AsteroidsCart />} />
      <Route path={PATH.about} element={<About />} />
    </Routes>
  );
}
