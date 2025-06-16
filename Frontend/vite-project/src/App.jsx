import React, { cloneElement } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Income from './components/Income'
import Expense from './components/Expense'
import UserProvider from './context/UserContext'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          },
        }}
      />
    </UserProvider>
  );
};

export default App

const Root = () => {
  const isAuthencated = localStorage.getItem('token');

  return isAuthencated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
}
