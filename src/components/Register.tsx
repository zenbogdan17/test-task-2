import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../styles/Authorizer.module.css';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { registerUser, userlogin } from '../store/user/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks/hook';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorName, setErrorName] = useState({ status: false, message: '' });
  const [errorPassword, setErrorPassword] = useState({
    status: false,
    message: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(({ user }) => user.error);

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

    dispatch(registerUser({ name, password }));
    dispatch(userlogin(name));

    if (error) {
      return alert('Error...');
    }

    navigate('/contact');

    setName('');
    setPassword('');
  };

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3>Register</h3>

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
          If you have account, <Link to={'/login'}>log in</Link>
        </div>
      </section>
    </div>
  );
};

export default Register;
