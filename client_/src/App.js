import React,{useState, useReducer, useEffect} from 'react'
import Navbar from './components/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import About from './components/About'
import Footer from './components/Footer'
import App2 from './components/App2'
import ServicePage from './components/ServicePage'
import Modal from './components/Modal'
import {ModalContext} from './components/ModalContext'
import {reducer, initialState} from './Reducer/reducer'

export const AuthorizationContext = React.createContext()
//export const ModalContext = React.createContext()

function App() {
  const [isAuthorized, isAuthorizedDispatch] = useReducer(reducer, initialState)
  const [modalData, setModalData] = useState({
    message:'Testing',
    type:''
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  
  const updateModalVisible = (val) => {
    setIsModalVisible(val)
  }
  const updateModalData = (val) => {
    setModalData(val)
  }
  
  useEffect(()=>{
    fetch('/auth',{
      method:"GET",
      headers:{
        "Content-type":"application/json"
      }
    }).then((res)=>{
      if(res.status===200){
        res.json()
        .then( data => {
          isAuthorizedDispatch({type:'authorization',payload:data.authorized})
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
  })
  
  return (
    <>
    <AuthorizationContext.Provider
      value={{isAuthorized, isAuthorizedDispatch}}>
      <ModalContext.Provider value={{updateModalData, updateModalVisible}}>
        {isModalVisible &&
        <Modal data={modalData} />}
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about"element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ServicePage />} />
        </Routes>
        <Footer />
     {/*
      <Routes>
        <Route path="/" element={<App2 />} />
        <Route path="*" element={<ServicePage />} />
      </Routes>
      */}
      </ModalContext.Provider>
    </AuthorizationContext.Provider>
    </>
  );
}

export default App;
