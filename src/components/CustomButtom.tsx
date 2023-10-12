import { CustomButtomProps } from '../types';
import style from '../styles/CustomButtom.module.css';

const CustomButtom = ({
  title,
  handlerClick,
  styleProps,
}: CustomButtomProps) => {
  return (
    <div className={style.container}>
      <button style={styleProps} onClick={() => handlerClick()}>
        {title}
      </button>
    </div>
  );
};

export default CustomButtom;
