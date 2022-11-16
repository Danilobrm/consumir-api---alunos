import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyRoute from './MyRoute';

import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Register from '../pages/Register';

export default function PagesRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<MyRoute path="/" element={<Alunos />} isClosed={false} />}
      />
      <Route
        path="/aluno/:id/edit"
        element={
          <MyRoute path="/aluno/:id/edit" element={<Aluno />} isClosed />
        }
      />
      <Route
        path="/aluno"
        element={<MyRoute path="/aluno" element={<Aluno />} isClosed />}
      />
      <Route
        path="/fotos/:id"
        element={<MyRoute path="/fotos/:id" element={<Fotos />} isClosed />}
      />
      <Route
        path="/login/"
        element={
          <MyRoute path="/login/" element={<Login />} isClosed={false} />
        }
      />
      <Route
        path="/register/"
        element={
          <MyRoute path="/register/" element={<Register />} isClosed={false} />
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
