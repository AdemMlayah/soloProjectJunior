import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './me.css'

const Me = (props) => {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(props.getFromLocal());
  const navigate = useNavigate();

  useEffect(() => {
     
    const getPosts  = async() => {
      await     axios 
        .get(`http://localhost:8080/user/blogs/14`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getPosts();
  }, []);

  const Delete = (e)=>{
    console.log(e);
   axios.delete(`http://localhost:8080/user/blogs/${e.PostId}`).then((result)=>{
    navigate("/me")
   })

  }
  console.log(data);
  if(data.length < 1){
    return <h1>No Posts Yet</h1>
  }

  return (
   <> 
   <h1>Your Posts</h1>
   <div class='big'>
    
      {data.map((e, index) => (
        <div key={index} className="card" >
          <div className="card-image"></div>
          <div className="category"> {e.title} </div>
          <div className="heading">
            {e.content.substr(0, 20)}...
            <div className="author">
              By <span className="name">{e.name}</span> {e.updatedAt}
              <button onClick={()=>Delete(e)} class='delete'>delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Me;