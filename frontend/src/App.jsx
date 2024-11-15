import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Landing from './pages/Landing'
import Home from './pages/home/Home'
import MyCars from './components/user/MyCars'
import AddCar from './components/user/AddCar'
import Car from './components/cars/Car'
import UpdateCar from './components/user/UpdateCar'
import PrivateRoute from './pages/auth/PrivateRoute'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />

          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/mycars' element={<MyCars />} />
            <Route path='/cars/:id' element={<Car />} />
            <Route path='/addcar' element={<AddCar />} />
            <Route path='/editdetails/:id' element={<UpdateCar />} />
          </Route>
        </Routes>
    </>
  )
}

export default App
