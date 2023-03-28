import React,{useState}from "react"
import axios from 'axios'
import "./register.css"
import { useNavigate } from "react-router-dom"

const Register = () => {
    let navigate = useNavigate()
    const[user, setUser] = useState(
        {
            name : "",
            email:"",
            password:"",
            reEnterPassword:""
        }
    )
    const handleChange = event =>{
        const {name, value} = event.target
        setUser({
            ...user,
            [name]:value
        })
    }
    const register = () => {
        const{name, email, password,reEnterPassword} = user
        if(name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:9200/register", user).then((res)=>{
                console.log(res);
                if(res.data.message != null)
                    alert(res.data.message)
                else    
                    alert("registered successfully")
                navigate('/login')
            })
        }
        else{
            alert("Invalid Input")
        }
    }

    return (
        <div className="login">
            <h1 >Register</h1>
            <input type="text" name = "name" value = {user.name} placeholder="Your name" onChange={handleChange}></input>
            <input type="text" name="email" value={user.email} placeholder="Enter your mail" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password} placeholder="Enter your password" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter your password" onChange={handleChange}></input>
            <button className="btn btn-success" onClick={register}>Register</button>
            <div>or</div>
            <button className="btn btn-success" onClick={() => navigate("/login")} >Login</button>

        </div>
    )
}
export default Register