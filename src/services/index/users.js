import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';

// Make a POST request to the server's registration endpoint
export const signup = async ({ name, email, password, role }) => {
  try {
    const { data } = await axiosInstance.post(`/auth/register${role === 'lessor' ? '/lessor' : ''}`, {
      name,
      email,
      password,
    });
    return data; // Return the data received from the server
  } catch (error) {
    // Handle errors during the registration process
    if (error.response && error.response.data.message)
      // If the server responds with an error message, throw that message
      throw new Error(error.response.data.message);

    // If there is no specific error message from the server, throw the general error message
    throw new Error(error.message);
  }
};

// admin login
export const login = async ({ email, password }) => {
  try {
    const { data } = await axiosInstance.post(`/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
    if (error.response && error.response.data.message) throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const loginLessor = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/merchant/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true, // useCredential true
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
