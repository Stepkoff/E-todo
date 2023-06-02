import {nanoid} from "nanoid";
import s from './index.module.sass';
import addAvatar from '../../assets/images/addAvatar.png'

interface formInputFileProps {
  label: string
  field: {
    name: string
    ref: any
    onChange: (value: any) => void
  }
  errorMessage?: string
  fileText: string | undefined
}
const FormInputFile = ({errorMessage, label, fileText, field}: formInputFileProps) => {
  const id = nanoid();
  return (
    <div className={s.formInputFile}>
      <input
        ref={field.ref}
        name={field.name}
        onChange={(e) => {
          if(e.target.files?.length) {
            field.onChange(e.target.files[0])
          }
        }}
        id={id}
        type="file"
      />
      <label htmlFor={id}>
        <img src={addAvatar} alt="add Avatar image"/>
        {fileText ?
          <p>{fileText}</p>
          :
          <p>{label}</p>
        }
      </label>
      {errorMessage && <div className={s.error}>{errorMessage}</div>}
    </div>
  );
};
export default FormInputFile;