import React, {useState,useEffect} from 'react';
import styles from './ProfileUpdate.module.css';
import  supabase  from './supabaseClient';

const ProfileUpdate=()=>{
   const [selectedFile,setSelectedFile] = useState(null);
   const [profilePicture,setProfilePicture] = useState('');
   const token=localStorage.getItem('token');
   const [imageUrl,setImageUrl]=useState("");
   const baseUrl=process.env.REACT_APP_API_BASE_URL

   useEffect(()=>{
    fetch(`${baseUrl}/profile_picture`,{
        method: 'GET',
        headers:{
            'Authorization': `Token ${token}`,
            'Content-Type' : 'application/json',
        },
    })
    .then((response)=> response.json())
    .then((data)=>{
        setProfilePicture(data.profile_picture);
        setImageUrl(data.profile_picture);
    })
    .catch((error)=>console.error(error));
   },[token,profilePicture]);


    const handleFileChange = (event)=>{
        setSelectedFile(event.target.files[0]); 
    };

    const handleUpload =async()=>{
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        if (selectedFile){
            let {data,error} = await supabase.storage.from('user-images').upload(filePath,selectedFile)
            const {data: url} = await supabase.storage.from('user-images').getPublicUrl(filePath);
            setImageUrl(url.data.publicUrl);
            alert('file uploaded successfully.');
        }
        


        //upload file
        fetch(`${baseUrl}/profile_picture`,{
            method: 'PUT',
            headers:{
                'Authorization': `Token ${token}`,
            },
        })
        .then((response)=> response.json())
        .then((data)=>{

            setProfilePicture(data.profile_picture);
            localStorage.setItem('profile',data.profile_picture);
        })
        .catch((error)=>console.error(error))
        console.log(selectedFile)
        const file_url=imageUrl
        return JSON.stringify(file_url)

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