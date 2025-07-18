import logo from './images/chatLogo.jpg'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import styles from './Home.module.css'

const Home = ()=>{
    const navigate=useNavigate();

  useEffect(()=>{
      const timer=setTimeout(()=>{

        navigate('/login');
      },1500);
      return ()=> clearTimeout(timer);
  },[navigate]);

    return (
        <div className={styles.logo_container}>
            <img className={styles.logo} alt="Logo" src={logo}></img>
        </div>
    );
}
export default Home