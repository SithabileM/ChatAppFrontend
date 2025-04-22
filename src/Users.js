import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import App from './App'
const Users= ()=>{
    const [AppUsers,setAppUsers]=useState('')
    useEffect(()=>{fetch("http://localhost:8000/users",{
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then(
        res => res.json() 
    )
    .then(
        data => setAppUsers(data)
    )},[])

    return(
<div>
    {AppUsers&&AppUsers.map((AppUser)=>(
        <div key={AppUser.id}>
            <Link to={"/Users/"+ AppUser.id} state={{id: AppUser.id}}>{AppUser.username}</Link>
        </div>
    ))}
</div>
    )
}
export default Users;