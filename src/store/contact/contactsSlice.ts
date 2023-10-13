import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URLforGetContacts } from '../../constant/constant';
import { initialStateContacts, UserContacts } from '../../types/redux_type';

export const fetchContacts = createAsyncThunk<UserContacts[], void>(
  'contacts/fetchContacts ',
  async () => {
    const response = await axios.get(URLforGetContacts);
    return response.data as UserContacts[];
  }
);

export const deleteContacts = createAsyncThunk<UserContacts, string>(
  'contacts/deleteContacts ',
  async (id) => {
    const response = await axios.delete(`${URLforGetContacts}/${id}`);
    return response.data as UserContacts;
  }
);

export const editContact = createAsyncThunk<
  UserContacts,
  {
    id: string;
    editName: string;
    editPhone: string;
  }
>('contacts/editContact', async ({ id, editName, editPhone }) => {
  const response = await axios.put(
    `${URLforGetContacts}/${id}`,

    JSON.stringify({ name: editName, phone: editPhone, id }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data as UserContacts;
});

export const addContact = createAsyncThunk<
  UserContacts,
  { name: string; phone: string }
>(
  'contacts/addContact',
  async ({ name, phone }: { name: string; phone: string }) => {
    const response = await axios.post(
      `${URLforGetContacts}`,

      JSON.stringify({ name, phone }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data as UserContacts;
  }
);

const initialState: initialStateContacts = {
  contacts: [],
  loading: false,
  error: null,
  isLogin: false,
  editFormIsShow: false,
  idContactsThatEdit: '',
  filter: '',
};

const contactsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    formReduser: (state, { payload }: PayloadAction<string>) => {
      if (!state.editFormIsShow) {
        state.editFormIsShow = !state.editFormIsShow;
      }

      state.idContactsThatEdit = payload;
    },
    setFitered: (state, { payload }: PayloadAction<string>) => {
      state.filter = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (item) => item.id !== payload.id
        );
      })
      .addCase(deleteContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editContact.fulfilled, (state, { payload }) => {
        const index = state.contacts.findIndex(
          (contact) => contact.id === payload.id
        );

        if (index !== -1) {
          state.contacts[index].name = payload.name;
          state.contacts[index].phone = payload.phone;
        }

        state.loading = false;
        state.editFormIsShow = false;
        state.idContactsThatEdit = '';
      })
      .addCase(editContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts = [...state.contacts, payload];
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { formReduser, setFitered } = contactsSlice.actions;

export default contactsSlice.reducer;
