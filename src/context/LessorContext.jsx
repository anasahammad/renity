import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Create the context
export const LessorContext = createContext();

// Create a provider component
export const LessorProvider = ({ children }) => {
  const [isLessor, setIsLessor] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userState = JSON.parse(localStorage.getItem('account')); // Assuming userState is stored in localStorage

  useEffect(() => {
    const checkLessorStatus = async () => {
      try {
        if (userState?.data.email) {
          setIsLessor(true);
        } else {
          navigate('/');
          toast.error('You are not allowed to access the Lessor Dashboard panel.');
        }
      } catch (error) {
        console.error(error);
        navigate('/');
        toast.error('Failed to check Lessor status.');
      } finally {
        setLoading(false);
      }
    };

    checkLessorStatus();
  }, [userState, navigate]);

  // Return the provider
  return <LessorContext.Provider value={{ isLessor, loading }}>{children}</LessorContext.Provider>;
};
