import { useState, useEffect } from "react"

const useLoadChats =(url,intervalTime=3000)=>{
    const [chats,setChats]=useState(null);
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(true);

useEffect(()=>{
    if (!url) return;
    let intervalId;
    const fetchChats= ()=>{
        console.log(url)
        fetch(url,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        }).then((res)=> res.json())
        .then((data)=>{
            setLoading(false);
            const chatArray = Object.values(data);
            setChats(chatArray);
            
        })
        .catch((error)=>{
            setLoading(false);
            setError(error);
        })
    }
    fetchChats()
    intervalId=setInterval(fetchChats,intervalTime);
    return ()=>clearInterval(intervalId)
},[url,intervalTime]);
return {chats,error,loading}
}
export default useLoadChats;