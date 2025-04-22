import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'


const Signup=()=>{
    const [username, setUsername] = useState('')
    const [password,setPassword] =useState('')
    const [email, setEmail] =useState('')
    const handleSubmitUsername = (e)=>{
        setUsername(e.target.value)
        
    }
    const handleSubmitPassword=(e)=>{
        setPassword(e.target.value)
        
    }
    const handleSubmitEmail=(e)=>{
        setEmail(e.target.value)
        
    }
    const handleSignup= (e)=>{
        e.preventDefault();
        const data={username,password,email}
        fetch('http://localhost:8000/signup',{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                data
            )
    })
    
        .then( res => res.json()
        )
        .then(data => console.log(data))
        

    }

    return(
        <div className="signUp">
            <h1>Sign Up</h1>

            <form>

                <label>Username</label>
                <input type="text" value={username} onChange={handleSubmitUsername}></input><br/>
                <label>Password</label>
                <input type="password" value={password} onChange={handleSubmitPassword}></input><br/>
                <label>E-mail</label>
                <input type="email" value={email} onChange={handleSubmitEmail}></input><br/>
                <input type="submit" onClick={handleSignup}></input>

            </form>
            <Link to="/login">Login</Link>

        </div>
    )
}
export default Signup