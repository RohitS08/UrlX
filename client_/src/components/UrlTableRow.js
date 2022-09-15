import {useState, useContext} from 'react'
import copyIconImage from './../img/copyIcon32.png'
import {ModalContext} from './ModalContext'

function UrlTableRow(props){
  const modalContext = useContext(ModalContext)
  const [clicks, setClicks] = useState(0)
  const [isUrlValid, setIsUrlValid] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  
  const changeOriginalUrl = (e) => {
   fetch('/change',{
      method:'POST',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        shortUrl:props.data.shortUrl,
        newUrl
      })
    })
    .then( res => {
      if(res.status===200){
        modalContext.updateModalData({
          message:'Url Updated',
          type:'success'
        })
        modalContext.updateModalVisible(true)
      }else{
        modalContext.updateModalData({
          message:'Could not Updated Url\n Try Agaim',
          type:'error'
        })
        modalContext.updateModalVisible(true)
      }
    })
  }
  
  const handleInput = (e) => {
    setNewUrl(e.target.value)
    
    // ^-^
    let urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    if(urlRegex.test(e.target.value.trim())){
      setIsUrlValid(true)
    }else{
      setIsUrlValid(false)
    }
  }
  
  const copyToClipboard = (e) => {
    // ^-^
    var range = document.createRange();
    range.selectNode(e.target.parentNode.previousElementSibling);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert('copied!')
  }
  
  
  return (
    <div className=" [&>*]:font-bold [&>*]:text-emerald-900 max-w-5xl mx-auto even:bg-gray-50 ">
    <div className="flex ">
      <div className=" p-2 border-b text-center basis-2/12">
        {props.srno}
      </div>
      <div className="flex text-xs py-2 border-b  overflow-hidden text-center basis-6/12 grow-0 pl-1">
        <div className=" overflow-auto  ">
          {props.data.longUrl}
        </div>
        <div className="ml-1 min-w-fit hover:shadow-inner  "
            onClick={copyToClipboard}>
              <img src={copyIconImage} width="16" alt="CopyIcon" />
          </div>
      </div>
      <div className=" flex justify-center text-xs py-2 pl-1 border-b text-center basis-5/12 overflow-hidden">
        <div className=" min-w-0 overflow-auto ">
          https://localhost:3000/{props.data.shortUrl}
        </div>
        <div className="ml-1 min-w-fit hover:shadow-inner  "
            onClick={copyToClipboard}>
              <img src={copyIconImage} width="16" alt="CopyIcon" />
          </div>
      </div>
      <div id={props.data.shortUrl} className=" p-2 border-b text-center basis-1/12 " 
      onClick={props.setExpandedRow} >
        +
      </div>
     </div>
     {props.expandedRow === props.data.shortUrl &&
     <div className="my-2 pt-2 pl-2 border ">
      <div className=" w-fit mx-auto md:text-xl">
        <span htmlFor="clicks" >
          No. of Clicks : </span>
        <span className=" ">
           {props.data.clicks}
        </span>
      </div>
      <div className="flex mt-2 py-2 px-2 justify-around items-center ">
        <label htmlFor="newUrl" 
          className=" text-sm basis-auto " >Enter new Url : </label>
        <input type="text" id="newUrl"
          placeholder="New Url..." 
          value={newUrl}
          onChange={handleInput}
          className="basis-2/4 pl-2 h-10 text-sm border-2 border-teal-100 bg-gray-50 outline-none focus:border-3 focus:border-teal-400"/>
        <button 
          className="basis-1/4 max-w-[150px] bg-emerald-900 text-white rounded p-2 disabled:bg-gray-100 disabled:text-emerald-900 border border-black ml-1 "
          onClick={changeOriginalUrl}
          disabled={!isUrlValid}
        >Change</button>
      </div>
     </div>
     }
    </div>
  )
}

export default UrlTableRow