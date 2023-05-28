import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRoutePropsType = {
  role: 'patient' | 'doctor&reception' | 'reception';
  children: ReactNode;
};

const ProtectedRoute = ({ children, role }: ProtectedRoutePropsType) => {
  if (!role.includes(`${sessionStorage.getItem('role')}`)) {
    return <Navigate to="/unauthorized" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
