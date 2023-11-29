import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OneBlog from "./oneBlog";
import Comments from "./comments";
import './css/blogs.css';


const Blogs = ({ data, getFromLocal }) => {
  const [view, setView] = useState('All');
  const [post, setPost] = useState();
  const [currentUser, setCurrentUser] = useState(getFromLocal());
  const [test,setTest]=useState()
  const navigate = useNavigate();
  
 
  const see = async(e,data) => {
    setPost(data)
   await axios.get(`http://localhost:8080/blogs/${e}`).then((res) => {
      setPost(res.data);
    }).then((res) => {
     
    }).then(()=>{
    setView('One')
    }).catch((err) => {
      console.log(err);
    });
  };
  if (data.length > 0 && view === 'All') {
    return (
      <div className="card-container">
        
      {data.map((e, index) => (
        <div key={index} className="card" onClick={() => see(e.PostId,e)}>
          <div className="card-image"></div>
          <div className="category"> {e.title} </div>
          <div className="heading">{e.content.substr(0,20)}...
            <div className="author"> By <span className="name">{e.name}</span> {e.updatedAt}</div>
          </div>
        </div>
      ))}
     
      
    </div>
    );
    console.log(post)
  } 
else if (view==='One'){
   return (
    <div>
      <OneBlog post={post} getFromLocal={getFromLocal}/>
    </div>

   )
}
};

export default Blogs;