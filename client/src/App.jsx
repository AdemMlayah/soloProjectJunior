
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Authentication/signup";
import SignIn from "./Pages/Authentication/singin";
import Blogs from "./Pages/Blogs/blogs";
import CreateBlogs from "./Pages/Blogs/createBlogs";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import OneBlog from "./Pages/Blogs/oneBlog";
import Me from "./Pages/me";
import Home from "./Pages/homePgae";
function App() {
  const [data,setData] = useState('')
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:8080/blogs').then((res) => {
      setData(res.data);
    });
  };
  
const saveUserToLocalStorage = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (error) {
    console.error('Error saving user to local storage:', error);
  }
};

const getUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (error) {
    console.error('Error getting user from local storage:', error);
    return null;
  }
};
 var currentUser = getUserFromLocalStorage()
 
  const logout = ()=>{
    localStorage.clear();
    currentUser = ''
    console.log("e")
  }
  return (
    <Router>
      <div className="navBar"><div class="area"></div><nav class="main-menu">
            <ul>
                <li>
                    <a href="http://localhost:5173/home">
                        <i class="fa fa-home fa-2x"></i>
                        <span class="nav-text">
                          Home
                        </span>
                    </a>
                  
                </li>
                <li class="has-subnav">
                    <a href="http://localhost:5173/me">
                        <i class="fa fa-globe fa-2x"></i>
                        <span class="nav-text">
                           Me
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="http://localhost:5173/blogs">
                       <i class="fa fa-comments fa-2x"></i>
                        <span class="nav-text">
                            Forum
                        </span>
                    </a>
                    
                </li>

                  <li>
                      <a href="http://localhost:5173/blogs/create">
                          <i class="fa fa-book fa-2x"></i>
                          <span class="nav-text">
                            CreatePost
                          </span>
                      </a>
                  </li>
            
              
              
            </ul>

            <ul class="logout">
                <li>
                   <a href="">
                         <i class="fa fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            {currentUser && <a onClick={()=>logout()}>logout</a> }
                            {!currentUser && <a href='http://localhost:5173/signin' >login</a> }
                        </span>
                    </a>
                </li>  
                <li>
                <div class="input-wrapper">
  <button class="icon"> 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M22 22L20 20"></path>
    </svg>
  </button>
  <input placeholder="search.." class="input" name="text" type="text"/>
</div>
                </li>
            </ul>
          
        </nav></div>
      <Routes>
        <Route path='/me' element={<Me  getFromLocal={getUserFromLocalStorage}/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn getFromLocal={getUserFromLocalStorage} saveToLocal={saveUserToLocalStorage}/> } />
        <Route path="/blogs" element={<Blogs getFromLocal={getUserFromLocalStorage} data ={data}  saveToLocal={saveUserToLocalStorage}/>}/>
        <Route path="/blogs/create" element={<CreateBlogs getFromLocal={getUserFromLocalStorage} saveToLocal={saveUserToLocalStorage}/>}/>
        {/* <Route path="/read" element={<OneBlog getFromLocal={getUserFromLocalStorage} post={data[0]} />} /> */}

      </Routes>
    </Router>
  );
}

export default App