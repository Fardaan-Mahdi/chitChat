import React from "react";
import "./Detail.css";

function Detail() {
  return (
    <div className="detail flex-1 overflow-scroll">
      <div className="userDetail px-8 py-5 flex flex-col items-center gap-4">
        <img src="./avatar.png" alt="" />
        <h2 className="font-bold">Fardaan Mahdi</h2>
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
        <button>Block User</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
}

export default Detail;
