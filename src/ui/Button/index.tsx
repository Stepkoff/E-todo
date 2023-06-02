import React from 'react';
import s from './index.module.sass';

interface buttonProps {
  btnText: string
  onClick?: () => void
  fullWidth?: boolean
  type?: "submit" | "button" | "reset" | undefined
}

const Button = ({btnText, onClick, fullWidth, type}:buttonProps) => {
  return (
    <button
      type={type}
      className={`${s.btn} ${fullWidth && s.fullWidth}`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;