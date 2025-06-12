import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login=()=>{ 

    const [username, setUsername] = useState('');
    const [password,setPassword] =useState('');
    const navigate= useNavigate();


    const handleSubmitUsername = (e)=>{
        setUsername(e.target.value)
        
    };
    const handleSubmitPassword=(e)=>{
        setPassword(e.target.value)
        
    };
    

    const handleLogin= (e)=>{
        e.preventDefault();
        const data={username,password};
        fetch('http://localhost:8000/login',{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                data
            ),
    })
        .then( (response) => response.json())
        .then((data)=>{
            localStorage.setItem("userId",data.user.id);
            localStorage.setItem('token',data.token);
            navigate('/Chats');
        })
        .catch((error)=> {
            console.error(error);
        });
        
        

};

    return(
        <div className="signUp">
            <h1>Login</h1>

            <form>

                <label>Username</label>
                <input type="text" value={username} onChange={handleSubmitUsername}></input><br/>
                <label>Password</label>
                <input type="password" value={password} onChange={handleSubmitPassword}></input><br/>
                <input type="submit" onClick={handleLogin}></input>

            </form>
        </div>
    )
}
export default Login