import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/Login.module.css';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { fetchUser, userloggedIn } from '../store/user/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks/hook';

const Login = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [user1] = useAppSelector(({ user }) => user?.currentUser);
  const allUser = useAppSelector(({ user }) => user?.currentUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogin = () => {
    if (!login || !password) {
      return alert('Enter your password and login');
    }

    for (let i = 0; i < allUser.length; i++) {
      if (allUser[i].name === login && allUser[i].password === password) {
        dispatch(userloggedIn(allUser[i].name));
      }
    }

    navigate('/contact');

    setIsLogIn(true);
    setLogin('');
    setPassword('');
  };

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>Login</h3>

        <CustomInput
          value={login}
          setValue={setLogin}
          type={'string'}
          placeholder={'Enter login'}
        />
        <CustomInput
          value={password}
          setValue={setPassword}
          type={'password'}
          placeholder={'Enter password'}
        />

        <CustomButton title={'Send'} handlerClick={handleLogin} />
      </section>

      {!isLogIn && (
        <section className={style.hint}>
          <h5>Data hint</h5>
          <p>
            Login:<span> {user1?.name}</span>
          </p>
          <p>
            Password: <span> {user1?.password}</span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
