import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/Headers.module.css';
import CustomButton from './CustomButton';
import { fetchUser, signOutUser } from '../store/user/userSlice';
import CustomInput from './CustomInput';
import { setFitered } from '../store/contact/contactsSlice';
import AddContactModal from './Modal';
import { useAppDispatch, useAppSelector } from '../store/hooks/hook';

const Headers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const avatar = useAppSelector(({ user }) => user?.currentUser[0]?.avatar);
  const filter = useAppSelector(({ contacts }) => contacts.filter);

  useEffect(() => {
    dispatch(fetchUser());
    setSearchValue(filter);
  }, [filter, dispatch]);

  const handlerSignOut = () => {
    dispatch(signOutUser());
    navigate('/login');
  };

  const handlerShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handlerSearchContact = () => {
    dispatch(setFitered(searchValue));
  };

  return (
    <>
      <AddContactModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />

      <div className={style.header}>
        <div className={style.userInfo}>
          <img src={avatar} alt="avatarUser" />
          <h2>{localStorage.getItem('userName')}</h2>
        </div>

        <div className={style.search}>
          <CustomInput
            type="text"
            placeholder="Enter contact"
            value={searchValue}
            setValue={setSearchValue}
          />

          <CustomButton
            title="Search"
            handlerClick={handlerSearchContact}
            styleProps={{ fontSize: '15px', padding: '5px' }}
          />
        </div>

        <div className={style.btns}>
          <CustomButton
            styleProps={{
              border: 'solid 1px var(--white)',
              backgroundColor: 'var(--bg)',
            }}
            title="Add contact"
            handlerClick={handlerShowModal}
          />
          <CustomButton title="Sign out" handlerClick={handlerSignOut} />
        </div>
      </div>
    </>
  );
};

export default Headers;
