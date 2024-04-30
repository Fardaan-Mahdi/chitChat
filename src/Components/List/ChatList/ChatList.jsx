import React, { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import "./ChatList.css";
import AddUser from "./AddUser/AddUser";
import { useSelector } from "react-redux";
import { onSnapshot, doc ,getDoc } from "firebase/firestore";

function ChatList() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [addMode, setaddMode] = useState(false);
  const [chats, setChats] = useState([]);
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
        const chatData=await Promise.all(promises)
        setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt))
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  console.log(chats);
  return (
    <div className="chatList flex-1 overflow-scroll">
      <div className="search flex items-center gap-2 p-5">
        <div className="searchBar flex-1 flex items-center gap-5 rounded-md p-2">
          <img src="./search.png" alt="" height={20} width={20} />
          <input
            type="text"
            placeholder="Search"
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
      {chats.map((chat) => (
        <div
          className="itemInfo flex items-center gap-5 p-5 cursor-pointer"
          key={chat.chatId}
        >
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts flex-col gap-3">
            <span className="font-medium">{chat.user.username}</span>
            <p className="font-light text-sm">{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
