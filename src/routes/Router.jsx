import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
// import Dashboard from '../layout/Dashboard';
// import MyProfile from '../layout/MyProfile';
// import AboutUs from '../pages/AboutUs';
// import Catalog from '../pages/Catalog';
// import ContactUs from '../pages/ContactUs';
import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';

import HowItWorks from '../components/TopNavPage/HowItWorks';
import PriceGuide from '../components/TopNavPage/PriceGuide';
import { AuthProvider } from '../context/AuthContext';
import { LessorProvider } from '../context/LessorContext';
import ItemDetails from '../pages/ItemDetails';
import MyBookings from '../pages/users/MyBookings';
// import AllRentalItemsPage from '../pages/AllRentalItemsPage';
// import BookedItems from '../pages/rental/BookedItems';
// import AllReviews from '../pages/admindashboard/AllReviews';
// import AllContacts from '../pages/admindashboard/AllContacts';
// import Category from '../pages/admindashboard/Category';
// import Rentals from '../pages/admindashboard/Rentals';
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
const MyMetadata = lazy(() => import('../pages/rental/MyMetaData'));
const AllRentalItem = lazy(() => import('../pages/rental/AllRentalItem'));
const UpdateRental = lazy(() => import('../components/rental/UpdateRentalItem'));
const Rentals = lazy(() => import('../pages/admindashboard/Rentals'));
const Category = lazy(() => import('../pages/admindashboard/Category'));
const AllContacts = lazy(() => import('../pages/admindashboard/AllContacts'));
const AllReviews = lazy(() => import('../pages/admindashboard/AllReviews'));
const BookedItems = lazy(() => import('../pages/rental/BookedItems'));
const AllRentalItemsPage = lazy(() => import('../pages/AllRentalItemsPage'));

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
          <Suspense fallback={'loading...'}>
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
        path: '/details/:id',
        loader: ({ params }) => `${import.meta.env.VITE_API_URL}/rental/${params.id}`,
        element: <ItemDetails />,
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
        path: '/all_rentals_items',
        element: (
          <Suspense fallback={'loading'}>
            <AllRentalItemsPage />
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
        path: '/register/:role',
        element: (
          <Suspense fallback={'loading'}>
            <Signup />
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

      {
        path: '/how-it-works',
        element: (
          <Suspense fallback={'loading...'}>
            <HowItWorks />
          </Suspense>
        ),
      },
      {
        path: '/pricing',
        element: (
          <Suspense fallback={'loading...'}>
            <PriceGuide />
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
      //admin
      {
        path: 'rentals',
        element: (
          <Suspense fallback={'loading...'}>
            <Rentals />
          </Suspense>
        ),
      },
      {
        path: 'category',
        element: (
          <Suspense fallback={'loading...'}>
            <Category />
          </Suspense>
        ),
      },
      {
        path: 'all_contacts',
        element: (
          <Suspense fallback={'loading...'}>
            <AllContacts />
          </Suspense>
        ),
      },
      {
        path: 'all_reviews',
        element: (
          <Suspense fallback={'loading...'}>
            <AllReviews />
          </Suspense>
        ),
      },
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
      {
        //user
        path: 'my_bookings',
        element: <MyBookings />,
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
        path: 'my_meta_data',
        element: (
          <LessorProvider>
            <Suspense fallback={'loading'}>
              <MyMetadata />
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
        path: 'booked_items',
        element: (
          <LessorProvider>
            <Suspense fallback={'loading'}>
              {' '}
              <BookedItems />
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
