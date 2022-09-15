import {useEffect, useState} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import PageNotFound from './PageNotFound'

function ServicePage(props){
  const location = useLocation()
  const [urlExists, setUrlExists] = useState(true)
  
  useEffect(()=>{
    let url = location.pathname.toString().slice(1)
    
    fetch('/url',{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({shortUrl:url})
    }).then( res => {
      let status = res.status
      res.json()
      .then(data => {
        if(status===200){
          if(data.longUrl.slice(0,4)==="http")
            window.location.replace(data.longUrl)
          else
            window.location.replace("http://"+data.longUrl)
        }else if(status===404){
          setUrlExists(false)
        }
      })
    }).catch( err =>{
      console.log(err)
    })
  },[])
  
  return (
    <>
    {!urlExists ? (
      <PageNotFound />
    ) : (
      <div className=" h-screen overflow-auto bg-gray-50 ">
        <div className=" w-fit mx-auto font-bold text-3xl mt-[40%] ">
          Redirecting...
        </div>
      </div>
    )}
    </>
    )
}

export default ServicePage