import React from 'react'
import ChatList from './ChatList/ChatList'
import UserInfo from './UserInfo/UserInfo'


function List() {
  return (
    <div className='flex-1 flex-col overflow-scroll'>
        <UserInfo/>
        <ChatList/>
    </div>
  )
}

export default List