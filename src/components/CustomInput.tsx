import { CustomInputProps } from '../types';
import style from '../styles/CustomInput.module.css';

const CustomInput = ({
  type,
  placeholder,
  value,
  setValue,
  error,
}: CustomInputProps) => {
  return (
    <>
      <div className={style.container}>
        {type !== 'textArea' ? (
          <input
            className={error?.status ? style.inputError : ''}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={type}
            placeholder={placeholder}
          />
        ) : (
          <textarea
            className={error?.status ? style.inputError : ''}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />
        )}

        <p className={style.errorMessage}>{error?.message}</p>
      </div>
    </>
  );
};

export default CustomInput;
