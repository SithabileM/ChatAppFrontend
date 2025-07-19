import {useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react'
import useLoadChats from './useLoadChats';
import styles from './Room.module.css'

const Room=()=>{
    const location=useLocation();
    const recipientId=location.state.id;
    const recipient=location.state.recipient;
    const image=location.state.image;
    const userId=localStorage.getItem("userId");
    const [message, setMessage]=useState(null);
    const [roomId,setRoomId]=useState(null);
    const [a, b] = [userId, recipientId].sort();

    console.log(image);
    useEffect(()=>{
        setRoomId(`ChatRoom(${a}_${b})`)
    },[a,b])

    const {chats,error,loading} = useLoadChats(`http://127.0.0.1:8000/get_messages/${roomId}`);

    
const handlePostMessage=(roomId)=>{
    const data={room:roomId,sender:userId,recipient:recipientId,message:message}
    fetch('http://127.0.0.1:8000/post_message',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    ).catch((error)=>{console.error(error)})
    setMessage('');
}

const handleGetOrCreateRoom = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/room/${a}/${b}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        if (response.status === 404) {
            const data={id:a+"_"+b,user_1:a,user_2:b}
            return fetch('http://127.0.0.1:8000/create_chatRoom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            .then((res)=>res.json())
        }
        else if(response.ok){
            return response.json()
        }
    })
    .then((data) => {
        setRoomId(data.id);
        handlePostMessage(data.id);
     })
    .catch((error) => { console.error(error); });
    
};

return(
        <div className={styles.room}>
            {loading&& <p>Loading...</p>}
            {error&& <p>{error.message}</p>}

            <div className={styles.recipient_container}>
            {image&&<img className={styles.profile_picture} src={image} alt='user profile'></img>}
            <h2 className={styles.recipient_username}>{recipient}</h2>
            </div>

            <div className={styles.form_container}>
                <form className={styles.message_submission}>
                <textarea className={styles.message_input} placeholder='Message' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                <input className={styles.message_send} type='submit' onClick={handleGetOrCreateRoom} value='Send'></input>
            </form>
            </div>

            <div className={styles.chats_container}>
                {chats&&chats.map((chat,index)=>(
            <div key={index} className={styles.message}>
                
                    {`${chat.sender}`===userId&&<p className={styles.sender_message}> {chat.message}</p>}
                    {`${chat.recipient}`===userId&&<p className={styles.recipient_message}> {chat.message}</p>} 


                    {`${chat.sender}`===userId&&<p className={styles.sender_time}>{chat.updated_at.slice(0,10)}</p>}

                    {`${chat.sender}`===userId&&<p className={styles.sender_time}>{chat.updated_at.slice(11,19)}</p>}
                    
                    {`${chat.recipient}`===userId&&<p className={styles.recipient_time}>{chat.updated_at.slice(0,10)}</p>}
                    {`${chat.recipient}`===userId&&<p className={styles.recipient_time}>{chat.updated_at.slice(11,19)}</p>}
                    
                    
                    
            </div>
        ))}
            </div>
            

        </div>
    )
}
export default Room;