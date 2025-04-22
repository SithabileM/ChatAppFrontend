import { useNavigate } from "react-router-dom"

const Chats=()=>{
   const navigate=useNavigate()
   const handleGetUsers = ()=>{
      navigate('/Users')
   }
return(
   <div className="myChats">
      <button onClick={handleGetUsers}>O    Users</button>
   <form></form>
   </div>
   
)
}
export default Chats