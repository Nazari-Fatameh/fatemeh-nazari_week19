import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/700.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Suspense, lazy } from 'react';

import AuthPage from './Pages/AuthPage';


const ProductManagment = lazy(() => import('./Pages/ProductManagment'));

export default function App() {
  return (
    <>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/ProductManagment" element={<ProductManagment />} />
        </Routes>
      </Suspense>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
      />
    </>
  );
}
