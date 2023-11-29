import React, { useState } from "react"
import axios from 'axios'
import './signup.css'
import { useNavigate } from "react-router-dom";

const SignUp = ()=>{
 const [userName,setUserName]= useState('')
 const [password,setPassword]= useState('')
 const navigate = useNavigate()
 const handleChangeName = (e)=>{
  setUserName(e.target.value)
 }
 const HandleChangePass = (e)=>{
    setPassword(e.target.value)
 }

 const submit = async ()=>{
     if (userName.length < 4){
     alert('Username has to be 4 charchters or more')
     } else if (password.length < 8) {
        alert('Password has to be 8 charchters')
     } else 
   {var data = await axios.post('http://localhost:8080/user/create',{"name":userName,"password":password})
   console.log(data)
   navigate('/signin')
  }
 }






    return (
        <div>
<div className="login-box">
  Sign in
 <form>
   <div className="user-box">
     <input onChange={handleChangeName} type="text" name="" required=""/>
     <label>Username</label>
   </div>
   <div className="user-box">
     <input onChange={HandleChangePass} type="password" name="" required=""/>
     <label>Password</label>
   </div><center>
   <a href="#" onClick={submit}>
          SEND
      <span></span>
   </a></center>
 </form>
</div>            
        </div>
    )
}

export default SignUp