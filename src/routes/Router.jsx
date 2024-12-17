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

import { AuthProvider } from '../context/AuthContext';
import { LessorProvider } from '../context/LessorContext';
import Users from '../pages/admindashboard/Users';
import AddRentalItem from '../pages/rental/AddRentalItem';
import AllRentalItem from '../pages/rental/AllRentalItem';
import UpdateRental from '../components/rental/UpdateRentalItem';

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
    element: (
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    ),
    children: [
      // common
      {
        //user
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
        element: (
          <LessorProvider>
            <AddRentalItem />
          </LessorProvider>
        ),
      },
      {
        path: 'all_rentals',
        element: (
          <LessorProvider>
            <AllRentalItem />
          </LessorProvider>
        ),
      },
      {
        path: 'all_rentals/edit_rental/:id',
        loader: ({ params }) => `${import.meta.env.VITE_API_URL}/rental/${params.id}`,
        element: (
          <LessorProvider>
            <UpdateRental />
          </LessorProvider>
        ),
      },
    ],
  },
]);

export default Router;
