import styles from './Deactivate.module.css'
const Deactivate=({onDeactivate})=>{
return(
    <div>
        <button className={styles.deactivate_button} onClick={onDeactivate}>Deactivate Account</button>
    </div>
)
}
export default Deactivate