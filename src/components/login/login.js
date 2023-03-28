import React,{useState} from "react"
import "./login.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"
const Login = () => {
    let navigate = useNavigate()
    const [user, setUser] = useState(
        {
            name: "",
            email: "",
            password: "",
            reEnterPassword: ""
        }
    )
    const handleChange = event => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () =>{
        axios.post("http://localhost:9200/login", user).then((res) => {console.log(res);alert(res.data.message);
        localStorage.setItem('id', res.data.user.email)
        localStorage.setItem('deets',res.data.user)
        navigate('/Dashboard')
    })
    }
    return (
        <div className="login form text-center bd-white">
            <h1 className="text-white display-4 text-center">Login</h1>
            <div className="col-md-6 mx-auto">
            <input className="form-control" type="text" name="email" value={user.email} placeholder = "Enter your mail" onChange={handleChange}></input>
            <input className="form-control" type="password" name="password" value={user.password} placeholder="Enter your password" onChange={handleChange}></input>
            <button className="btn btn-success" onClick={login}>Login</button>
            <div className="text-white">or</div>
            <button className="btn btn-success" onClick = {()=> navigate("/register")}>Register</button>

            </div>
            
            
        </div>
    )
    

}
export default Login