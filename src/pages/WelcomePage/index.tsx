import {Link} from "react-router-dom";
import React from "react";
import s from './index.module.sass';
import Button from "../../ui/Button";

const WelcomePage = () => {
  return(
    <div className={s.welcomePage}>
      <div className={s.welcome}>
        <h2 className={s.welcome__title}>Welcome to ETodo</h2>
        <div className={s.welcome__links}>
          <Link to={'/signIn'}><Button btnText={'Get Started'}/></Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage