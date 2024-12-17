import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userState = JSON.parse(localStorage.getItem('account')); // Assuming userState is stored in localStorage

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (userState?.data.email ) {
          setIsAuth(true);
        } else {
          navigate('/');
          toast.error('You are not allowed to access the Dashboard panel.');
        }
      } catch (error) {
        console.error(error);
        navigate('/');
        toast.error('Failed to check Auth status.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [userState, navigate]);

  // Return the provider
  return <AuthContext.Provider value={{ isAuth, loading }}>{children}</AuthContext.Provider>;
};
