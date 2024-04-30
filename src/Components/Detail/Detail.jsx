import React from "react";
import "./Detail.css";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../../lib/firebase";
import { update } from "firebase/database";
import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { changeBlock } from "../../lib/chatStore";

function Detail() {
  const user = useSelector((state) => state.chat.user);
  const isRecieverBlocked = useSelector(
    (state) => state.chat.isRecieverBlocked
  );
  const isCurrentUserBlocked = useSelector(
    (state) => state.chat.isCurrentUserBlocked
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      dispatch(changeBlock());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail flex-1 overflow-scroll">
      <div className="userDetail px-8 py-5 flex flex-col items-center gap-4">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2 className="font-bold">{user?.username}</h2>
        <p className="text-sm text-gray-300">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem,
          vel.
        </p>
      </div>
      <div className="info p-5 flex flex-col gap-8 flex-1">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos mt-5">
            <div className="photoItem flex items-center justify-between">
              <div className="photoDetail flex items-center gap-5">
                <img
                  src="./messagePhoto.jpeg"
                  alt=""
                  className="h-80 w-full rounded-lg object-cover"
                />
                <span className="text-sm font-light text-gray-300">
                  photo_26042024
                </span>
              </div>
              <img src="./download.png" alt="" className="downloadIcon" />
            </div>
            <div className="photoItem flex items-center justify-between">
              <div className="photoDetail flex items-center gap-5">
                <img
                  src="./messagePhoto.jpeg"
                  alt=""
                  className="h-80 w-full rounded-lg object-cover"
                />
                <span className="text-sm font-light text-gray-300">
                  photo_26042024
                </span>
              </div>
              <img src="./download.png" alt="" className="downloadIcon" />
            </div>
            <div className="photoItem flex items-center justify-between">
              <div className="photoDetail flex items-center gap-5">
                <img
                  src="./messagePhoto.jpeg"
                  alt=""
                  className="h-80 w-full rounded-lg object-cover"
                />
                <span className="text-sm font-light text-gray-300">
                  photo_26042024
                </span>
              </div>
              <img src="./download.png" alt="" className="downloadIcon" />
            </div>
            <div className="photoItem flex items-center justify-between">
              <div className="photoDetail flex items-center gap-5">
                <img
                  src="./messagePhoto.jpeg"
                  alt=""
                  className="h-80 w-full rounded-lg object-cover"
                />
                <span className="text-sm font-light text-gray-300">
                  photo_26042024
                </span>
              </div>
              <img src="./download.png" alt="" className="downloadIcon" />
            </div>
            <div className="photoItem flex items-center justify-between">
              <div className="photoDetail flex items-center gap-5">
                <img
                  src="./messagePhoto.jpeg"
                  alt=""
                  className="h-80 w-full rounded-lg object-cover"
                />
                <span className="text-sm font-light text-gray-300">
                  photo_26042024
                </span>
              </div>
              <img src="./download.png" alt="" className="downloadIcon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isRecieverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>

        <button
          className="logout"
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Detail;
