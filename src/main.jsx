import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import QuizCreatorPage from './pages/QuizCreatorPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { index: true, element: <Home /> },
      { path: 'edit-quizz/:id', element: <QuizCreatorPage /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
