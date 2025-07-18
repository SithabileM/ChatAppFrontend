import styles from './Logout.module.css'

const Logout=({onLogout})=>{
    return(
        <div>
            <button className={styles.logout_button} onClick={onLogout}>Logout</button>
        </div>
    )
}
export default Logout