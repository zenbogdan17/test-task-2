import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import contactsSlice from './contact/contactsSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    contacts: contactsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
