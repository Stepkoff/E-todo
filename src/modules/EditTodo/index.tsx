import React from 'react';
import s from './index.module.sass';
import AddEditForm, {AddEditValues} from "../../ui/AddEditForm";
import {useEditTodo} from "../EditTodoContext";
import moment from "moment";
import {doc, updateDoc} from "firebase/firestore";
import {firebaseDB} from "../../App/firebaseConfig";
import {useAuth} from "../AuthUser";

const EditTodo = () => {
  const {editTodo, setEditTodo} = useEditTodo();
  const {currentUser} = useAuth();
  if(!editTodo) return null

  const submitForm = (data: AddEditValues) => {
    const newDate = moment(data.date, "YYYY-MM-DD").format('DD-MM-YYYY');
    const newDay = moment(data.date, 'YYYY-MM-DD').format('d')
    const ref = doc(firebaseDB, `${currentUser?.uid}-todos`, editTodo.id)
    updateDoc(ref, {
      text: data.todoText,
      date: newDate,
      day: newDay,
      project: data.project,
      time: data.time
    })
      .then(() => {
        setEditTodo(null)
      })
  }

  return (
    <div className={s.editTodo}>
      <div className={s.content}>
        <AddEditForm
          values={{
            date: moment(editTodo.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
            todoText: editTodo.text,
            time: editTodo.time,
            project: editTodo.project
        }}
          onSubmit={submitForm}
          title={'Edit TodoItem'}
        />
      </div>
      <div onClick={()=> setEditTodo(null)} className={s.overlay}></div>
    </div>
  );
};

export default EditTodo;