import './globalStyles/App.sass';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ErrorPage from "../pages/ErrorPage";
import {useAuth} from "../modules/AuthUser";
import LoadingSpinner from "../ui/LoadingSpinner";
import WelcomePage from "../pages/WelcomePage";
import Layout from "./Layout";
import TodosPage from "../pages/TodosPage";

const Protected = ({children} : {children: JSX.Element}) => {
  const {isLoading, currentUser} =  useAuth()
  if(currentUser) return children
  if(isLoading) return <LoadingSpinner/>
  return <WelcomePage/>
}

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Protected>
          <Layout/>
        </Protected>
      ),
      children: [
        {
          path: '/',
          element: <TodosPage/>
        },
      ]
    },
    {
      path: '/signIn',
      element: <SignInPage/>
    },
    {
      path: '/signUp',
      element: <SignUpPage/>
    },
    {
      path: '*',
      element: <ErrorPage/>
    }
  ])
  return (
    <div className={'wrapper'}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;