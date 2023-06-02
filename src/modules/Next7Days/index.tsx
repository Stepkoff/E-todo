import React, {useEffect, useState} from 'react';
import s from './index.module.sass';
import {Todo} from "../../App/Types";
import moment from "moment";
import TodoItem from "../../ui/TodoItem";

const days = ['0', '1', '2', '3', '4', '5', '6'];
interface Day {
  todos: Todo[]
  number: string
}
interface Next7DaysProps {
  todos: Todo[]
}
const Next7Days = ({todos}:Next7DaysProps) => {
  const [weekTodos, setWeekTodos] = useState<Day[]>([]);
  useEffect(()=>{
    const sortedTodosByDay = days.map(day => {
      return {
        todos: todos.filter(todo => todo.day === day),
        number: day
      }
    });
    const today = parseInt(moment().format('d'))
    const arrangeDays = sortedTodosByDay.slice(today).concat(sortedTodosByDay.slice(0, today));
    setWeekTodos(arrangeDays)

  }, [todos])

  return (
    <div className={s.next7days}>
      <h2 className={s.title}>Next 7 days</h2>
      <div className={s.todos}>
        {weekTodos.map(item => (
          <div className={s.todos__item} key={item.number}>
            <div className={s.day}>
              <div className={s.name}>
                {moment(item.number, 'd').format('dddd')}
                {item.number === moment().format('d') && ` (Today)` }
              </div>
              <div className={s.totalTodos}>
                ({item.todos.length})
              </div>
            </div>

            <div className={s.dayTodos}>
              {item.todos.map((item) => (
                <TodoItem key={item.id} todo={item}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Next7Days;