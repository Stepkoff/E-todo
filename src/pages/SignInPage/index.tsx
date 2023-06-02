import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import s from './index.module.sass';
import Button from "../../ui/Button";
import {useForm, Controller} from "react-hook-form";
import FormInput from "../../ui/FormInput";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {firebaseAuth} from "../../App/firebaseConfig";
import LoadingSpinner from "../../ui/LoadingSpinner";

interface Values {
  email: string
  password: string
}

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const {handleSubmit, formState: {errors}, control} = useForm<Values>({
    values: {
      email: '',
      password: '',
    },
    mode: "onChange"
  })
  const onSubmit = async (data: Values) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      await signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
      setIsLoading(false)
      navigate('/');
    } catch (e) {
      switch ((e as Error).message) {
        case 'Firebase: Error (auth/user-not-found).':
          setErrorMessage('User is not found')
          break;
        case 'Firebase: Error (auth/wrong-password).':
          setErrorMessage('Wrong password')
          break;
        default:
          setErrorMessage('Something went wrong')
      }
    }
    setIsLoading(false)
  }
  return (
    <div className={s.SingInPage}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete={'off'}>
        <div className={s.logo}>ETodo</div>
        <div className={s.title}>Login</div>
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
          rules={{required: {value: true, message: 'Password is required'}}}
          control={control}
          render={({field}) => <FormInput type={'password'} label={'Password'} field={field} errorMessage={errors.password?.message} />}
          name={'password'}
        />
        <Button btnText={'Login'} fullWidth={true} type={'submit'}/>
        <div className={s.registerLink}>New to ETodo? <Link to={'/signup'}>Join now</Link></div>
        {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
      </form>
      {isLoading && <LoadingSpinner/>}
    </div>
  );
};
export default SignInPage;