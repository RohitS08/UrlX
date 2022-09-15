import { useState, useEffect } from 'react'

import copyIconImage from './../../img/copyIcon32.png'
import UrlTableRow from './../UrlTableRow'

function UserHomePage(){
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [isUrlValid, setIsUrlValid] = useState(false)
  const [userUrlList, setUserUrlList] = useState([])
  const [expandedRow, setExpandedRow] = useState('')
  
  const expandRow = (e) => {
    setExpandedRow(e.target.id)
  }
  
  const handleInput = (e) => {
    setUrl(e.target.value)
    
    // ^-^
    let urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    if(urlRegex.test(e.target.value.trim())){
      setIsUrlValid(true)
    }else{
      setIsUrlValid(false)
    }
  }
  
  const shrinkUrl = (e) => {
    fetch ('/shrink',{
      method:'POST',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        'longUrl':url
      })
    }).then((res)=>{
      if(res.status===200){
        res.json().then((data)=>{
          alert(data.shortUrl)
          setShortenedUrl(data.shortUrl)
        })
      }else if(res.status===422){
        res.json().then((data)=>{
          alert(data.errMsg);
        })
      }
    }).catch((err)=>{
      console.error(err);
    })
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
  
  const fetchData = () => {
    fetch('/data',{
      method:"GET",
      header:{
        "Content-type":"application/json"
      }
    })
    .then( res => {
      console.log(res)
      res.json()
      .then(_res => {
        let urlData = []
        console.log(_res)
        for(let i in _res.urls){
          urlData[i] = _res.urls[i]
        }
        setUserUrlList(urlData)
      })
    }).catch(err => console.log(err))
  }
  
  useEffect(()=>{
    fetchData()
    const timer = setInterval(() => {
      fetchData()
    },5000)
    return () => clearInterval(timer)
  },[])
  

  return (
    <>
    <section className=" h-screen overflow-auto p-4 ">
        <div className=" text-center pt-2">
          <span className=" text-emerald-900 text-4xl font-bold underline decoration-auto decoration-emerald-200 ">
            UrlX
          </span>
        </div>
        <div className=" max-w-[450px] mx-auto py-2 mt-6 md:rounded md:shadow-lg md:shadow-slate-200 md:max-w-xl ">
          <div className=" md:flex md:items-center">
            <div className=" px-2 my-2 md:basis-3/4">
              <input type="text"
              placeholder="Enter URL to shrink..."
              className=" w-full bg-gray-100 h-8 md:h-10 rounded border border-black pl-1 text-slate-600 " 
              value={url}
              onChange={handleInput}/>
            </div>
            <div className=" px-2 md:basis-1/4">
              <input type="submit"
              value="Shrink"
              className="w-full bg-emerald-900 h-10 rounded border border-black text-white font-bold text-lg disabled:bg-gray-100 disabled:text-emerald-900"
              onClick={shrinkUrl}
              disabled={!isUrlValid}/>
            </div>
          </div>
          { shortenedUrl && (
          <div className=" text-emerald-900 bg-emerald-100 mx-2 my-2 rounded p-1 text-sm flex justify-between items-center ">
            <div>https://localhost:3000/{shortenedUrl}</div>
            <div className="mr-1 hover:shadow-inner "
            onClick={copyToClipboard}>
              <img src={copyIconImage} width="16" alt="CopyIcon" 
             /* onClick={() => {navigator.clipboard.writeText(shortenedUrl)}}*/ />
            </div>
          </div>
          )  }
        </div>
        <div className="mt-12 ">
          <div className=" ">
          
          </div>
          {!userUrlList.length<1 ?
          (<div className=" ">
            <div className="flex [&>*]:font-bold [&>*]:text-white [&>*]:bg-emerald-900 max-w-5xl mx-auto items-baseline">
              <div className=" p-2 border-y-2 text-center basis-2/12 ">
                Sr.
              </div>
              <div className=" p-2 border-y-2 text-center basis-6/12 ">
                Long Url
              </div>
              <div className=" p-2 border-y-2 text-center basis-5/12">
                Short Url
              </div>
              <div className=" p-2 border-y-2 text-center basis-1/12">
                ...
              </div>
            </div>
            <div>
            {userUrlList.map((urlData,i) => <UrlTableRow data={urlData} srno={i+1} key={urlData.shortUrl} expandedRow={expandedRow} setExpandedRow={expandRow} />)}
            </div>
          </div>) : (
            <div>
              No Links!
            </div>
          )}
        </div>
    </section>
    </>
  )
}

export default UserHomePage