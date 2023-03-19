import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import { createBrowserRouter, RouterProvider, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar"
import HomePage from "./pages/homePage/HomePage";
import UserProfilePage from "./pages/userProfilePage/UserProfilePage";
import "./style.scss"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

function App() {
  const {currentUser} = useContext(AuthContext);
  const {darkMode} = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar/>
        <div style={{display: "flex"}}>
          <Leftbar/>
          <div style={{flex: 6}}>
            <Outlet/>
          </div>
          <Rightbar/>
        </div>
      </div>
    )
  };

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      // if the user is not logged in, then login page will render.
      return <Navigate to="/login"/> 
    }
    // else homepage of the user account will render.
    return children; 
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <HomePage/>,
        },
        {
          path: "/profile/:id",
          element: <UserProfilePage/>
        }
      ]
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
