import {Component, useContext} from 'react'
import '../style.css'
import signUpImage from './../img/signup.svg'
import {ModalContext} from './ModalContext'

class Signup extends Component{
  
  constructor (){
    super();
    this.state = {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      cpassword:"",
      isDataValid:false,
      validInputs : []
    }
  }
  updateValidInputsList = (name,isValid) => {
    this.setState( previousState => ({
      validInputs : (isValid ? (previousState.validInputs.includes(name) ? [...previousState.validInputs] : [...previousState.validInputs, name]) : (previousState.validInputs.includes(name) ?  previousState.validInputs.filter((_,index) => index !== previousState.validInputs.indexOf(name)) : [...previousState.validInputs])),
      isDataValid : isValid ? (previousState.validInputs.length+1<5 ? false : true) : false
      }))
  }

  handleInput = (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
    
    switch(e.target.name){
      case 'firstName':
      case 'lastName':
        {
        e.target.classList.remove('bg-gray-100')
        if(e.target.value.trim().length<1 || e.target.value.trim().indexOf(' ')>=0){
          if(e.target.classList.contains('bg-green-100')){
            e.target.classList.remove('bg-green-100')
          }
          e.target.classList.add('bg-rose-100')
          this.updateValidInputsList(e.target.name,false)
        }else{
          if(e.target.classList.contains('bg-rose-100')){
            e.target.classList.remove('bg-rose-100')
          }
          e.target.classList.add('bg-green-100')
          this.updateValidInputsList(e.target.name,true)
        }
       }
        break
      case 'email':
        {
        e.target.classList.remove('bg-gray-100')
        if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value.trim()))){
          if(e.target.classList.contains('bg-green-100')){
            e.target.classList.remove('bg-green-100')
          }
          e.target.classList.add('bg-rose-100')
          this.updateValidInputsList(e.target.name,false)
        }else{
          if(e.target.classList.contains('bg-rose-100')){
            e.target.classList.remove('bg-rose-100')
          }
          e.target.classList.add('bg-green-100')
          this.updateValidInputsList(e.target.name,true)
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
          this.updateValidInputsList(e.target.name,false)
        }else{
          if(e.target.classList.contains('bg-rose-100')){
            e.target.classList.remove('bg-rose-100')
          }
          e.target.classList.add('bg-green-100')
          this.updateValidInputsList(e.target.name,true)
        }
      }
        break
      case 'cpassword':
        {
        e.target.classList.remove('bg-gray-100')
        let password = document.getElementById('password').value.trim();
        if(e.target.value.trim().length<8 || e.target.value.trim().indexOf(' ')>=0 || e.target.value.trim()!==password){
          if(e.target.classList.contains('bg-green-100')){
            e.target.classList.remove('bg-green-100')
          }
          e.target.classList.add('bg-rose-100')
          this.updateValidInputsList(e.target.name,false)
        }else{
          if(e.target.classList.contains('bg-rose-100')){
            e.target.classList.remove('bg-rose-100')
          }
          e.target.classList.add('bg-green-100')
          this.updateValidInputsList(e.target.name,true)
        }
      }
        break
    }
    
  }
  
  register = async (e)=>{
    e.preventDefault();
    const {firstName,lastName,email,password,cpassword} = this.state;
    
    let res = await fetch('/register',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({firstName,lastName,email,password,cpassword})
    })
    let resJson = await res.json();
    if(res.status==200){
      this.context.updateModalData({
        message:`${resJson.msg}`,
        type:'success'
      })
     this.context.updateModalVisible(true)
     this.setState({
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      cpassword:"",
      isDataValid:false,
      validInputs : []
    })
    }else{
      this.context.updateModalData({
        message:`${resJson.errMsg}`,
        type:'failure'
      })
     this.context.updateModalVisible(true)
    }
  }
  
  render(){
    return (
      <>
        <section id='b' className="h-screen overflow-auto p-2">
          <div className=" max-w-2xl my-5 p-4 md:p-12  mx-auto md:shadow-2xl md:rounded-lg md:my-20 md:flex md:flex-col ">
            <div className=" ">
              <div >
                <h1 className="text-center underline decoration-auto decoration-emerald-200 text-4xl text-emerald-900 font-bold ">Register</h1>
              </div>
            </div>
            <div className=" mt-4 md:flex md:flex-row md:items-center md:justify-between">
              <div className=" ">
                <div className="my-2 px-2 ">
                  <input type="text"
                  name="firstName"
                  autoComplete="off"
                  value={this.state.firstName}
                  onChange={this.handleInput}
                  placeholder="First-Name"
                  className= "w-full h-12 mb-2 pl-2 text-lg placeholder-gray-400 text-emerald-900 rounded bg-gray-100 font-bold border border-black focus:border-0  "/>
                  <input type="text" 
                  name="lastName"
                  autoComplete="off"
                  value={this.state.lastName}
                  onChange={this.handleInput}
                  placeholder="Last-Name"
                  className="w-full h-12 rounded pl-2 text-lg bg-gray-100 text-emerald-900 font-bold border border-black"/>
                </div>
                <div className=" my-2 px-2 ">
                  <input type="email"
                  name="email"
                  autoComplete="off"
                  value={this.state.email}
                  onChange={this.handleInput}
                  placeholder="Email"
                  className="w-full h-12 rounded pl-2 text-lg bg-gray-100 text-emerald-900 font-bold border border-black focus:outline-none  " />
                </div>
                <div className="my-2 px-2 ">
                  <input type="password" 
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={this.state.password}
                  onChange={this.handleInput}
                  placeholder="Password"
                  className="w-full h-12 rounded pl-2 text-lg bg-gray-100 text-emerald-900 font-bold border border-black" />
                </div>
                <div className=" my-2 px-2">
                  <input type="password"
                  name="cpassword"
                  autoComplete="off"
                  value={this.state.cpassword}
                  onChange={this.handleInput}
                  placeholder="Confirm Password"
                  className="w-full h-12 pl-2 text-lg bg-gray-100 text-emerald-900 rounded font-bold border border-black " />
                </div>
                <div className="mx-2 ">
                  <input type="submit"
                  className="w-full h-12 uppercase text-2xl font-bold bg-emerald-300 text-emerald-900 rounded disabled:hover:shadow-none disabled:bg-gray-200 disabled:text-emerald-900 hover:shadow-lg hover:bg-emerald-900 hover:text-white "
                  onClick={this.register}
                  disabled={!this.state.isDataValid}/>
                </div>
              </div>
              <div className=" hidden w-[70%] md:block">
                <img src={signUpImage} alt="Sign Up"/>
              </div>
            </div>  
           </div>
        </section>
      </>
      )
  }
}

Signup.contextType = ModalContext
export default Signup