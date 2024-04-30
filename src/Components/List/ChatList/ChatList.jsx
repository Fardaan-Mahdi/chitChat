import React, { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import "./ChatList.css";
import AddUser from "./AddUser/AddUser";
import { useSelector, useDispatch } from "react-redux";
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { changeChat } from "../../../lib/chatStore";

function ChatList() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [addMode, setaddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input,setInput]=useState("");
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.recieverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;
    const userChatsRef = doc(db, "userChats", currentUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      const { chatId, user } = chat;
      dispatch(changeChat({ chatId, user, currentUser }));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredChats=chats.filter(c=>c.user.username.toLowerCase().includes(input.toLowerCase()))
  return (
    <div className="chatList flex-1 overflow-scroll">
      <div className="search flex items-center gap-2 p-5">
        <div className="searchBar flex-1 flex items-center gap-5 rounded-md p-2">
          <img src="./search.png" alt="" height={20} width={20} />
          <input
            type="text"
            placeholder="Search"
            onChange={(e)=>setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-1/2"
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add rounded-md cursor-pointer p-2"
          onClick={() => {
            setaddMode((prev) => !prev);
          }}
        />
      </div>
      {filteredChats.map((chat) => (
        <div
          className="itemInfo flex items-center gap-5 p-5 cursor-pointer"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img src={chat.user.blocked.includes(currentUser.id)?"./avatar.png": chat.user.avatar || './avatar.png'} alt="" />
          <div className="texts flex-col gap-3">
            <span className="font-medium">{chat.user.blocked.includes(currentUser.id)?"User": chat.user.username}</span>
            <p className="font-light text-sm">{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
