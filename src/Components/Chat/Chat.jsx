import React, { useEffect, useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import "./Chat.css";
import {
  onSnapshot,
  doc,
  arrayUnion,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useSelector } from "react-redux";
import upload from "../../lib/Upload";

function Chat() {
  const [chat, setChat] = useState(false);
  const [open, setOpen] = useState(false);
  const isRecieverBlocked = useSelector(
    (state) => state.chat.isRecieverBlocked
  );
  const isCurrentUserBlocked = useSelector(
    (state) => state.chat.isCurrentUserBlocked
  );
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const chatId = useSelector((state) => state.chat.chatId);
  const user = useSelector((state) => state.chat.user);
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);


  const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  return (
    <div className="chat flex flex-col">
      <div className="top p-5 flex items-center justify-between">
        <div className="user flex items-center gap-2">
          <img
            src={user?.avatar || "./avatar.png"}
            alt=""
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div className="texts">
            <span className="text-lg font-bold">{user?.username}</span>
            <p className="font-light text-sm" style={{ color: "#a5a5a5" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="icons flex gap-5">
          <img src="./phone.png" alt="" width={20} height={20} />

          <img src="./video.png" alt="" width={20} height={20} />
          <img src="./info.png" alt="" width={20} height={20} />
        </div>
      </div>

      <div className="center p-5 flex-1 overflow-scroll flex flex-col gap-6">
        {chat?.messages?.map((message) => (
          <div
            className={`message ${message.senderId===currentUser.id ? 'own':''} flex gap-5`}
            key={message?.createdAt}
          >
            <div className="texts">
              {message.img && (
                <img
                  src={message.img}
                  alt=""
                  className="h-80 w-full rounded-lg object-cover"
                />
              )}
              <p>{message.text}</p>
              {/* <span>{message}</span> */}
            </div>
          </div>
        ))}
        {img.url && <div className={`message own flex gap-5`}>
          <div className="texts">
            {img.url && (
              <img
                src={img.url}
                alt=""
                className="h-80 w-full rounded-lg object-cover"
              />
            )}
          </div>
        </div>}

        <div ref={endRef}></div>
      </div>

      <div className="bottom p-5 mt-auto flex items-center justify-between gap-5">
        <div className="icons flex gap-5 ">
          <label htmlFor="file">
            <img
              src="./img.png"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img
            src="./camera.png"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <img
            src="./mic.png"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={text}
          placeholder={(isCurrentUserBlocked || isRecieverBlocked)?"Cannot send message": "Type a message"}
          onChange={(e) => {
            setText(e.target.value);
          }}
          disabled={isCurrentUserBlocked || isRecieverBlocked}
          className="flex-1 p-3 rounded-lg text-base border-none outline-none text-white"
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isRecieverBlocked}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
