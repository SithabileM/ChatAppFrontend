import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Chats=()=>{
   const navigate=useNavigate()
   useEffect(()=>{
      navigate('/Users')
   },[navigate])
   
return(
   <div className="myChats">
      <p>loading...</p>
   </div>
   
)
}
export default Chats