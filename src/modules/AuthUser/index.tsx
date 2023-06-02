import React, {createContext, useContext, useEffect, useState} from "react";
import { onAuthStateChanged} from 'firebase/auth';
import {firebaseAuth} from "../../App/firebaseConfig";

export interface CurrentUser {uid: string,email: string,displayName: string,photoUrl: string,}
interface AuthContext {currentUser: CurrentUser | null,isLoading: boolean}

const AuthUserContext = createContext<AuthContext>({
  currentUser: null,
  isLoading: true,
});
const useFirebaseAuth = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect( () => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      setIsLoading(true)
      if(!user) {
        setCurrentUser(null)
        setIsLoading(false)
        return;
      }
      setCurrentUser({
        uid: user.uid,
        email: user.email as string,
        displayName: user.displayName as string,
        photoUrl: user.photoURL as string
      })
      setIsLoading(false)
    })
    return () => {
      unsub()
    }
  }, [])
  return {currentUser, isLoading}
}
export const AuthUserProvider = ({children}: {children: React.ReactNode}) => {
  const {isLoading, currentUser} = useFirebaseAuth()
  return (
    <AuthUserContext.Provider value={{isLoading, currentUser}}>
      {children}
    </AuthUserContext.Provider>
    )
}
export const useAuth = () => useContext(AuthUserContext);