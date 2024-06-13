import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import QuizCreatorPage from "./pages/QuizCreatorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      { index: true, element: <Home /> },
      { path: 'edit-quizz/:id', element: <QuizCreatorPage /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App
