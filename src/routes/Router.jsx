import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
// import Dashboard from '../layout/Dashboard';
// import MyProfile from '../layout/MyProfile';
// import AboutUs from '../pages/AboutUs';
// import Catalog from '../pages/Catalog';
// import ContactUs from '../pages/ContactUs';
import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';

import { AuthProvider } from '../context/AuthContext';
import { LessorProvider } from '../context/LessorContext';
// import Users from '../pages/admindashboard/Users';
// import AddRentalItem from '../pages/rental/AddRentalItem';
// import AllRentalItem from '../pages/rental/AllRentalItem';
// import UpdateRental from '../components/rental/UpdateRentalItem';


const AboutUs = lazy(() => import('../pages/AboutUs'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const Dashboard = lazy(() => import('../layout/Dashboard'));
const Catalog = lazy(() => import('../pages/Catalog'));
const MyProfile = lazy(() => import('../layout/MyProfile'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Users = lazy(() => import('../pages/admindashboard/Users'));
const AddRentalItem = lazy(() => import('../pages/rental/AddRentalItem'));
const AllRentalItem = lazy(() => import('../pages/rental/AllRentalItem'));
const UpdateRental = lazy(() => import('../components/rental/UpdateRentalItem'));



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
        element: (
          <Suspense fallback={'loading'}>
            <ContactUs />,
          </Suspense>
        ),
      },
      {
        path: '/about_us',
        element: (
          <Suspense fallback={'loading...'}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: '/catalog',
        element: (
          <Suspense fallback={'loading'}>
            <Catalog />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={'loading'}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={'loading...'}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: '/dashboard',
    element: (
      <AuthProvider>
        <Suspense fallback={'loading'}>
          <Dashboard />
        </Suspense>
      </AuthProvider>
    ),
    children: [
      // common
      {
        //user
        path: 'my_profile',
        element: (
          <Suspense fallback={'loading'}>
            <MyProfile />
          </Suspense>
        ),
      },

      // users
      {
        path: 'users',
        element: (
          <Suspense fallback={'loading'}>
            <Users />
          </Suspense>
        ),
      },

      // rental
      {
        path: 'add_rental',
        element: (
          <LessorProvider>
            <Suspense fallback={'loading'}>
              <AddRentalItem />
            </Suspense>
          </LessorProvider>
        ),
      },
      {
        path: 'all_rentals',
        element: (
          <LessorProvider>
            <Suspense fallback={'loading'}>
              {' '}
              <AllRentalItem />
            </Suspense>
          </LessorProvider>
        ),
      },
      {
        path: 'all_rentals/edit_rental/:id',
        loader: ({ params }) => `${import.meta.env.VITE_API_URL}/rental/${params.id}`,
        element: (
          <LessorProvider>
            <Suspense fallback={'loading'}>
              {' '}
              <UpdateRental />
            </Suspense>
          </LessorProvider>
        ),
      },
    ],
  },
]);

export default Router;
