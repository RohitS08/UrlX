import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import loginImage from './../img/login.svg'
import {AuthorizationContext} from '../App'
import {ModalContext} from './ModalContext'

function Login(){
  const navigate = useNavigate()
  const modalContext = useContext(ModalContext)
  
  const authorizationContext = useContext(AuthorizationContext)
  
  const [details, setDetails] = useState({
      email:"",
      password:""
    })
  const [validInputs, setValidInputs] = useState({
    isDataValid : false,
    inputs : []
  })
  
  const updateValidInputsList = (name, isValid)=>{
    let newValidInputs = {
      inputs : isValid ? (validInputs.inputs.includes(name) ? [...validInputs.inputs] : [...validInputs.inputs,name] ) : (validInputs.inputs.includes(name) ? validInputs.inputs.filter((_,index) => index !==  validInputs.inputs.indexOf(name)) : [...validInputs.inputs] ),
      isDataValid :  isValid ? ( validInputs.inputs.length+1 < 2 ? false : true ) : ( false )
    }
    setValidInputs(newValidInputs);
  }
    
  const handleInput = (e)=>{
    setDetails({
      ...details,
      [e.target.name]:e.target.value
    });
    
    switch(e.target.name){
      case 'email':
        {
        e.target.classList.remove('bg-gray-100')
        if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value.trim()))){
          if(e.target.classList.contains('bg-green-100')){
            e.target.classList.remove('bg-green-100')
          }
          e.target.classList.add('bg-rose-100')
          updateValidInputsList(e.target.name,false)
        }else{
          if(e.target.classList.contains('bg-rose-100')){
            e.target.classList.remove('bg-rose-100')
          }
          e.target.classList.add('bg-green-100')
          updateValidInputsList(e.target.name,true)
        }
      }
        break
      case 'password':
        {
        e.target.classList.remove('bg-gray-100')
        if(e.target.value.trim().length<8 || e.target.value.trim().indexOf(' ')>=0){
          if(e.target.classList.contains('bg-green-100')){
            e.target.classList.remove('bg-green-100')
          }
          e.target.classList.add('bg-rose-100')
          updateValidInputsList(e.target.name,false)
        }else{
          if(e.target.classList.contains('bg-rose-100')){
            e.target.classList.remove('bg-rose-100')
          }
          e.target.classList.add('bg-green-100')
          updateValidInputsList(e.target.name,true)
        }
      }
        break
    }
  }
  
  const sendLoginData = async (e)=>{
    e.preventDefault();
    const {email,password} = details;
    let logged = await fetch('/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    });
    let data = await logged.json()
    if(logged.status===200){
      modalContext.updateModalData({
        message:'Login Successful!',
        type:'success'
      })
      modalContext.updateModalVisible(true)
      authorizationContext.isAuthorizedDispatch({type:'authorization',payload:true})
      navigate('/', { replace: true })
    }else{
      modalContext.updateModalData({
        message:`Login Failed!\n${data.errMsg}`,
        type:'failure'
      })
      modalContext.updateModalVisible(true)
    }
  }
  
  return (
    <>
        <div id="login" className="h-screen overflow-auto p-6 ">
          <div className=" bg-white max-w-2xl my-5 p-2 md:p-12  mx-auto md:shadow-2xl md:rounded-lg md:my-20 md:flex md:flex-col shrink-0 ">
            <div className=" ">
              <div >
                <h1 className="text-center underline decoration-auto decoration-emerald-200 text-4xl text-emerald-900 font-bold ">Login</h1>
              </div>
            </div>
            <div className=" md:flex md:flex-row md:items-center">
            <div className=" mt-4 md:flex md:flex-col md:items-center ">
                <div className=" my-2 px-2 ">
                  <input type="email"
                  name="email"
                  autoComplete="off"
                  value={details.email}
                  onChange={handleInput}
                  placeholder="Email"
                  className="w-full h-12 rounded pl-2 text-lg bg-gray-100 text-emerald-900 font-bold border border-black focus:outline-none  " />
                </div>
                <div className="my-2 px-2 ">
                  <input type="password" 
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={details.password}
                  onChange={handleInput}
                  placeholder="Password"
                  className="w-full h-12 rounded pl-2 text-lg bg-gray-100 text-emerald-900 font-bold border border-black" />
                </div>

                <div className="w-full my-2 px-2">
                  <input type="submit"
                  className="w-full h-12 uppercase text-2xl font-bold bg-emerald-300 text-emerald-900 rounded disabled:hover:shadow-none disabled:bg-gray-200 disabled:text-emerald-900 hover:shadow-lg hover:bg-emerald-900 hover:text-white "
                  onClick={sendLoginData}
                  disabled={!validInputs.isDataValid}
                  />
                </div>
              </div>
              <div className="w-[50%] hidden md:block">
                <img src={loginImage} alt="Sign Up"/>
              </div>
              </div>
           </div>
        </div>
    </>
  )
}

export default Login