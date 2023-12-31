import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../styles/Authorizer.module.css';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { fetchUser, userlogin } from '../store/user/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks/hook';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorName, setErrorName] = useState({ status: false, message: '' });
  const [errorPassword, setErrorPassword] = useState({
    status: false,
    message: '',
  });

  const allUser = useAppSelector(({ user }) => user?.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogin = () => {
    if (!name || !password) {
      setErrorName({ status: true, message: 'Enter a name!' });
      setErrorPassword({ status: true, message: 'Enter a password!' });
      return;
    }
    setErrorName({ status: false, message: '' });
    setErrorPassword({ status: false, message: '' });

    if (name.length < 6) {
      setErrorName({ status: true, message: 'Invalid or too short name!' });
      return;
    }
    if (password.length < 6) {
      setErrorPassword({
        status: true,
        message: 'Invalid or too short password',
      });
      return;
    }

    let isCorrect = false;

    for (let i = 0; i < allUser.length; i++) {
      if (allUser[i].name === name && allUser[i].password === password) {
        dispatch(userlogin(allUser[i].name));
        isCorrect = true;
      }
    }

    isCorrect && navigate('/contact');

    setName('');
    setPassword('');
  };

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>Login</h3>

        <CustomInput
          error={errorName}
          value={name}
          setValue={setName}
          type={'string'}
          placeholder={'Enter name'}
        />
        <CustomInput
          error={errorPassword}
          value={password}
          setValue={setPassword}
          type={'password'}
          placeholder={'Enter password'}
        />

        <CustomButton title={'Send'} handlerClick={handleLogin} />

        <div className={style.supportingText}>
          If you do not have an account, <Link to={'/register'}>register</Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
