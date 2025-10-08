import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // For nested routes, use Outlet; else use children prop
import { AuthContext } from '../context/AuthContext.jsx';

const AdminRoute = () => {
  const { isAdmin, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading... Please wait.</div>; // Add CSS spinner if needed, e.g., in index.css
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />; // Redirect to home if not admin
};

export default AdminRoute;