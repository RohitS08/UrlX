import {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthorizationContext} from '../App'

function Logout(){
  const navigate = useNavigate()
  const authorizationContext = useContext(AuthorizationContext)
  
  useEffect(()=>{
    fetch('/logout',{
      method:"GET",
      headers:{
        "Content-type":"application/json"
      }
    }).then((res)=>{
      if(res.status===200){
        authorizationContext.isAuthorizedDispatch({type:'authorization',payload:false})
        navigate('/login',{replace:true})
      }
    })
  })
  return (
    <>
    </>
    )
}

export default Logout