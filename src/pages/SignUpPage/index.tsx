import s from './index.module.sass';
import Button from "../../ui/Button";
import {Link, useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import FormInput from "../../ui/FormInput";
import FormInputFile from "../../ui/FormInputFile";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {useState} from "react";
import {firebaseAuth, firebaseDB, firebaseStorage} from "../../App/firebaseConfig";
import LoadingSpinner from "../../ui/LoadingSpinner";
import {doc, setDoc} from 'firebase/firestore';
import {nanoid} from "nanoid";
import moment from "moment/moment";

interface Values {
  userName: string
  email: string
  password: string
  confirmPassword: string
  avatar: File | undefined
}
const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {handleSubmit, control, formState: {errors}, getValues} = useForm<Values>({
    values: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: undefined
    },
    mode: "onChange"
  })
  const onSubmit = async (data: Values) => {
    setIsLoading(true)
    setErrorMessage('');
    try {
      const userResponse = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
      const storageRef = ref(firebaseStorage, userResponse.user.uid);
      uploadBytes(storageRef, data.avatar as File)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then( async (downloadUrl) => {
              await updateProfile(userResponse.user, {
                photoURL: downloadUrl,
                displayName: data.userName.toLowerCase()
              })
              const id1 = nanoid()
              await setDoc(doc(firebaseDB, `${userResponse.user.uid}-todos`, id1), {
                id: id1,
                text: 'Todo sample 1',
                time: '14:06',
                date: moment(new Date()).format('DD-MM-YYYY'),
                day: moment( new Date(), 'DD-MM-YYYY').day().toString(),
                checked: false,
                project: 'Personal'
              })
              const id2 = nanoid()
              await setDoc(doc(firebaseDB, `${userResponse.user.uid}-todos`, id2), {
                id: id2,
                text: 'Todo sample 2',
                time: '08:50',
                date: moment(new Date()).format('DD-MM-YYYY'),
                day: moment( new Date(), 'DD-MM-YYYY').day().toString(),
                checked: false,
                project: 'Work'
              })
              const id3 = nanoid()
              await setDoc(doc(firebaseDB, `${userResponse.user.uid}-projects`, id3), {
                id: id3, name: 'Work'
              })
              const id4 = nanoid()
              await setDoc(doc(firebaseDB, `${userResponse.user.uid}-projects`, id4), {
                id: id4, name: 'Personal'
              })
              setErrorMessage('');
              setIsLoading(false);
              navigate('/')
            })
        });

    } catch (e) {
      switch ((e as Error).message) {
        case 'Firebase: Error (auth/invalid-email).':
          setErrorMessage('Email address is invalid')
          break;
        case 'Firebase: Error (auth/email-already-in-use).':
          setErrorMessage('This email is already exists');
          break;
        default:
          setErrorMessage('Something went wrong')
      }
      setIsLoading(false)
    }
  }
  return (
    <div className={s.SignUpPage}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.logo}>ETodo</div>
        <div className={s.title}>Register</div>
        <Controller
          rules={{
            required: {value: true, message: 'Username is required'},
            pattern: {value: /^[a-zA-Z][a-zA-Z0-9]{4,23}$/, message: 'Username should be 4-24 characters'}
          }}
          control={control}
          render={({field}) => <FormInput type={'text'} label={'Username'} field={field} errorMessage={errors.userName?.message}/>}
          name={'userName'}
        />
        <Controller
          rules={{
            required: {value: true, message: 'Email is required'},
            pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Should be a valid email address'}
          }}
          control={control}
          render={({field}) => <FormInput type={'text'} label={'Email'} field={field} errorMessage={errors.email?.message}/>}
          name={'email'}
        />
        <Controller
          rules={{
            required: {value: true, message: 'Password is required'},
            pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{8,}$/, message: 'Password should be at least 8 characters and include 1 big letter and 1 number'}
          }}
          control={control}
          render={({field}) => <FormInput label={'Password'} type={'password'} field={field} errorMessage={errors.password?.message}/>}
          name={'password'}
        />
        <Controller
          rules={{
            required: {value: true, message: 'Confirm your password please'},
            validate: {value: (value) => (getValues('password') != value) ? "Password don't match" : undefined} //watch() / getValues()
          }}
          control={control}
          render={({field}) => <FormInput label={'Confirm password'} type={'password'} field={field} errorMessage={errors.confirmPassword?.message}/>}
          name={'confirmPassword'}
        />
        <Controller
          rules={{
            required: {value: true, message: 'Avatar is required'},
          }}
          control={control}
          render={({field}) => <FormInputFile field={field} fileText={getValues('avatar')?.name} label={'add Avatar'} errorMessage={errors.avatar?.message}/>}
          name={'avatar'}
        />
        <Button btnText={'Register'} type={'submit'} fullWidth={true}/>
        <div className={s.registerLink}>Already on ETodo ? <Link to={'/signIn'}>Login</Link></div>
        {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
      </form>
      {isLoading && <LoadingSpinner/>}
    </div>
  );
};

export default SignUpPage;