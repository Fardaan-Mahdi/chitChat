import React from 'react'
import './UserInfo.css'
function UserInfo() {
  return (
    <div className='userInfo flex items-center p-5 justify-between'>
        <div className='userDetail flex items-center gap-5'>
            <img src="./avatar.png" alt=""/>
            <h2>Fardaan Mahdi</h2>
        </div>
        <div className='icons flex gap-5'>
            <img src="./more.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./edit.png" alt="" />
        </div>
    </div>
  )
}

export default UserInfo