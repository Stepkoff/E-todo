import {Todo} from "../../App/Types";
import {useEffect, useState} from "react";
import moment from "moment";
import {SelectedProjectType} from "../../modules/TodosContext";

export const useFilterTodos = (todos: Todo[], selectedProj: SelectedProjectType) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    let data
    const todayDayFormated = moment().format('DD-MM-YYYY');
    if(selectedProj === 'Today') {
      data = todos.filter(item => item.date === todayDayFormated)
    } else if(selectedProj === 'Next 7 days') {
      data = todos.filter(todo => {
        const todoDate = moment(todo.date, 'DD-MM-YYYY')
        const todayDate = moment(todayDayFormated, 'DD-MM-YYYY')
        const diffDays = todoDate.diff(todayDate, 'days')
        return diffDays >= 0 && diffDays < 7
      })
    } else if(selectedProj === 'All days') {
      data = todos
    } else {
      data = todos.filter(item => item.project === selectedProj)
    }

    setFilteredTodos(data)
  }, [todos, selectedProj])
  return {filteredTodos}
}