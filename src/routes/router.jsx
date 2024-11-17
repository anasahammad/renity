import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import ContactUs from "../Pages/ContactUs";
import AboutUs from "../Pages/AboutUs";
import Catalog from "../Pages/Equipment/Catalog";
import Login from "../Pages/Registration/Login";
import Signup from "../Pages/Registration/Signup";

export const router = createBrowserRouter([ 
    { 
    path: "/", 
    element: <App/>,
    children: [
        {
            index: true,
            element: <Home/>
        },
        
        {
            path: "/contact_us",
            element: <ContactUs/>
        },
        {
            path: "/about_us",
            element: <AboutUs/>
        },
        {
            path: "/catalog",
            element: <Catalog/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/signup",
            element: <Signup/>
        },

    ] 
    }, 
   ]);