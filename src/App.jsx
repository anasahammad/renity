
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Shared/Navbar/Navbar'
import Footer from './Components/Shared/Footer/Footer'


function App() {


  return (
    <div>
     <Navbar/>
     <div className='-z-50'>

     <Outlet/>
     </div>

     <Footer/>
  
    </div>
  )
}

export default App
