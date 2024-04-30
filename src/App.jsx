import "./App.css";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setLoading, fetchUserInfo } from './lib/userStore';
import List from "./Components/List/List";
import Chat from "./Components/Chat/Chat";
import Detail from "./Components/Detail/Detail";
import Login from "./Components/Login/Login";
import Notification from "./Components/Notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";


function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unSub=onAuthStateChanged(auth,(user)=>{
      if (user) {
        dispatch(fetchUserInfo(user.uid)); // Dispatch the fetchUserInfo action
      }
    });
    return ()=>{
      unSub();
    };
  },[dispatch]);

  console.log(currentUser);

  if(isLoading) return <div className="loading p-12 text-4xl rounded-lg">Loading...</div>
  return (
    <div className="mainBody flex justify-center items-center text-white">
      <div className="w-11/12 mx-auto container rounded-lg flex">
        {currentUser ? (
          <>
            <List />
            <Chat />
            <Detail />
          </>
        ) : (
          <Login />
        )}
        <Notification/>
      </div>
    </div>
  );
}

export default App;
