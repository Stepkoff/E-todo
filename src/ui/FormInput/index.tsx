import React from 'react';
import s from './index.module.sass';
import {nanoid} from "nanoid";

interface formInputProps {
  label: string
  field: any
  errorMessage?: string
  type: 'password' | 'text'
}
const FormInput = ({label, field, errorMessage, type}: formInputProps) => {
  const id = nanoid()
  return (
    <div className={s.formInput}>
      <input id={id} type={type} placeholder={' '} {...field}/>
      <label htmlFor={id}>{label}</label>
      {errorMessage && <div className={s.error}>{errorMessage}</div>}
    </div>
  );
};

export default FormInput;