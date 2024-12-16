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
import AdminDashboard from '../layout/AdminDashboard';
import Users from '../pages/admindashboard/Users';

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
      {
        path: 'my_profile',
        element: <MyProfile />,
      },
    ],
  },
  {
    path: '/admin_dashboard',
    element: <AdminDashboard />,
    children: [
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
]);

export default Router;
