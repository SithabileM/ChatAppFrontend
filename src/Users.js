import {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Users.module.css'
import Logout from './logout'
import Deactivate from './Deactivate'

const Users= ()=>{
    const [AppUsers,setAppUsers]=useState([]);
    const [allUsersShown,setAllUsersShown]=useState(true);
    const [buttonCaption,setButtonCaption] = useState("Show all users");
    const [searchTerm, setSearchTerm] = useState('');
    const [imageUrls,setImageUrls]=useState([]);
    const token =localStorage.getItem('token');
    const baseUrl=process.env.REACT_APP_API_BASE_URL;
    const navigate=useNavigate();
    

    const handleGetUsers=(term)=>{
        if(allUsersShown===false || searchTerm !== ""){
            fetch(`${baseUrl}/users`,{
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
        if(!token){
            navigate('/login')
        }
        fetch(`${baseUrl}/get_connections`,{
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Token ${token}`
            }
        }).then((res)=>{
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json()}
        )
        .then((data)=>{
            const users=data['connectedUsers'].filter((user)=>{return user.username.includes(term)})
            setAppUsers(users);
        })
        .catch((err)=>setAppUsers([]))
        setButtonCaption("Show all users")
        setAllUsersShown(false)
    }

};

    useEffect(()=>{
            handleGetUsers(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchTerm])

    useEffect(()=>{
         const fetchImages=async()=>{
            const promises= AppUsers.map((AppUser)=>{
                return fetch(`${baseUrl}/getProfilePicture/${AppUser.id}`,{
            method: 'GET',
            headers: {'Content-Type':'multipart/form-data'}
        }).then(res => res.json())
            });
            const results= await Promise.all(promises);
        
            setImageUrls(results);
            
            
        }
        fetchImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[AppUsers])

    const handleLogout=()=>{
        fetch(`${baseUrl}/logout`,{
            method:'POST',
            headers:{'Authorization': `Token ${token}`}
        }).then(response=>
        {
            localStorage.setItem('token','');
            navigate('/login');
        }
        )
    }

    const handleDeactivate=()=>{
        fetch(`${baseUrl}/users/delete`,{
            method: 'DELETE',
            headers:{'Authorization':`Token ${token}`}
        }).then((response)=>{
            localStorage.setItem('Token','');
            navigate('/')
        })
    }
   
    
return(
<div className={styles.users}>
    <div className={styles.accounts_buttons}>
        <Logout onLogout={handleLogout}/>
        <Deactivate onDeactivate={handleDeactivate}/>
    </div>
    
    <h1 className={styles.heading}>Let's Chat</h1>
    <Link className={styles.update_profile_link} to='/ProfileUpdate'>Update Profile</Link><br/>
    <button className={styles.filter_users} onClick={()=>{handleGetUsers(searchTerm)}} disabled={searchTerm.trim()!==""}>{buttonCaption}</button><br/>
    <input className={styles.search_user_input} type='text' placeholder='search user' value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} ></input>
    {AppUsers&&AppUsers.map((AppUser,index)=>(
        <div className={styles.profile_container} key={AppUser.id}>
            <div>
                {imageUrls[index]&&<img className={styles.profile} src={`${baseUrl}${imageUrls[index].profile_picture}`} alt={`${AppUser.username}'s profile`} />}
            </div>
                {imageUrls[index]&&<Link data-testid='username' className={styles.username} to={"/Users/"+ AppUser.id} state={{image:`${baseUrl}${imageUrls[index].profile_picture}`,id: AppUser.id,recipient: AppUser.username,}}>{AppUser.username}</Link>}
        </div>
    ))}
    {AppUsers&&AppUsers.length===0 && <p>No results found</p>}
    
</div>
    )
}
export default Users;