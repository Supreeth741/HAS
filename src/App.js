import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/profile';
import Spinner from './components/Spinner';
import { useSelector } from 'react-redux';
import DoctorForm from './pages/Doctorform';
import Admin from './pages/Admin';
import BookAppointment from './pages/BookAppointment';

function App() {
  const { loading } = useSelector(state => state.loader)
  return (
    <div >
      {loading && <Spinner/>}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/apply-doctor' element={<ProtectedRoute><DoctorForm /></ProtectedRoute>} />
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path='/book-appointment/:id' element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
          <Route path='*' element={<div> PAGE NOT FOUND 404 ERROR</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
