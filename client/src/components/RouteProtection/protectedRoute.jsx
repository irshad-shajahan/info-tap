import React from 'react';
import { Navigate } from 'react-router-dom';
import {  useGetUserDetailsQuery } from '../../redux/features/api/apiSlice';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const { data } = useGetUserDetailsQuery();

  if (token) {
    try {
      if (data) {
        if (!data.success) {
          localStorage.clear();
         return <Navigate to="/login" />;
        }
      }
    } catch (err) {
      console.log('error in protected route', err);
    }
  }
  if (localStorage.getItem('token')) {
    return children;
  }
  return <Navigate to="/login" />;
}
