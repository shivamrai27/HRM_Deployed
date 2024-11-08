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
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} /> {/* Keeps wildcard redirect to /login */}
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
