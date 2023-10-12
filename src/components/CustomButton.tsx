import { CustomButtonProps } from '../types';
import style from '../styles/CustomButton.module.css';
import signOut from '../constant/signOut.png';

const CustomButton = ({
  title,
  handlerClick,
  styleProps,
}: CustomButtonProps) => {
  return (
    <div className={style.container}>
      <button style={styleProps} onClick={() => handlerClick()}>
        {title === 'Sign out' && <img src={signOut} />}
        {title !== 'Sign out' && title}
      </button>
    </div>
  );
};

export default CustomButton;
