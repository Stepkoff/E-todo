import React from 'react';
import s from './index.module.sass';
import Todos from '../../modules/Todos';
import Next7Days from "../../modules/Next7Days";
import {SelectedProjectType, useTodos} from "../../modules/TodosContext";

const TodosPage = () => {
  const {todos, selectedProject} = useTodos();

  return (
    <div className={s.todosPage}>
      {
        selectedProject === 'Next 7 days' as SelectedProjectType ?
          <Next7Days todos={todos}/>
          :
          <Todos title={selectedProject}/>
      }
    </div>
  );
};

export default TodosPage;