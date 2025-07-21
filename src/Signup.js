import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './Login.module.css'

const Signup=()=>{
    const [username, setUsername] = useState('')
    const [password,setPassword] =useState('')
    const [email, setEmail] =useState('')
    const [errorMessage,setErrorMessage]=useState(false);
    const baseUrl=process.env.REACT_APP_API_BASE_URL

    
    const handleSubmitUsername = (e)=>{
        setUsername(e.target.value)
        
    }
    const handleSubmitPassword=(e)=>{
        setPassword(e.target.value)
        
    }
    const handleSubmitEmail=(e)=>{
        setEmail(e.target.value)
        
    }
    const navigate=useNavigate()
    const handleSignup= (e)=>{
        e.preventDefault();
        
        const data={username,password,email}
        fetch(`${baseUrl}/signup`,{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
    }).then( res =>{
        if (!res.ok){
            throw new Error(res.statusText);
        }
    
        return res.json();
    }
    
        ).then(data =>{
            navigate('/login');
            setErrorMessage(false);
            
        }
            
        ).catch(error=>setErrorMessage(true))
        

    }

    return(
        <div className={styles.body}>
            <div className={styles.login}>
            <h1 className={styles.header}>Sign Up</h1>

            <form>
                <div className={styles.label_input_combo}>
                    <label className={styles.label} htmlFor='username'>Username</label>
                    <input className={styles.input} type="text" value={username} onChange={handleSubmitUsername} id='username'></input><br/>
                </div>
                <div className={styles.label_input_combo}>
                    <label className={styles.label} htmlFor='password'>Password</label>
                    <input className={styles.input} type="password" value={password} onChange={handleSubmitPassword} id='password'></input><br/>
                </div>
                <div className={styles.label_input_combo}>
                    <label className={styles.label} htmlFor='email'>E-mail</label><br/>
                    <input className={styles.input} type="email" value={email} onChange={handleSubmitEmail} id='email'></input><br/>
                </div>
                <input className={styles.button} type="submit" onClick={handleSignup} value='Sign Up'></input>

            </form>
            {errorMessage&&<p className={styles.error_message}>Sign-up failed! Account may already exist. Check that your device has stable internet connectivity and try again...</p>}
            
            <p>Already signed up? | </p>
            <Link to="/login">Login</Link>

        </div>
        </div>
        
    )
}
export default Signup