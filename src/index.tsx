import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import {AuthUserProvider} from "./modules/AuthUser";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthUserProvider>
      <App/>
    </AuthUserProvider>
  </React.StrictMode>
);


