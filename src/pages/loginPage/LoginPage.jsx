import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import "./loginPage.scss"

const LoginPage = () => {

    const [inputs, setInputs] = useState({
        username : "",
        password : "",
    });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    const {login} = useContext(AuthContext);
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await login(inputs);
            navigate("/");
        }catch(err){
            setErr(err.response.data);
        }
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
                        <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        {err && <span style={{color: "red"}}>{err}</span>}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage