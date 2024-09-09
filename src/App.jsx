import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import QuizCreatorPage from "./pages/QuizCreatorPage";
import { quizLoader } from "./routes/quiz";
import QuizPractice from "./pages/QuizPractice";
import AuthenticationPage from "./pages/AuthenticationPage";
import { homeLoader } from "./routes/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { 
        index: true,
        element: <Home />,
        loader: homeLoader
      },
      {
        path: 'auth',
        element: <AuthenticationPage />
      },
      { 
        path: 'quizzes/:quizId/edit',
        element: <QuizCreatorPage />,
        loader: quizLoader
      },
      {
        path: 'quizzes/:quizId/practice',
        element: <QuizPractice />,
        loader: quizLoader
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App
