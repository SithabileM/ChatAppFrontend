import {useState} from 'react';
import {useNavigate,Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login=()=>{ 

    const [username, setUsername] = useState('');
    const [password,setPassword] =useState('');
    const [errorMessage,setErrorMessage]=useState(false);
    const navigate= useNavigate();
    const baseUrl=process.env.REACT_APP_API_BASE_URL


    const handleSubmitUsername = (e)=>{
        setUsername(e.target.value)
        
    };
    const handleSubmitPassword=(e)=>{
        setPassword(e.target.value)
        
    };
    

    const handleLogin= (e)=>{
        e.preventDefault();
        const data={username,password};
        fetch(`${baseUrl}/login`,{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                data
            ),
    })
        .then( res => {
                if (!res.ok){
            throw new Error(res.statusText);
        }
    
        return res.json();
    }
        )
        .then((data)=>{
            setErrorMessage(false); 
            localStorage.setItem("userId",data.user.id);
            localStorage.setItem('token',data.token);
            navigate('/Chats');
        })
        .catch((error)=> {
            setErrorMessage(true);
        });
        
        

};

    return(
        <div className={styles.body}>
            <div className={styles.login}>
            <h1 className={styles.header}>Login</h1>

            <form className={styles.form}>
                    <div className={styles.label_input_combo}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input id="username" className={styles.input} type="text" value={username} onChange={handleSubmitUsername}></input><br/>
                    </div>
                    <div className={styles.label_input_combo}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input id="password" className={styles.input} type="password" value={password} onChange={handleSubmitPassword}></input><br/>
                    </div>
                    
                <input className={styles.button} type="submit" onClick={handleLogin} value='Login'></input>

            </form>
            {errorMessage&&<p className={styles.error_message}>Error! Please check that you have stable internet connectivity and that your user credentials are valid.</p>}
            <p className={styles.ptag}>Not signed Up? |</p>
            <Link to='/Signup' className={styles.link}>SignUp</Link>
        </div>
        </div>
        
    )
}
export default Login