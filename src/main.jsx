
import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/Login.jsx';
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Signup from './pages/Signup.jsx';
import Post from './pages/Post.jsx';
import Question from './pages/Question.jsx';
import AllUsers from './components/AllUsers.jsx';
import Admin from './pages/Admin.jsx';
import VerifyAnswer from './components/Verify-Answer.jsx';
import Home from './pages/Home.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children :[
      {
        path : "",
        element :<Home/> 
      },
      {
        path: "login",
        element:<Login/>
      },
      {
        path : "signup",
        element :<Signup/>
      },
      {
        path : "new-post",
        element: <Post/>,
        
      },
      {
        path : "question/:id",
        element : <Question/>
      },
      {
        path : "*",
        element : <h1>404 Not Found</h1>
      },
      {
        path : "admin",
        element : <Admin/>,
        children :[
          {
            path : "all-users",
            element : <AllUsers/>
          },
          {
            path : "verify-answer",
            element : <VerifyAnswer/>
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
