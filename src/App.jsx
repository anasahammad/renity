import { Outlet } from 'react-router-dom';
import Footer from './components/Shared/Footer';
import Navbar from './components/Shared/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className='-z-50'>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
