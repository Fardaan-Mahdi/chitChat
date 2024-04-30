// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './lib/userStore';
import chatReducer from './lib/chatStore';

const store = configureStore({
  reducer: {
    user: userReducer,
    chat:chatReducer,
  }
});

export default store;
