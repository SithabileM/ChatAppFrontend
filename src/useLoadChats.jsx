import { useState, useEffect } from "react"

const useLoadChats =(url,intervalTime=3000)=>{
    const [chats,setChats]=useState(null);
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(true);

useEffect(()=>{
    if (!url) return;
    let intervalId;
    const fetchChats= ()=>{
        fetch(url,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        }).then((res)=>{return res.json()})
        .then((data)=>{
            setLoading(false);
            console.log(data);
            setChats(data);
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