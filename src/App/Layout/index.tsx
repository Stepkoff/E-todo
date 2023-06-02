import {Outlet} from "react-router-dom";
import React from "react";
import s from './index.module.sass';
import Sidebar from "../../modules/Sidebar";
import EditTodo from "../../modules/EditTodo";
import {TodosProvider} from "../../modules/TodosContext";
import {EditTodoProvider} from "../../modules/EditTodoContext";

const Layout = () => {
  return (
    <TodosProvider>
      <EditTodoProvider>
        <div className={s.layout}>
          <Sidebar/>
          <main className={s.main}>
            <Outlet/>
          </main>
          <EditTodo/>
        </div>
      </EditTodoProvider>
    </TodosProvider>
  )
}

export default Layout