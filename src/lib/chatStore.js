import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: null,
    user: null,
    isRecieverBlocked: false,
    isCurrentUserBlocked: false
  },
  reducers: {
    changeChat: (state, action) => {
      const { chatId, user, currentUser } = action.payload;
      if (currentUser.blocked.includes(user.id)) {
        state.chatId = chatId;
        state.user = null;
        state.isCurrentUserBlocked = true;
        state.isRecieverBlocked = false;
      } else if (user.blocked.includes(currentUser.id)) {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isRecieverBlocked = true;
      } else {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isRecieverBlocked = false;
      }
    },
    changeBlock: (state) => {
      state.isRecieverBlocked = !state.isRecieverBlocked;
    }
  }
});

// Export actions
export const { changeChat, changeBlock } = chatSlice.actions;

// Export reducer
export default chatSlice.reducer;
