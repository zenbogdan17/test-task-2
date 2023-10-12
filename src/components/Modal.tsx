import { useState } from 'react';
import style from '../styles/Modal.module.css';
import { ModuleProps } from '../types';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { addContact } from '../store/contact/contactsSlice';
import { useAppDispatch } from '../store/hooks/hook';

const AddContactModal = ({ isShowModal, setIsShowModal }: ModuleProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useAppDispatch();

  const handlerShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handlerAddConatct = () => {
    dispatch(addContact({ name, phone }));

    setName('');
    setPhone('');
    setIsShowModal(!isShowModal);
  };

  return (
    isShowModal && (
      <div className={style.modal_overlay}>
        <div className={style.modal}>
          <div className={style.closeModal}>
            <CustomButton
              title="✖️"
              handlerClick={handlerShowModal}
              styleProps={{
                backgroundColor: 'var(--dark)',
              }}
            />
          </div>

          <h3>Enter contact details</h3>

          <CustomInput
            type="text"
            placeholder="Enter name"
            value={name}
            setValue={setName}
          />

          <CustomInput
            type="text"
            placeholder="Enter phone"
            value={phone}
            setValue={setPhone}
          />

          <CustomButton title="Add" handlerClick={handlerAddConatct} />
        </div>
      </div>
    )
  );
};

export default AddContactModal;
