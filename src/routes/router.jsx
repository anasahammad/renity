import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import ContactUs from "../Pages/ContactUs";
import AboutUs from "../Pages/AboutUs";
import Catalog from "../Pages/Equipment/Catalog";

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

    ] 
    }, 
   ]);