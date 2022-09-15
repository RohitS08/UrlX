import {Route, Routes} from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Logout from './Logout'
import About from './About'
import Footer from './Footer'
import ServicePage from './ServicePage'

function App2(){
  return (
    <>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about"element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App2