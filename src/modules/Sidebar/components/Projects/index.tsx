import React, {useState} from 'react';
import s from './index.module.sass';
import {BsFillPaletteFill, BsPencil} from "react-icons/bs";
import {BiDownArrow, BiUpArrow} from 'react-icons/bi';
import AddNewProject from "./components/AddNewProject";
import ProjectItem from "./components/ProjectItem";
import {useTodos} from "../../../TodosContext";

const Projects = () => {
  const [isOpened, setIsOpened] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const {projects} = useTodos()

  return (
    <div className={s.projects}>
      <header className={s.header}>
        <div className={s.header__left}>
          <BsFillPaletteFill size={20}/>
          <span className={s.title}>Projects</span>
        </div>
        <div className={s.header__buttons}>
          {isOpened &&
            <button onClick={()=> setIsEditMode(prev=> !prev)}>
              <BsPencil color={isEditMode ? 'green' : ''} size={20}/>
            </button>
          }
          <AddNewProject/>
          <button onClick={() => setIsOpened(prev=>!prev)}>
            {isOpened ? <BiUpArrow size={20}/> : <BiDownArrow size={20}/> }
          </button>
        </div>
      </header>
      <div className={isOpened ? s.content : s.contentHidden}>
        {projects.map(project => (
          <ProjectItem isEditMode={isEditMode} key={project.id} project={project}/>
        ))}
      </div>
    </div>
  );
};

export default Projects;