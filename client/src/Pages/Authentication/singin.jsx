import React, { useContext, useState } from "react"
import axios, { Axios } from 'axios'
import { useNavigate } from "react-router-dom";


import './signup.css'
const SignIn = (props)=>{
 const [userName,setUserName]= useState('')
 const [password,setPassword]= useState('')
 const navigate = useNavigate();

 const handleChangeName = (e)=>{
  setUserName(e.target.value)
 }
 const HandleChangePass = (e)=>{
    setPassword(e.target.value)
 }



 const submit = async ()=>{
 var data = await axios.get(`http://localhost:8080/user/${userName}`)
 data  = data.data
  if (data === null ){
    alert('Please create an account first')
  } else if (data.password !== password){
    alert('Wrong password')
  } else {
    props.saveToLocal(data)
    alert('Welcome')    
    navigate('/blogs');
  }
 }





 const tst = ()=>{
  navigate('/signup')
 }


    return (
        <div>
          
<div className="login-box">
  
 
 <form>
  <a onClick={tst}>SignUp</a>
   <div className="user-box">
    <h1>Sign in</h1>
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

export default SignIn