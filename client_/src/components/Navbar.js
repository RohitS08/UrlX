import {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthorizationContext} from '../App'
import navBar from '../img/compass.png'
import logo from '../img/logo.png'
function Navbar(){
  const authorizationContext = useContext(AuthorizationContext)
  
  return (
      <>
     { /*
        <section className="navbar-section">
          <div className="navbar-container">
            <div className="navbar-lcol">
              <h3>Url Shortener</h3>
            </div>
            <div className="navbar-rcol">
              <nav className="nav-nav">
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/about">About</NavLink>
                { (!authorizationContext.isAuthorized) ?
                (
                <>
                <NavLink className="nav-link" to="/login">Login</NavLink>
                <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                </>
                ) :
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                }
              </nav>
            </div>
          </div>
        </section>
      </>
      */ }
      {/*
      <nav className="bg-emerald-500">
       <div className="bg-emerald-500 py-2 md:flex md:justify-between md:items-center">
         <div className="flex justify-between items-center p-2 ">
           <div className="flex items-center">
             <img src={logo} alt="logo" width="50" className=""/>
             <NavLink id="logoText" to="/" className="text-2xl font-bold text-emerald-50 px-1 ">
             UrlX
           </NavLink>
           </div>
           <button className="mr-2 w-8 md:hidden" 
             onClick={(e)=>{
               document.getElementById('nav').classList.toggle('hidden')
               document.getElementById('logoText').classList.toggle()
             }}>
            <img src={navBar} className="" />
           </button>
         </div>
         <div id="nav" className="hidden md:block mt-1 border-t-2 md:m-0 md:border-0 
         transition-all duration-500">
          <ul className="md:flex pl-2">
            <li className="py-2 px-2 hover:border-b hover:uppercase hover:text-teal-100 font-bold  ">
              <NavLink to="/" >Home</NavLink>
            </li>
            <li className="py-2 px-2 hover:border-b hover:uppercase hover:text-teal-100 font-bold  ">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="py-2 px-2 hover:border-b hover:uppercase hover:text-teal-100 font-bold  ">
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li className="py-2 px-2 hover:border-b hover:uppercase hover:text-teal-100 font-bold  ">
              <NavLink to="/login" >Login</NavLink>
            </li>
          </ul>
         </div>
       </div>
      </nav>
      */}
       <nav className="border-b shadow-lg">
       <div className=" py-2 md:flex md:justify-between md:items-center">
         <div className="flex justify-between items-center p-2 ">
           <div className="flex items-center">
             <img src={logo} alt="logo" width="50" className=""/>
             <NavLink id="logoText" to="/" className="text-2xl font-bold px-1 ">
             UrlX
           </NavLink>
           </div>
           <button id="navIcon" className="transition-all duration-500 mr-2 w-8 md:hidden cursor" 
             onClick={(e)=>{
               document.getElementById('nav').classList.toggle('hidden')
               document.getElementById('navIcon').classList.toggle('rotate-[270deg]')
             }}>
            <img src={navBar} alt="NavIcon" />
           </button>
         </div>
         <div id="nav" className="hidden md:block mt-1 mr-1 border-t-2 md:m-0 md:border-0 md:mr-2">
          <ul className="md:flex pl-2 first:mt-1">
            <li className=" hover:shadow-xl shadow-teal-500 py-2 px-2 hover:border-b hover:uppercase hover:bg-black hover:text-teal-50 font-bold rounded-lg group hover:bg-black ">
              <NavLink to="/" className="block " >Home</NavLink>
            </li>
            <li className="hover:shadow-xl shadow-emerald-800 py-2 px-2 hover:border-b hover:uppercase hover:bg-black hover:text-teal-50 font-bold rounded-lg ">
              <NavLink to="/about" className="block" >About</NavLink>
            </li>
            {
              (authorizationContext.isAuthorized)? (
                <>
                  <li className="hover:shadow-xl shadow-emerald-800 py-2 px-2 hover:border-b hover:uppercase hover:bg-black hover:text-teal-50 font-bold rounded-lg ">
                    <NavLink to="/logout" className="block" >Logout</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:shadow-xl shadow-emerald-800 py-2 px-2 hover:border-b hover:uppercase hover:bg-black hover:text-teal-50 font-bold rounded-lg ">
                    <NavLink to="/signup" className="block" >Signup</NavLink>
                  </li>
                  <li className="hover:shadow-xl shadow-emerald-800 py-2 px-2 hover:border-b hover:uppercase hover:bg-black hover:text-teal-50 font-bold rounded-lg ">
                    <NavLink to="/login" className="block" >Login</NavLink>
                   </li>
                </>
              )
            }
          </ul>
         </div>
       </div>
      </nav>
      
      </>
    )
}

export default Navbar