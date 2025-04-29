import {useLocation} from 'react-router-dom';
import {useState} from 'react'
import useLoadChats from './useLoadChats';


const Room=()=>{
    const location=useLocation();
    const locationId=location.state.id;
    const userId=localStorage.getItem("userId");
    const [message, setMessage]=useState(null);
    const [roomId,setRoomId]=useState(null);

    
const handlePostMessage=(roomId)=>{
    const data={room:roomId,sender:userId,recipient:locationId,message:message}
    fetch('http://127.0.0.1:8000/post_message',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    ).catch((error)=>{console.error(error)})
}

const handleGetOrCreateRoom = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/room/${userId}/${locationId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        if (response.status === 404) {
            const data={user_1:userId,user_2:locationId}
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

const {chats,error,loading} = useLoadChats(roomId? `http://127.0.0.1:8000/get_messages/${roomId}` : null);


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
              <p> {chat.message} </p>  
            </div>
        ))}

        </div>
    )
}
export default Room;