import React, {createContext, useContext, useEffect, useState} from 'react';
import {onSnapshot, collection} from 'firebase/firestore'
import {Project, Todo} from "../../App/Types";
import {firebaseAuth, firebaseDB} from "../../App/firebaseConfig";
import {useFilterTodos} from "../../helpers/useFilterTodos";

interface TodosContextType {
  todos: Array<Todo>
  projects: Array<Project>
  selectedProject: SelectedProjectType
  setSelectedProject: React.Dispatch<React.SetStateAction<SelectedProjectType>>
}
const initialValue = {
  todos: [],
  projects: [],
  selectedProject: 'Today' as SelectedProjectType,
  setSelectedProject: () => {}
}
const TodosContext = createContext<TodosContextType>(initialValue)

const useGetTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const currentUser = firebaseAuth.currentUser
  useEffect(() => {
    const unsub = onSnapshot(collection(firebaseDB, `${currentUser?.uid}-todos`), (snapshot) => {
      const data = snapshot.docs.map(item => {
        return item.data()
      })
      setTodos(data as Todo[])
    })
    return () => {
      unsub()
    }
  }, [])
  return {todos}
}
const calculateNumberOfTodos = (projectName: string, todos: Todo[]) => {
  return todos.filter(todo => todo.project === projectName && !todo.checked).length
}
const useGetProjects = (todos:Todo[]) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const currentUser = firebaseAuth.currentUser
  useEffect(() => {
    const unsub = onSnapshot(collection(firebaseDB, `${currentUser?.uid}-projects`), (snapshot) => {
      const data = snapshot.docs.map(item => {
        const projectName = item.data().name
        return {
          ...item.data(),
          numberOfTodos: calculateNumberOfTodos(projectName, todos)
        }
      })
      setProjects(data as Project[])
    })
    return () => {
      unsub()
    }
  }, [todos])
  return {projects}
}
export type SelectedProjectType = 'Today' | 'Next 7 days' | 'All days' | 'Work' | 'Personal' | 'Other'

export const TodosProvider = ({children}:{children:React.ReactNode}) => {
  const [selectedProject, setSelectedProject] = useState<SelectedProjectType>('Today')
  const {todos} = useGetTodos()
  const {projects} = useGetProjects(todos)
  const {filteredTodos} = useFilterTodos(todos, selectedProject)
  return (
    <TodosContext.Provider value={{
      todos: filteredTodos,
      projects,
      selectedProject,
      setSelectedProject
    }}>
      {children}
    </TodosContext.Provider>
  )
}
export const useTodos = () => useContext(TodosContext)