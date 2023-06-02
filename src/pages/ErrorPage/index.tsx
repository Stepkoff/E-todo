import React from 'react';
import s from './index.module.sass';
import {Link} from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={s.errorPage}>
      <div className={s.message}>Error 404 page not found</div>
      <Link to={'/'}>Back to main page</Link>
    </div>
  );
};

export default ErrorPage;