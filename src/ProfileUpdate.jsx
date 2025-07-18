import React, {useState,useEffect} from 'react'
import styles from './ProfileUpdate.module.css'

const ProfileUpdate=()=>{
   const [selectedFile,setSelectedFile] = useState(null);
   const [profilePicture,setProfilePicture] = useState('');
   const token=localStorage.getItem('token');
   const [imageUrl,setImageUrl]=useState("");

   useEffect(()=>{
    fetch('http://127.0.0.1:8000/profile_picture',{
        method: 'GET',
        headers:{
            'Authorization': `Token ${token}`,
            'Content-Type' : 'application/json',
        },
    })
    .then((response)=> response.json())
    .then((data)=>{
        setProfilePicture(data.profile_picture);
        setImageUrl("http://localhost:8000"+data.profile_picture);
    })
    .catch((error)=>console.error(error));
   },[token,profilePicture]);

    const handleFileChange = (event)=>{
        setSelectedFile(event.target.files[0]); 
    };

    const handleUpload =()=>{
        const formData=new FormData();
        if (selectedFile){
            formData.append('profile_picture',selectedFile)
        }
        else{
            formData.append('profile_picture',profilePicture)
        }


        //upload file
        fetch('http://127.0.0.1:8000/profile_picture',{
            method: 'PUT',
            headers:{
                'Authorization': `Token ${token}`,
            },
            body: formData,
        })
        .then((response)=> response.json())
        .then((data)=>{
            setProfilePicture(data.profile_picture);
            localStorage.setItem('profile',data.profile_picture);
        })
        .catch((error)=>console.error(error))
        console.log(selectedFile)

    };

    const handleUrlChange =(event)=> {
        setProfilePicture(event.target.value);
    };

    return(
        <div className={styles.profileUpdate}>
            <h1 className={styles.profile_header}>Update Profile</h1>
                {profilePicture && <img className={styles.profile_picture} src={imageUrl} alt="Profile"/>}<br/>
                <input className={styles.upload_button} type='file' onChange={handleFileChange}/><br/>
                <input className={styles.profile_url} type='url' value={profilePicture} onChange={handleUrlChange}/><br/>
                <button className={styles.upload_button} onClick={handleUpload}>Upload Profile Picture</button>
        </div>
    )
} 

export default ProfileUpdate;