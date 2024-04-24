import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import './scripts/Router';
import Home from './pages/home';
import Project from './pages/project';
import ErrorPage from './pages/error';

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/project",
        element: <Project />
    }
]);