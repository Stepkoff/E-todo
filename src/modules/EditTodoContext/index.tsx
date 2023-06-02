import React, {createContext, useContext, useState} from "react";
import {Todo} from "../../App/Types";

interface EditTodoContextType {
  editTodo: Todo | null
  setEditTodo: any
}
const EditTodoContext = createContext<EditTodoContextType>({
  editTodo: null,
  setEditTodo: () => {}
})

export const EditTodoProvider = ({children}: {children: React.ReactNode}) => {
  const [editTodo, setEditTodo] = useState<Todo | null>(null)

  return <EditTodoContext.Provider value={{editTodo, setEditTodo}}>
    {children}
  </EditTodoContext.Provider>
}

export const useEditTodo = () => useContext(EditTodoContext)