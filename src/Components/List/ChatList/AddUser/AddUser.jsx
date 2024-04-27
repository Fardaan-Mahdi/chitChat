import React from 'react'
import './AddUser.css'
function AddUser() {
  return (
    <div className='adduser p-7'>
        <form className='flex gap-5 '>
            <input type="text" placeholder='Username' name='username' className='p-5 rounded-lg border-none outline-none '/>
            <button className='p-5 rounded-lg text-white cursor-pointer' style={{backgroundColor:'#1a73e8'}}>Search</button>
        </form>
        <div className="user mt-12 flex items-center justify-between">
            <div className="detail flex items-center gap-5">
                <img src="./avatar.png" alt="" width={50} height={50} className='rounded-full object-cover'/>
                <span>Fardaan Mahdi</span>
            </div>
            <button className='p-2 rounded-lg text-white cursor-pointer' style={{backgroundColor:'#1a73e8'}}>Add User</button>
        </div>
    </div>
  )
}

export default AddUser