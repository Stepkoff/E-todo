import s from './index.module.sass';
import {Todo} from '../../App/Types'
import { AiOutlineDelete } from 'react-icons/ai';
import {FiRepeat} from 'react-icons/fi';
import {BsCircle, BsFillCheckCircleFill} from "react-icons/bs";
import {RiEdit2Fill} from "react-icons/ri";
import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {firebaseDB} from "../../App/firebaseConfig";
import {useAuth} from "../../modules/AuthUser";
import moment from "moment";
import {useEditTodo} from "../../modules/EditTodoContext";

interface TodoProps  {
 todo: Todo
}
const TodoItem = ({todo}: TodoProps) => {
  const {setEditTodo} = useEditTodo()
  const {currentUser} = useAuth()
  const deleteTodo = () => {
    deleteDoc(doc(firebaseDB, `${currentUser?.uid}-todos`, todo.id));
  }
  const handleCheckTodo = () => {
    const ref = doc(firebaseDB, `${currentUser?.uid}-todos`, todo.id)
    updateDoc(ref, {
      checked: !todo.checked
    })
  }
  const handleRepeatNextDay = () => {
    const nextDay = moment(todo.date, 'DD-MM-YYYY').add(1, 'day')
    const ref = doc(firebaseDB, `${currentUser?.uid}-todos`, todo.id)
    updateDoc(ref, {
      checked: false,
      date: nextDay.format('DD-MM-YYYY'),
      day: nextDay.format('d')
    })
  }
  return (
    <div className={s.todoItem}>
      <div
        className={todo.checked ? `${s.container} ${s.done}` : s.container}
      >
        <button className={s.check}>
          {todo.checked ?
            <BsFillCheckCircleFill size={25} onClick={handleCheckTodo}/>
            :
            <BsCircle onClick={handleCheckTodo} size={25}/>
          }
        </button>
        <div className={s.text} onClick={() => setEditTodo(todo)}>
          <p className={s.title}>{todo.text}</p>
          <span className={s.subtitle}>{todo.time} - {todo.project}</span>
        </div>
        {todo.checked ?
          <>
            <button onClick={handleRepeatNextDay} className={s.repeat}><FiRepeat size={25}/></button>
            <button onClick={deleteTodo} className={s.delete}><AiOutlineDelete size={25}/></button>
          </>
          :
          <button onClick={() => setEditTodo(todo)} className={s.edit}><RiEdit2Fill size={25}/></button>
        }
      </div>
    </div>
  );
};

export default TodoItem;