import React from 'react';
import s from './index.module.sass';
import {firebaseAuth} from "../../../../App/firebaseConfig";

const UserProfile = () => {
  const currentUser = firebaseAuth.currentUser
  if(!currentUser) return null
  return (
    <div className={s.userProfile}>
      <div className={s.image}>
        <img src={currentUser.photoURL!} alt=""/>
      </div>
      <div className={s.content}>
        <p className={s.name}>{currentUser?.displayName}</p>
      </div>
    </div>
  );
};

export default UserProfile;