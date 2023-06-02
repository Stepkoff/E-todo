import React, {useState} from 'react';
import s from './index.module.sass';
import {BsCalendarDate} from 'react-icons/bs';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi';
import {SelectedProjectType, useTodos} from "../../../TodosContext";

const Calendar = () => {
  const [isOpened, setIsOpened] = useState(true)
  const calendarItems = ['Today', 'Next 7 days', 'All days'];
  const {setSelectedProject} = useTodos()
  return (
    <div className={s.calendar}>
      <header className={s.header}>
        <BsCalendarDate size={20}/>
        <span className={s.header__title}>Calendar</span>
        <button onClick={()=> setIsOpened(prev=>!prev)} className={s.header__btn}>
          {isOpened ? <BiUpArrow size={20}/> : <BiDownArrow size={20}/> }
        </button>
      </header>
      <div className={isOpened ? s.content : s.contentHidden}>
        {calendarItems.map((item, id) => (
          <button onClick={()=> setSelectedProject(item as SelectedProjectType)} className={s.content__btn} key={id}>{item}</button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;