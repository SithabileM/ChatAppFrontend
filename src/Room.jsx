import {useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react'
import useLoadChats from './useLoadChats';

const Room=()=>{
    const location=useLocation();
    const recipientId=location.state.id;
    const userId=localStorage.getItem("userId");
    const [message, setMessage]=useState(null);
    const [roomId,setRoomId]=useState(null);
    const [a, b] = [userId, recipientId].sort();

    useEffect(()=>{
        setRoomId(`ChatRoom(${a}_${b})`)
    },[a,b])
    console.log(roomId)

    const {chats,error,loading} = useLoadChats(`http://127.0.0.1:8000/get_messages/${roomId}`);

    
const handlePostMessage=(roomId)=>{
    const data={room:roomId,sender:userId,recipient:recipientId,message:message}
    fetch('http://127.0.0.1:8000/post_message',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    ).catch((error)=>{console.error(error)})
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
        <div>
            <h2>Chats</h2>
            {loading&& <p>Loading...</p>}
            {error&& <p>{error.message}</p>}

            <form>
                <input type='text' placeholder='Message' value={message} onChange={(e)=>setMessage(e.target.value)}></input>
                <input type='submit' onClick={handleGetOrCreateRoom}></input>
            </form>

            {chats&&chats.map((chat,index)=>(
            <div key={index}>
                {`${chat.sender}`===userId&&<p style={{textAlign:'right'}}> {chat.message} </p> }
                {`${chat.recipient}`===userId&&<p style={{textAlign:'left'}}> {chat.message} </p>}  
            </div>
        ))}

        </div>
    )
}
export default Room;