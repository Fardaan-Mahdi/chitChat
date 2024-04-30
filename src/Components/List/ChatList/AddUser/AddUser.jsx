import React ,{useState}from 'react'
import './AddUser.css'
import { collection,query,where,getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { doc,setDoc,updateDoc,arrayUnion } from 'firebase/firestore';
import { useSelector } from "react-redux";

function AddUser() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [user,setUser]=useState(null)
  const handleSearch=async(e)=>{
    e.preventDefault();
    const formData=new FormData(e.target);
    const username=formData.get('username');
    try {
      const userRef=collection(db,'users');
      const q=query(userRef,where('username','==',username));
      const querySnapShot=await getDocs(q);
      if(!querySnapShot.empty){
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAdd =async()=>{
    const chatRef=collection(db,'chats')
    const userChatsRef=collection(db,'userChats')

    try {
      const newChatRef=doc(chatRef)
      await setDoc(newChatRef,{
        createdAt:serverTimestamp(),
        messages:[]
      });

      await updateDoc(doc(userChatsRef,user.id),{
        chats:arrayUnion({
          chatId:newChatRef.id,
          lastMessage:"",
          recieverId:currentUser.id,
          updatedAt:Date.now()
        })
      })

      await updateDoc(doc(userChatsRef,currentUser.id),{
        chats:arrayUnion({
          chatId:newChatRef.id,
          lastMessage:"",
          recieverId:user.id,
          updatedAt:Date.now(),
        })
      })

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='adduser p-7'>
        <form className='flex gap-5' onSubmit={handleSearch}>
            <input type="text" placeholder='Username' name='username' className='p-5 rounded-lg border-none outline-none text-black'/>
            <button className='p-5 rounded-lg text-white cursor-pointer' style={{backgroundColor:'#1a73e8'}}>Search</button>
        </form>
        {user && <div className="user mt-12 flex items-center justify-between">
            <div className="detail flex items-center gap-5">
                <img src={user.avatar || "./avatar.png"} alt="" width={50} height={50} className='rounded-full object-cover'/>
                <span>{user.username}</span>
            </div>
            <button className='p-2 rounded-lg text-white cursor-pointer' style={{backgroundColor:'#1a73e8'}} onClick={handleAdd}>Add User</button>
        </div>}
    </div>
  )
}

export default AddUser