import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Dashboard/Clients';
import Access from './pages/Dashboard/Access';
import Roles from './pages/Dashboard/Roles';
import { useEffect } from 'react';
import { IAuthState, useAuthStore } from './zustand/auth';

function App() {

  const { me , user} : IAuthState = useAuthStore();
  const token = localStorage.getItem('token');

  console.log("TOKEN",token);
  console.log("USUARIO",user);

  useEffect(() => {
    if(token !== undefined && user !== undefined) {
      me();
    }
  },[user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Clients />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/access"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Access />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Roles />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;