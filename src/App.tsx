import { useEffect } from 'react';
import Login from './components/Login';
import style from './styles/App.module.css';
import { userIsLogIn } from './store/user/userSlice';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Contacts from './components/Contacts';
import { useAppDispatch } from './store/hooks/hook';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('userIsLogIn') === 'true') {
      navigate('/contact');
    } else {
      navigate('/login');
    }

    dispatch(userIsLogIn());
  }, [dispatch]);

  return (
    <div className={style.app}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
