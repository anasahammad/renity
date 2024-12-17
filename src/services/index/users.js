import axios from "axios";


// Make a POST request to the server's registration endpoint
export const signup = async ({ name, email, password , phone, logo}) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_GSMART_BASE_URL}/auth/merchant/register`, {
      name,
      email,
      password ,
      phone,
      logo,
      
    });
    return data;  // Return the data received from the server
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
    const { data } = await axios.post(
      `https://renity-backend.vercel.app/api/v1/auth/login`,
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
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const loginVendor = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_GSMART_BASE_URL}/auth/merchant/login`,
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
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
