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

export const registerUser = createAsyncThunk<
  CurrentUser[],
  { name: string; password: string }
>('user/registerUser', async ({ name, password }) => {
  console.log(JSON.stringify({ name, password }));
  const response = await axios.post(
    `${URLforGetUser}`,

    JSON.stringify({ name, password }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data as CurrentUser[];
});

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
    userlogin: (state, { payload }: PayloadAction<string>) => {
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
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.currentUser = payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { userlogin, userIsLogIn, signOutUser } = userSlice.actions;

export default userSlice.reducer;
