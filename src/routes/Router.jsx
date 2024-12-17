import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../layout/Dashboard';
import MyProfile from '../layout/MyProfile';
import AboutUs from '../pages/AboutUs';
import Catalog from '../pages/Catalog';
import ContactUs from '../pages/ContactUs';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

import Users from '../pages/admindashboard/Users';
import AddRentalItem from '../pages/rental/AddRentalItem';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/contact_us',
        element: <ContactUs />,
      },
      {
        path: '/about_us',
        element: <AboutUs />,
      },
      {
        path: '/catalog',
        element: <Catalog />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },

  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
        // common
      {
        path: 'my_profile',
        element: <MyProfile />,
      },

      // users
      {
        path: 'users',
        element: <Users />,
      },

      // rental
      {
        path: 'add_rental',
        element: <AddRentalItem/>
      }
    ],
  },
 
]);

export default Router;
