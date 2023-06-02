import React from 'react';
import s from './index.module.sass';
import {useForm} from "react-hook-form";
import Button from "../Button";
import {useTodos} from "../../modules/TodosContext";

interface AddEditFormProps {
  onSubmit: (data: AddEditValues) => void
  title: string
  values?: AddEditValues
}
export interface AddEditValues {
  todoText: string
  date: string,
  time: string,
  project: string
}
const AddEditForm = ({onSubmit, title, values= {date: '', project: '', todoText: '', time: ''}}:AddEditFormProps) => {
  const {handleSubmit, register, formState:{errors}} = useForm<AddEditValues>({
    values: values,
    mode: "onChange"
  })
  const {projects} = useTodos()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.addEditForm}>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          {...register('todoText', {
            required: {value: true, message: 'TodoItem text is required'}
          })}
        />
        {(errors.todoText) ? <p className={s.error}>{errors.todoText.message}</p> : null}
      </div>
      <div>
        <input
          type="date"
          {...register('date', {
            required: {value: true, message: 'Date is required'}
          })}
        />
        {(errors.date) ? <p className={s.error}>{errors.date.message}</p> : null}
      </div>
      <div>
        <input
          type="time"
          {...register('time', {
            required: {value: true, message: 'Time is required'}
          })}
        />
        {(errors.time) ? <p className={s.error}>{errors.time.message}</p> : null}
      </div>
      <div className={s.choseProject}>
        <p className={s.choseProjectTitle}>Chose project</p>
        <div className={s.projects}>
          {projects.map(project => (
            <div key={project.id}>
              <input
                type="radio"
                id={project.id}
                value={project.name}
                {...register('project', {
                  required: {value: true, message: 'Project is required'}
                })}
              />
              <label htmlFor={project.id}>{project.name}</label>
            </div>
          ))}
        </div>
        {(errors.project) ? <p className={s.error}>{errors.project.message}</p> : null}
      </div>
      <Button btnText={'Submit'} type={'submit'}/>
    </form>
  );
};

export default AddEditForm;