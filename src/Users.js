import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

const Users= ()=>{
    const [AppUsers,setAppUsers]=useState([]);
    const [allUsersShown,setAllUsersShown]=useState(true)
    const [buttonCaption,setButtonCaption] = useState("Show all users")
    const [searchTerm, setSearchTerm] = useState("")


    const handleGetUsers=(term)=>{
        if(allUsersShown===false || searchTerm !== ""){
            fetch("http://localhost:8000/users",{
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then(
        res => res.json() 
    )
    .then(
        data => {
            const users=data.filter((d)=>{return d.username.toUpperCase().includes(term.toUpperCase())});
            setAppUsers(users);
        }
    )
        setButtonCaption("Show my connections");
        setAllUsersShown(true);
        }
    else{
        const token = localStorage.getItem("token")
        fetch("http://localhost:8000/get_connections",{
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Token ${token}`
            }
        }).then((res)=>{return res.json()})
        .then((data)=>{
            const users=data['connectedUsers'].filter((user)=>{return user.username.includes(term)})
            setAppUsers(users);
        })
        .catch((err)=>{console.error(err)})
        setButtonCaption("Show all users")
        setAllUsersShown(false)
        console.log(AppUsers);
    }
        
        
    }

    const handleGetInitials=(username)=>{
        const words = username.split(' ');
        const initials = words.map(word => word[0].toUpperCase()).join('');
        return initials;
    }

    useEffect(()=>{
            handleGetUsers(searchTerm);
    },[searchTerm])
    
    return(
<div>
    <h1>Users</h1>
    <input type='text' placeholder='search user' value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} ></input>
    <button onClick={()=>{handleGetUsers(searchTerm)}}>{buttonCaption}</button>
    {AppUsers&&AppUsers.map((AppUser)=>(
        <div key={AppUser.id}>
            <div>
                <h3> {handleGetInitials(AppUser.username)} </h3>
            </div>
            <Link to={"/Users/"+ AppUser.id} state={{id: AppUser.id,recipient: AppUser.username,initial: handleGetInitials(AppUser.username)}}>{AppUser.username}</Link>
        </div>
    ))}
</div>
    )
}
export default Users;