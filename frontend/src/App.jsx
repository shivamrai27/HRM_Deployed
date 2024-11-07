import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate
} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';

const App = () => {
  // This router setup checks if the user is logged in and redirects accordingly.
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
