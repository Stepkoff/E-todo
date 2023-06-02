import React from 'react';
import s from './index.module.sass';
import TodoItem from "../../ui/TodoItem";
import {useTodos} from "../TodosContext";

interface TodosProps {
  title: string
}
const Todos = ({title}:TodosProps) => {
  const {todos} = useTodos()
  return (
    <div className={s.Todos}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.todoItems}>
        {
          todos.map((item) => (
            <TodoItem key={item.id}  todo={item}/>
          ))
        }
      </div>
    </div>
  );
};

export default Todos;