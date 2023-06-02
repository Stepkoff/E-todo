import React from 'react';
import s from './index.module.sass';
import {useForm} from "react-hook-form";
import Button from "../../../../../../ui/Button";

interface ProjectFormProps {
  onSubmit: (data: {projectName: string}) => void
  title: string
  values?: {projectName: string}
  errorMessage?: string
}
const ProjectForm = ({onSubmit, title, values = {projectName: ''}, errorMessage}:ProjectFormProps) => {
  const {register, handleSubmit, formState:{errors}} = useForm({
    values: values,
    mode: "onChange"
  })
  return (
    <form className={s.projectForm} onSubmit={handleSubmit(onSubmit)}>
      <h3>{title}</h3>
      <input
        type="text"
        {...register('projectName', {
          required: {value: true, message: 'Project name is required'}
        })}
      />
      {errors.projectName?.message ? <p className={s.error}>{errors.projectName.message}</p> : null}
      {errorMessage && <p className={s.error}>{errorMessage}</p>}
      <Button btnText={'Submit'}/>
    </form>
  );
};

export default ProjectForm;