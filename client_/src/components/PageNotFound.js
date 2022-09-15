import {NavLink} from 'react-router-dom'

function PageNotFound(){
  return (
      <div className="overflow-auto h-screen bg-gray-5 tex-xl mt-[25%] ">
        <span className=" block  w-fit mx-auto text-2xl font-extrabold ">Not Found!</span><br />
        <div className=" w-fit mx-auto text-xl font-normal text-center">
        <span className="  ">You seem to be Lost🤕</span><br />
        <span className="  ">Let's go <NavLink to="/" className=" underline font-bold text-emerald-900 ">Home</NavLink></span>
        </div>
      </div>
    )
}

export default PageNotFound