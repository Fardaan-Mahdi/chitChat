import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiLogIn } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/Upload";

import './Login.css'
function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false)
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin =async(e)=>{
    e.preventDefault();
    setLoading(true);
    const formData=new FormData(e.target);
    const {email,password}=Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth,email,password);
      toast.success("Logged In")

    } catch (error) {
      console.log(error)
      toast.warn(error.message);
    }finally{
      setLoading(false);
    }
  }

  const handleRegister=async(e)=>{
    setLoading(true);
    e.preventDefault();
    const formData=new FormData(e.target);
    const {username,email,password}=Object.fromEntries(formData);
    console.log(username);

    try {
      const res=await createUserWithEmailAndPassword(auth,email,password);
      const imgURL=await upload(avatar.file)
      await setDoc(doc(db,'users',res.user.uid),{
        username,
        email,
        avatar:imgURL,
        id:res.user.uid,
        blocked:[]
      });

      await setDoc(doc(db,'userChats',res.user.uid),{
        chats:[],
      });

      toast.success("Account Created")

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }


  return (
    <div className="login w-full h-full flex items-center gap-24">
      <div className="Item">
        <h2 className="text-3xl">Welcome back 👋🏻</h2>
        <div>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading} className="flex items-center justify-between">{loading? "Loading":"Login"}<FiLogIn /></button>
        </form>
          <button disabled={loading} className="flex items-center justify-between google">{loading? "Loading":"Login With Google"}<FaGoogle/></button>
        </div>
      </div>
      <div className="separator"></div>
      <div className="Item">
        <h2 className="text-3xl">Create Account 👤</h2>
        <div>
          
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload Photo
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading} className="flex items-center justify-between">{loading? "Loading":"Sign Up"}<IoPersonAddSharp/></button>
        </form>
        <button disabled={loading} className="flex items-center justify-between google">{loading? "Loading":"Sign Up With Google"}<FaGoogle/></button>
        </div>
      </div>
    </div>
  );
}

export default Login;
