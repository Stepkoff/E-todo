import React, {useState} from 'react';
import s from './index.module.sass';
import Button from "../../ui/Button";
import {signOut} from 'firebase/auth';
import {firebaseAuth} from "../../App/firebaseConfig";
import {GiHamburgerMenu} from "react-icons/gi";
import UserProfile from "./components/UserProfile";
import AddNewTodo from "./components/AddNewTodo";
import Calendar from "./components/Calendar";
import Projects from "./components/Projects";

const Sidebar = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  return (
    <div className={`${s.sidebar} ${sidebarOpened ? s.sidebarOpened : ''}`}>
      <div className={s.content}>
        <button className={s.sidebarBurgerBtn} onClick={()=> setSidebarOpened(prev=> !prev)}>
          <GiHamburgerMenu size={30}/>
        </button>
        <header className={s.header}>
          <UserProfile/>
        </header>
        <AddNewTodo/>
        <Calendar/>
        <Projects/>
        <div className={s.logout}>
          <Button fullWidth onClick={() => signOut(firebaseAuth)} btnText={'Logout'}/>
        </div>
      </div>
      {sidebarOpened && <div onClick={()=> setSidebarOpened(false)} className={s.overlay}></div>}
    </div>
  );
};

export default Sidebar