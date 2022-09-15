import {Component} from 'react'

class Footer extends Component{
  render(){
    return (
      <>
        <footer className=" bg-emerald-900 pt-4 px-2 ">
          <div className=" ">
          <div className="text-xl text-white font-bold">
          <h3>Contact </h3>
          <h5>Email : <span>rohitsinghmhkr@gmail.com</span></h5>
          </div>
          <div className=" text-sm text-white font-extrabold">
            <span className=" block text-right pb-1 ">©Made ♥️ by Rohit.</span>
          </div>
          </div>
        </footer>
      </>
      )
  }
}

export default Footer