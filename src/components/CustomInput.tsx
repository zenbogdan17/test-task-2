import { CustomInputProps } from '../types';
import style from '../styles/CustomInput.module.css';

const CustomInput = ({
  type,
  placeholder,
  value,
  setValue,
}: CustomInputProps) => {
  return (
    <>
      <div className={style.container}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default CustomInput;
