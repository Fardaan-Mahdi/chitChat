import React ,{useEffect, useState, useRef} from 'react'
import EmojiPicker from 'emoji-picker-react'
import './Chat.css'

function Chat() {
const [open, setOpen] = useState(false)
const [text, setText] = useState("")
const handleEmoji=(e)=>{
    setText(prev=>prev+e.emoji);
    setOpen(false);
}
const endRef=useRef(null)
useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"})
},[])
console.log(text);
  return (
    <div className='chat flex flex-col'>
        <div className="top p-5 flex items-center justify-between">
            <div className="user flex items-center gap-2">
                <img src="./avatar.png" alt="" width={60} height={60} className='rounded-full object-cover'/>
                <div className="texts">
                    <span className='text-lg font-bold'>Fardaan Mahdi</span>
                    <p className='font-light text-sm' style={{color:'#a5a5a5'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            <div className="icons flex gap-5">
                <img src="./phone.png" alt="" width={20} height={20}/>
                <img src="./video.png" alt="" width={20} height={20}/>
                <img src="./info.png" alt="" width={20} height={20}/>
            </div>
        </div>


        <div className="center p-5 flex-1 overflow-scroll flex flex-col gap-6">
            <div className="message flex gap-5">
                <img src="./avatar.png" alt="" className='rounded-full object-cover h-8 w-8'/>
                <div className="texts flex-1 flex flex-col gap-1">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="message own flex gap-5">
                <div className="texts">
                    <img src="./messagePhoto.jpeg" alt="" className='h-80 w-full rounded-lg object-cover'/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="message flex gap-5">
                <img src="./avatar.png" alt="" className='rounded-full object-cover h-8 w-8'/>
                <div className="texts flex-1 flex flex-col gap-1">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="message own flex gap-5">
                <div className="texts">
                    <img src="./messagePhoto.jpeg" alt="" className='h-80 w-full rounded-lg object-cover'/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            
            <div ref={endRef}></div>
        </div>


        <div className="bottom p-5 mt-auto flex items-center justify-between gap-5">
            <div className="icons flex gap-5 ">
                <img src="./img.png" alt="" width={20} height={20} className='cursor-pointer'/>
                <img src="./camera.png" alt="" width={20} height={20} className='cursor-pointer'/>
                <img src="./mic.png" alt="" width={20} height={20} className='cursor-pointer'/>
            </div>
            <input type="text" value={text} placeholder='Type a message' onChange={(e)=>{
                setText(e.target.value)
            }} className='flex-1 p-3 rounded-lg text-base border-none outline-none text-white'/>
            <div className="emoji">
                <img src="./emoji.png" alt="" width={20} height={20} className='cursor-pointer' onClick={()=>{
                    setOpen(prev=>!prev)
                }}/>
                <div className="picker">
                <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                </div>
            </div>
            <button className='sendButton'>Send</button>
        </div>
    </div>
  )
}

export default Chat