import {useContext, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {ModalContext} from './ModalContext'

function Modal(props){
  const modalContext = useContext(ModalContext)
  const [modalVisible, setModalVisible] = useState(true)
  useEffect( ()=>{
    modalContext.updateModalVisible(modalVisible)
  },[modalVisible])
  return ReactDOM.createPortal(
    <>
      <div className="bg-gray-100/10 w-full z-index-1 h-screen fixed">
        <div className={` mt-[100px] w-fit py-4 px-6 ${props.data.type=='success' ? ' bg-emerald-200/95 ' : ' bg-rose-200/95 ' } ${props.data.type=='success' ? ' shadow-emerald-200 ' : ' shadow-rose-200 ' } mx-auto flex flex-row justify-between items-center shadow-lg rounded text-lg text-emerald-900 font-bold lg:text-2xl `}>
          <div className="  mx-2">
            {props.data.message}
          </div>
          <div className=" text-3xl grow-0 ml-2 hover:text-white ">
          <button 
          onClick={()=>{
            setModalVisible(false)
          }}>
          ×
          </button>
          </div>
        </div>
      </div>
    </>
  ,document.getElementById('modal'))
}

export default Modal