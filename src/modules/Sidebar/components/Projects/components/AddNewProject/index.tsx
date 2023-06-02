import React, {useState} from 'react';
import {BsPlusCircle} from "react-icons/bs";
import Modal from "../../../../../../ui/Modal/index.module";
import ProjectForm from "../ProjectForm";
import {nanoid} from "nanoid";
import {doc, setDoc} from "firebase/firestore";
import {firebaseAuth, firebaseDB} from "../../../../../../App/firebaseConfig";
import {collection, where, query, getDocs} from "firebase/firestore";

const AddNewProject = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const currentUser = firebaseAuth.currentUser

  const onSubmit = (data: {projectName: string}) => {
    setErrorMessage('')
    const projectName = data.projectName.charAt(0).toUpperCase() + data.projectName.slice(1)
    const ref = collection(firebaseDB, `${currentUser?.uid}-projects`);
    const q = query(ref, where('name', '==', projectName))
    getDocs(q)
      .then(querySnapshot => {
        if(querySnapshot.empty) {
          const id = nanoid()
          setDoc(doc(firebaseDB, `${currentUser?.uid}-projects`, id), {
            id: id, name: projectName
          })
            .then(() => {
              setModalOpened(false)
            })
        } else {
          setErrorMessage('Project with this name already exists')
        }
      })
  }
  const openModal = () => {
    setModalOpened(true)
    setErrorMessage('')
  }
  return (
    <>
      <button onClick={openModal}>
        <BsPlusCircle size={20}/>
      </button>
      <Modal isOpened={modalOpened} onClose={()=> setModalOpened(false)}>
        <ProjectForm title={'New Project'} onSubmit={onSubmit} errorMessage={errorMessage}/>
      </Modal>
    </>

  );
};

export default AddNewProject;