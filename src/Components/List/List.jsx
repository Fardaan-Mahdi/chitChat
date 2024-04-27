import React from 'react'
import ChatList from './ChatList/ChatList'
import UserInfo from './UserInfo/UserInfo'
import './List.css'

function List() {
  return (
    <div className='flex-1 flex-col overflow-scroll sidebar'>
        <UserInfo/>
        <ChatList/>
    </div>
  )
}

export default List