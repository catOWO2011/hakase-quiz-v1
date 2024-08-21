import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import QuizCreatorPage from "./pages/QuizCreatorPage";
import { quizLoader } from "./routes/quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      { index: true, element: <Home /> },
      { 
        path: 'quizzes/:quizId/edit',
        element: <QuizCreatorPage />,
        loader: quizLoader
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App
