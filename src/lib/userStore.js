import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (uid) => {
    if (!uid) {
      return { currentUser: null, isLoading: false };
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { currentUser: docSnap.data(), isLoading: false };
      } else {
        return { currentUser: null, isLoading: false };
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      return { currentUser: null, isLoading: false };
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isLoading: false
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.currentUser;
    });
  }
});

export const { setCurrentUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
