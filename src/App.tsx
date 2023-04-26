import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './Pages/Home';

import './scss/app.scss';

const Cart = React.lazy(
  () => import(/*webpackChunkName: "Cart" */ './Pages/Cart')
);
const FullPizza = React.lazy(
  () => import(/*webpackChunkName: "FullPizza" */ './Pages/FullPizza')
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName: "NotFound" */ './Pages/NotFound')
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="/roma-pizza/" element={<Home />}></Route>
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        ></Route>
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка пиццы...</div>}>
              <FullPizza />
            </Suspense>
          }
        ></Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
