import { CustomButtomProps } from '../types';
import style from '../styles/CustomButtom.module.css';
import signOut from '../constant/signOut.png';

const CustomButtom = ({
  title,
  handlerClick,
  styleProps,
}: CustomButtomProps) => {
  return (
    <div className={style.container}>
      <button style={styleProps} onClick={() => handlerClick()}>
        {title === 'Sign out' && <img src={signOut} />}
        {title !== 'Sign out' && title}
      </button>
    </div>
  );
};

export default CustomButtom;
