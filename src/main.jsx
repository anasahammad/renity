import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router';
import { LanguageProvider } from './context/LanguageContext';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store/index.js';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      <Provider store={store}>
       <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <Toaster/>
          <RouterProvider router={Router} />
         </LanguageProvider>
        </QueryClientProvider>
      </Provider>
   
  </StrictMode>
);
