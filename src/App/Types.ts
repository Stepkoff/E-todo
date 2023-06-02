export interface Project {
  id: string
  name: string
  numberOfTodos: number
}

export interface Todo {
  id: string,
  text: string,
  time: string,
  date: string,
  day: string,
  checked: boolean,
  project: string
}