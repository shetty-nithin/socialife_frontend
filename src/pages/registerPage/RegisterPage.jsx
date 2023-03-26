import { useState } from "react"
import { Link } from "react-router-dom"
import "./registerPage.scss"
import axios from "axios";

const RegisterPage = () => {
    
    const [inputs, setInputs] = useState({
        username : "",
        email : "",
        password : "",
        name : "",
    });
    const [err, setErr] = useState(null);
    
    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/register", inputs);
        }catch(err){
            setErr(err.response.data);    
        }
    }

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
                        <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage