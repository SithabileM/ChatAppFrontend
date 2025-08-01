import React, {useState,useEffect} from 'react';
import styles from './ProfileUpdate.module.css';
import  supabase  from './supabaseClient';


const ProfileUpdate=()=>{
   const [selectedFile,setSelectedFile] = useState(null);
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
        setImageUrl(data.profile_picture);
    })
    .catch((error)=>console.error(error));
   },[]);


    const handleFileChange = (event)=>{
        setSelectedFile(event.target.files[0]); 
    };

    const handleUpload =async()=>{
        if (!selectedFile){return;};

        const filePath=`${Date.now()}_${selectedFile.name}`;
        const {error}=await supabase.storage.from('user-images').upload(filePath,selectedFile);
        if (error){
            console.error('Upload error:',error);
            return
        }
        const { data } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    setImageUrl(publicUrl);
    console.log(publicUrl);

        

    };

    useEffect(()=>{
        //upload file
        fetch(`${baseUrl}/profile_picture`,{
            method: 'PUT',
            headers:{
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({profile_picture: imageUrl})
        })
        .catch((error)=>console.error(error));

    },[imageUrl])

    return(
        <div className={styles.profileUpdate}>
            <h1 className={styles.profile_header}>Update Profile</h1>
                {imageUrl && <img className={styles.profile_picture} src={imageUrl} alt="Profile"/>}<br/>
                <input className={styles.upload_button} type='file' onChange={handleFileChange}/><br/>
                <button className={styles.upload_button} onClick={handleUpload}>Upload Profile Picture</button>
        </div>
    )
} 

export default ProfileUpdate;