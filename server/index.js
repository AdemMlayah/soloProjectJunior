const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
const db = require('./database/mysql')

app.use(express.json());
app.use(cors());

// usser function 

app.post("/user/create", async (req, res) => {
  try {
 var data = await db.userCreation(req.body.name,req.body.password)
 res.json(data)
  }catch{((err)=>{
    res.json(err)
  })}
});

app.get('/user/:name',async (req,res)=>{
  console.log('hello');
  try {
 var response = await db.getOneUser(req.params.name)
 res.json(response)
  }catch{((err)=>{
    console.log(err);
  })}
})


// blogs functions

app.delete('/user/blogs/:id',async(req,res)=>{
  db.deletePost(req.params.id).then((result)=>{
    res.json(result)
  }).catch((err)=>{
    res.json(result)
  })
})
app.get('/user/blogs/:id',async (req,res)=>{
  db.AllPostOfUser(req.params.id).then((result)=>{
    res.json(result)
  }).catch((err)=>{
    res.json(err)
  })
})

app.get('/blogs',async (req,res)=>{
  try {
    var data = await db.getAllPosts()
    res.json(data)
  }catch{}
})

app.get('/blogs/:id',async (req,res)=>{
  try {
    var data = await db.onePost(req.params.id)
    res.json(data)
  }catch{((err)=>{
    console.log(err)
  })
  }
})


app.post('/blogs/create',async (req,res)=>{
   db.postCreation(req.body.user,req.body.title,req.body.content,req.body.name).then((result)=>{
    res.json(result)
   }).catch((err)=>{
    res.json(err)
  })
 
})

app.put('/blogs/edit',async (req,res)=>{
 db.UpdatePost(req.body.title,req.body.content,req.body.id).then((result)=>{
  res.json(result)
 }).catch((err)=>{
  res.json(err)
 })
})

// Comments fn 
app.get('/blog/comments/:id', async (req,res)=>{
  db.commOfPost(req.params.id ).then((result)=>{
    res.json(result)
   })
})
app.post('/blog/comments/add',async (req,res)=>{
     
    db.commentCreation(req.body.content,req.body.PostId,req.body.userId,req.body.name).then((result)=>{
      res.json(result)
    }).catch((err)=>{
      res.json(err)
    })

})


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
