import { Link } from "react-router-dom"
import "./registerPage.scss"

const RegisterPage = () => {
    return (
        <div className="registerPage">
            <div className="card">
                <div className="left">
                    <h1>Small World.</h1>
                    <p>Welcome to our social network! Our platform offers you the chance to connect with others and make meaningful relationships with people around the world. Sign up now to join millions of other users who are sharing, collaborating, and having fun. </p>
                    <span>have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Username"/>
                        <input type="email" placeholder="Emial"/>
                        <input type="password" placeholder="Password"/>
                        <input type="text" placeholder="Name"/>
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage