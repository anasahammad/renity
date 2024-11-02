
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Shared/Navbar/Navbar'

function App() {


  return (
    <div>
     <Navbar/>
     <div className='-z-50'>

     <Outlet/>
     </div>
  
    </div>
  )
}

export default App
