import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URLforGetUser } from '../../constant/constant';
import { CurrentUser, initialStateUser } from '../../types/redux_type';

export const fetchUser = createAsyncThunk<CurrentUser[], void>(
  'user/fetchUser',
  async () => {
    const response = await axios.get(URLforGetUser);
    return response.data;
  }
);

const initialState: initialStateUser = {
  currentUser: [],
  nameUser: '',
  loading: false,
  error: null,
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userloggedIn: (state, { payload }: PayloadAction<string>) => {
      state.nameUser = payload;
      localStorage.setItem('userIsLogIn', 'true');
      localStorage.setItem('userName', payload.toString());
    },
    userIsLogIn: (state) => {
      if (localStorage.getItem('userIsLogIn') === 'true') {
        state.isLogin = true;
      }
    },
    signOutUser: () => {
      localStorage.removeItem('userIsLogIn');
      localStorage.removeItem('userName');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.currentUser = payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { userloggedIn, userIsLogIn, signOutUser } = userSlice.actions;

export default userSlice.reducer;
