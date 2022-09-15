import {useState, useRef} from 'react'
import copyIconImage from './../../img/copyIcon32.png'

function PublicHomePage(){
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [isUrlValid, setIsUrlValid] = useState(false)
  const shortenedUrlRef = useRef(null)
  
  const handleInput = (e) => {
    setUrl(e.target.value)
    
    let urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    console.log(urlRegex.test(e.target.value),e.target.value)
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
    var range = document.createRange();
    range.selectNode(shortenedUrlRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert('copied!')
  }
  return (
    <>
    <section className=" h-screen overflow-auto p-4 ">
      <div className=" ">
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
            <div ref={shortenedUrlRef} >https://localhost:300/{shortenedUrl}</div>
            <div className="mr-1 hover:shadow-inner "
            onClick={copyToClipboard}>
              <img src={copyIconImage} width="16" alt="CopyIcon" 
             /* onClick={() => {navigator.clipboard.writeText(shortenedUrl)}}*/ />
            </div>
          </div>
          )  }
        </div>
        <div className="mt-12 flex flex-row flex-wrap md:flex-nowrap md:justify-around ">
          <div className="md:shadow md:shadow-slate-300 rounded w-full max-w-[480px] md:w-1/3  p-4 mx-auto my-2 md:p-12">
            <h4 className="text-center font-bold text-lg ">Title</h4>
            <p className="pt-2 text-center font-bolf text-lg ">Some Information about us will come over here.Will be added in future during final finishing</p>
          </div>
          <div className="md:shadow md:shadow-slate-300 rounded w-full max-w-[480px] md:w-1/3 p-4 mx-auto my-2 md:mx-2 md:p-12 ">
            <h4 className="text-center font-bold text-lg ">Title</h4>
            <p className="pt-2 text-center font-bolf text-lg ">Some Information about us will come over here.Will be added in future during final finishing</p>
          </div>
          <div className="md:shadow md:shadow-slate-300 rouneded w-full max-w-[480px] md:w-1/3 p-4 mx-auto my-2 md:p-12 ">
            <h4 className="text-center font-bold text-lg ">Title</h4>
            <p className="pt-2 text-center font-bolf text-lg ">Some Information about us will come over here.Will be added in future during final finishing</p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default PublicHomePage