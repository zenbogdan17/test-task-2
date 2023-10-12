export interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string | number;
  setValue: (value: string) => void;
}

export interface CustomButtonProps {
  title: string;
  handlerClick: (id?: string) => void;
  styleProps?: {};
}

export interface ModuleProps {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
}
