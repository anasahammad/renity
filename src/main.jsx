import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router';
import { LanguageProvider } from './context/LanguageContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
       <RouterProvider router={Router} />
    </LanguageProvider>
   
  </StrictMode>
);
