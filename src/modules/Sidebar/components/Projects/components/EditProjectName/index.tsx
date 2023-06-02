import React, {useState} from 'react';
import {BsPencil} from "react-icons/bs";
import Modal from "../../../../../../ui/Modal/index.module";
import ProjectForm from "../ProjectForm";
import {collection, query, where, updateDoc, doc, getDocs} from "firebase/firestore";
import {firebaseDB} from "../../../../../../App/firebaseConfig";
import {useAuth} from "../../../../../AuthUser";

interface EditProjectNameProps {
  projectName: string
  id: string
}

const EditProjectName = ({projectName, id}:EditProjectNameProps) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const {currentUser} = useAuth()

  const handleSubmit = (data: {projectName: string}) => {
    const newProjName = data.projectName.charAt(0).toUpperCase() + data.projectName.slice(1);
    const refProjects = collection(firebaseDB, `${currentUser?.uid}-projects`)
    const queryProjects = query(refProjects, where('name', '==', newProjName))
    getDocs(queryProjects)
      .then(querySnapshot=> {
        if(querySnapshot.empty) {
          updateDoc(doc(refProjects, id), {
            name: newProjName
          })
            .then(() => {
              const refTodos = collection(firebaseDB, `${currentUser?.uid}-todos`)
              const q = query(refTodos, where('project', '==', projectName));
              getDocs(q)
                .then(querySnapshot => {
                  querySnapshot.forEach(item => {
                    updateDoc(item.ref, {
                      project: newProjName
                    })
                  })
                })
              setModalOpened(false)
            })
        } else {
          setErrorMessage('This project name is already exists')
        }
      })
  }
  const handleOpenModal = () => {
    setErrorMessage('')
    setModalOpened(true)
  }

  return (
    <>
      <button onClick={handleOpenModal}><BsPencil size={18}/></button>
      <Modal isOpened={modalOpened} onClose={()=> setModalOpened(false)}>
        <ProjectForm errorMessage={errorMessage} onSubmit={handleSubmit} title={'Change project name'} values={{projectName: projectName}}/>
      </Modal>
    </>
  );
};

export default EditProjectName;