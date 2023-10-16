import style from '../styles/Profile.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks/hook';
import CustomButton from './CustomButton';
import { useEffect, useState } from 'react';
import CustomInput from './CustomInput';
import { useNavigate } from 'react-router-dom';
import { editUser, fetchUser, signOutUser } from '../store/user/userSlice';

const Profile = () => {
  const [profileChanges, setProfileChanges] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch, fetchUser]);

  const allUser = useAppSelector(({ user }) => user?.currentUser);

  if (!allUser || !Array.isArray(allUser)) {
    return <div>Loading</div>;
  }

  const [currentUser] = allUser?.filter(
    ({ name }) => name === localStorage.getItem('userName')
  );

  const [changesName, setChangesName] = useState(currentUser?.name);
  const [changesPhone, setChangesPhone] = useState(currentUser?.phone);
  const [changesPassword, setChangesPassword] = useState(currentUser?.password);
  const [changesDescription, setChangesDescription] = useState(
    currentUser?.description
  );

  const handlerChangeProfile = () => {
    if (profileChanges) {
      dispatch(
        editUser({
          id: currentUser?.id,
          name: changesName,
          phone: changesPhone,
          password: changesPassword,
          description: changesDescription,
        })
      );
    }

    setProfileChanges((prev) => !prev);
  };

  const handlerSignOut = () => {
    dispatch(signOutUser());
    navigate('/login');
  };

  return (
    <>
      <header className={style.header}>
        <h1 className={style.title}>Profile</h1>
        <div className={style.btnLink}>
          <CustomButton
            title={'◀ Contacts'}
            handlerClick={() => navigate('/contact')}
          />
        </div>

        <div className={style.btnSignOut}>
          <CustomButton title={'Sign out'} handlerClick={handlerSignOut} />
        </div>
      </header>

      <div className={style.container}>
        <section className={style.mainSection}>
          <p>Your Avatar</p>
          <img className={style.userAvatar} src={currentUser?.avatar} />

          <p>Your Name</p>
          {!profileChanges ? (
            <h2 className={style.userData}>{currentUser?.name}</h2>
          ) : (
            <CustomInput
              type="text"
              value={changesName}
              setValue={setChangesName}
            />
          )}
        </section>

        <section className={style.secondSection}>
          <p>Your Phone</p>
          {!profileChanges ? (
            <h2 className={style.userData}>{currentUser?.phone}</h2>
          ) : (
            <CustomInput
              type="text"
              value={changesPhone}
              setValue={setChangesPhone}
            />
          )}

          <p>Your Password</p>
          {!profileChanges ? (
            <h2 className={style.userData}>*********</h2>
          ) : (
            <CustomInput
              type="text"
              value={changesPassword}
              setValue={setChangesPassword}
            />
          )}

          <p>Your Description</p>
          {!profileChanges ? (
            <h2 className={style.userData}>{currentUser?.description}</h2>
          ) : (
            <CustomInput
              type="text"
              value={changesDescription}
              setValue={setChangesDescription}
            />
          )}

          <div className={style.btnChange}>
            <CustomButton
              title={profileChanges ? 'Save' : 'Change profile'}
              handlerClick={handlerChangeProfile}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
