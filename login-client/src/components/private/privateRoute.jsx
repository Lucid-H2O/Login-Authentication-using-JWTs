import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Main from '../main';

export default function PrivateRoute() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
      return <div>Loading...</div>; // Show a loading spinner or skeleton
  }

  return user ? <Main /> : <Navigate replace to="/login" />;
}


