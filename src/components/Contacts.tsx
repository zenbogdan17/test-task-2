import { useEffect, useState } from 'react';
import style from '../styles/Contacts.module.css';
import Headers from './Headers';
import { useAppDispatch, useAppSelector } from '../store/hooks/hook';
import {
  deleteContacts,
  editContact,
  fetchContacts,
  formReduser,
  setFitered,
} from '../store/contact/contactsSlice';
import CustomButtom from './CustomButtom';
import { UserContats, initialStateContacts } from '../types/redux_type';
import CustomInput from './CustomInput';
import { handlerFilterContact } from '../utils';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const {
    contacts,
    editFormIsShow,
    idContactsThatEdit,
    filter,
  }: initialStateContacts = useAppSelector(({ contacts }) => contacts);

  let allContact = contacts;

  useEffect(() => {
    if (idContactsThatEdit !== '') {
      const foundContact: UserContats | undefined = contacts.find(
        (item) => item.id === idContactsThatEdit
      );

      if (foundContact) {
        setEditName(foundContact.name);
        setEditPhone(foundContact.phone);
      }
    } else {
      setEditName('');
      setEditPhone('');
    }
  }, [idContactsThatEdit, contacts]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const hendlerDeletContact = (id: string) => {
    dispatch(deleteContacts(id));
  };

  if (filter !== '') {
    allContact = handlerFilterContact(contacts, filter);
  }

  return (
    <>
      <Headers />
      <div className={style.container}>
        <div className={style.wrapper}>
          <h2 className={style.title}>Your Contacts</h2>

          {filter === '' && allContact.length >= 1 ? (
            allContact.map(({ name, avatar, phone, id }) => (
              <div key={id} className={style.contact}>
                <img className={style.avatar} src={avatar} alt="avatar" />
                {editFormIsShow && id === idContactsThatEdit ? (
                  <CustomInput
                    type="text"
                    placeholder=""
                    value={editName}
                    setValue={setEditName}
                  />
                ) : (
                  <h3 className={style.nameContact}>{name}</h3>
                )}

                {editFormIsShow && id === idContactsThatEdit ? (
                  <CustomInput
                    type="text"
                    placeholder=""
                    value={editPhone}
                    setValue={setEditPhone}
                  />
                ) : (
                  <p>{phone}</p>
                )}

                {editFormIsShow && id === idContactsThatEdit ? (
                  <CustomButtom
                    title="Save"
                    handlerClick={() =>
                      dispatch(editContact({ id, editName, editPhone }))
                    }
                  />
                ) : (
                  <>
                    <CustomButtom
                      title="Edit"
                      handlerClick={() => dispatch(formReduser(id))}
                    />
                    <CustomButtom
                      title="Delete"
                      handlerClick={() => hendlerDeletContact(id)}
                    />
                  </>
                )}
              </div>
            ))
          ) : (
            <div className={style.notFound}>
              <h2>Contacts not found</h2>
              <CustomButtom
                title={'Reset search filters'}
                handlerClick={() => {
                  dispatch(setFitered(''));
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Contacts;