import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Shared/Footer';
import Navbar from './components/Shared/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation()
  const noFooter = location.pathname === '/login' || location.pathname ===  '/signup';
  return (
    <div>
      {!noFooter && <Navbar />}
      <div className={`-z-50  ${!noFooter ? 'py-[170px]' : '' }`}>
        <Outlet />
      </div>
      <Toaster />
      {!noFooter && <Footer></Footer>}
    </div>
  );
}

export default App;
