import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      {}
    </Routes>
  );
}
export default App;
