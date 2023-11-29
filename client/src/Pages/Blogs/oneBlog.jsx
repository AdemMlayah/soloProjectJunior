import axios from "axios";
import './css/oneBlog.css'
import Comments from "./comments";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const   OneBlog = ({ post, getFromLocal }) => {
  const [view, setView] = useState('View');
  // const [post, setPost] = useState(test);
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [currentUser,setCurrentUser]= useState(getFromLocal())
  const editing = () => {
    setView('editing');
  };

  const submit = async () => {
    await axios.put('http://localhost:8080/blogs/edit', {
      "title": title,
      "content": content,
      'id': post.PostId
    });
    setView('View');
  };

  const handleTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  if (view === 'editing') {
    return (
      <div className="Blog">
        <textarea className="title" onChange={handleTitle} defaultValue={title} />
        <br />
        <textarea onChange={handleContent} defaultValue={content} />
        <button className="edit"onClick={submit}>SUBMIT</button>
      </div>
    );
  } else if (!post) {
    return null; // or handle the case where post is undefined
  } else {
    return (
      <div className="main">

      <div className="Blogs1">
        <h1>{title}</h1>
        <h2 id="content">{  content}</h2>
        <h4>@{post.name}</h4>
        <h5>{post.createdAt.substr(0, 10)}</h5>
        {console.log(post)}
         
               <button onClick={editing} className="Btn">
               Edit
               <svg className="svg" viewBox="0 0 512 512">
                 <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
               </svg>
             </button>
        
        <Comments post={post} getFromLocal={getFromLocal}/>
      </div>
      </div>
    );
  }
};

export default OneBlog;