export interface UserContats {
  name: string;
  avatar: string;
  phone: string;
  id: string;
}

export interface CurrentUser {
  name: string;
  avatar: string;
  password: string;
  id: string;
}

export interface initialStateUser {
  currentUser: CurrentUser[] | [];
  nameUser: string;
  loading: boolean;
  error: string | null | undefined;
  isLogin: boolean;
}

export interface initialStateContacts {
  contacts: UserContats[] | [];
  loading: boolean;
  error: string | null | undefined;
  isLogin: boolean;
  editFormIsShow: boolean;
  idContactsThatEdit: string;
  filter: string;
}
