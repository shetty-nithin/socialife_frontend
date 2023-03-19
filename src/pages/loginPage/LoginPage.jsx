import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import "./loginPage.scss"

const LoginPage = () => {

    const {login} = useContext(AuthContext);
    const handleLogin = () => {
        login();
    }

    return (
        <div className="loginPage">
            <div className="card">
                <div className="left">
                    <h1>Explore sociaLife</h1>
                    <p>Welcome back to our social network! We’re glad you’re here and we’re excited to help you stay connected with friends and family. Login now to share photos and videos, find friends, and collaborate with others. </p>
                    <span>Dont have an account?</span>
                    <Link to="/register">
                         <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage