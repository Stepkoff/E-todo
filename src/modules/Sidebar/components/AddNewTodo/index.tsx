import React, {useState} from 'react';
import Button from "../../../../ui/Button";
import Modal from "../../../../ui/Modal/index.module";
import AddEditForm, {AddEditValues} from "../../../../ui/AddEditForm";
import {nanoid} from "nanoid";
import {doc, setDoc} from "firebase/firestore";
import {firebaseAuth, firebaseDB} from "../../../../App/firebaseConfig";
import moment from "moment";

function getDayOfWeek(dateString: string) {
  const dayOfWeek = moment(dateString, "YYYY.MM.DD").day();
  return dayOfWeek.toString();
}

const AddNewTodo = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const currentUser = firebaseAuth.currentUser
  const onFormSubmit = (data: AddEditValues) => {
    const id = nanoid()
    setDoc(doc(firebaseDB, `${currentUser?.uid}-todos`, id), {
      id: id,
      text: data.todoText,
      time: data.time,
      date: moment(data.date, "YYYY.MM.DD").format("DD-MM-YYYY"),
      day: getDayOfWeek(data.date),
      checked: false,
      project: data.project
    })
      .then(() => {
        setModalOpened(false)
      })
  }
  return (
    <div>
      <Button onClick={() => setModalOpened(true)} fullWidth btnText={'Add new todo'}/>
      <Modal isOpened={modalOpened} onClose={() => setModalOpened(false)}>
        <AddEditForm
          onSubmit={onFormSubmit}
          title={'Add new todo'}
        />
      </Modal>
    </div>
  );
};

export default AddNewTodo;