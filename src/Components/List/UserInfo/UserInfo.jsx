import React from 'react'
import './UserInfo.css'
import { useSelector } from 'react-redux';

function UserInfo() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className='userInfo flex items-center p-5 justify-between'>
        <div className='userDetails flex items-center gap-5'>
            <img src={currentUser.avatar || "./avatar.png"} alt=""/>
            <h2>{currentUser.username}</h2>
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