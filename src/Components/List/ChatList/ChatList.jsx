import React,{useState} from 'react'
import './ChatList.css'
import AddUser from './AddUser/AddUser';
function ChatList() {
const [addMode, setaddMode] = useState(false)
  return (
    <div className='chatList flex-1 overflow-scroll'>
        <div className="search flex items-center gap-2 p-5">
            <div className="searchBar flex-1 flex items-center gap-5 rounded-md p-2">
                <img src="./search.png" alt="" height={20} width={20}/>
                <input type="text" placeholder='Search' className='bg-transparent border-none outline-none text-white w-1/2'/>
            </div>
            <img src={addMode?"./minus.png":"./plus.png"} alt="" className='add rounded-md cursor-pointer p-2' onClick={()=>{
                setaddMode((prev)=>!(prev));
            }}/>
        </div>
        <div className="itemInfo flex items-center gap-5 p-5 cursor-pointer">
            <img src="./avatar.png" alt=""/>
            <div className="texts flex-col gap-3">
                <span className='font-medium'>Fardaan Mahdi</span>
                <p className='font-light text-sm'>Hello</p>
            </div>
        </div>
        {addMode && <AddUser/>}
    </div>
  )
}

export default ChatList