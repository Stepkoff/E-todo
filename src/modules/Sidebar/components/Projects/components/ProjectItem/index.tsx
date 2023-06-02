import React from 'react';
import {Project} from "../../../../../../App/Types";
import s from './index.module.sass';
import {MdDeleteOutline} from "react-icons/md";
import EditProjectName from "../EditProjectName";
import {SelectedProjectType, useTodos} from "../../../../../TodosContext";
import {useAuth} from "../../../../../AuthUser";
import {collection, query, where, getDocs, deleteDoc} from "firebase/firestore";
import {firebaseDB} from "../../../../../../App/firebaseConfig";

interface ProjectItemProps {
  project: Project
  isEditMode: boolean
}
const ProjectItem = ({project, isEditMode}:ProjectItemProps) => {
  const {setSelectedProject} = useTodos()
  const {currentUser} = useAuth()
  const handleDeleteProject = () => {
    const ref = collection(firebaseDB, `${currentUser?.uid}-todos`);
    const q = query(ref, where('project', '==', project.name));
    getDocs(q)
      .then(querySnapshot => {
        querySnapshot.forEach(item => {
          deleteDoc(item.ref)
        })
      })
      .then(() => {
        const ref = collection(firebaseDB, `${currentUser?.uid}-projects`);
        const q = query(ref, where('name', '==', project.name));
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach(item => {
              deleteDoc(item.ref)
              setSelectedProject('Today')
            })
          })
      })
  }

  return (
    <div className={s.projectItem}>
      <button onClick={()=> setSelectedProject(project.name as SelectedProjectType)} className={s.name}>{project.name}</button>
      {isEditMode ?
        <div className={s.buttons}>
          <EditProjectName id={project.id} projectName={project.name}/>
          <button onClick={handleDeleteProject}><MdDeleteOutline size={18}/></button>
        </div>
        :
        project.numberOfTodos > 0 && <div className={s.count}>{project.numberOfTodos}</div>
      }
    </div>
  );
};

export default ProjectItem;