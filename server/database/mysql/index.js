const { Sequelize,DataTypes, where } = require('sequelize');

const sequelize = new Sequelize('historyblogs', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});
const  trah = async()=>{
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}}
const User = sequelize.define('User', {
  UserId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
  }
});
const Posts = sequelize.define('Posts', {
  PostId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING(2000),
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  }
});

const Comments = sequelize.define('Comments',{
  id:{
     type: Sequelize.INTEGER,
     primaryKey: true,
     autoIncrement: true,
     allowNull: false,
    },
    content :{
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    PosterName : {
      type:Sequelize.STRING(250),
      allowNull: false,
    }
    
  })
  
  
  User.hasMany(Posts,
    { foreignKey:'userId'
    
  })
  User.hasMany(Comments,{
    foreignKey: 'UserId',
    
  })
  
  Posts.hasMany(Comments,{
    foreignKey: 'PostId',
  })
  
  
  
  // Other model options go her

  // Your Database Queries Here!!
  
  // CRUD 
  
  // Creation 
const userCreation= async (name,password)=>  {
   const date = new Date().getTime()
  return await User.create({name:name,password:password,created_at:date,updated_at:date})}

  const postCreation = async (user, title, content, name) => {
    console.log('invoked');
    const date = new Date().getTime();
    try {
      const result = await Posts.create({
        title: title,
        content: content,
        created_at: date,
        userId: user,
        name: name,
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  
//  postCreation(1,"Hellllo","Where is us","Adem")
  const commentCreation = async (content,PostId,userId,username)=>{
    return await Comments.create({content:content,PostId:PostId,UserId:userId,PosterName:username})
    
  }




  // User

  const getAllUsers = async ()=>{
    return await User.findAll()
     
  }
  const getOneUser = async (name)=>{
    return await User.findOne({where:{name:name}})
     
  }


  const ChangePassword = async (newPass,userId)=>{
    User.update({password:newPass},{where:{userId:userId}})
  }
  // Posts

  const getAllPosts = async ()=>{
    return await Posts.findAll()
  }
  const onePost = async (id)=>{
    return await Posts.findOne({where:{PostId:id}})
  }
  const AllPostOfUser = async (id)=>{
    return await Posts.findAll({where:{userId:id}})
   
  }
  const UpdatePost = async (newTitle,newCon,id)=>{
    return await Posts.update( {content:newCon,title:newTitle},{where:{PostId:id}})
  }
 const deletePost = async (id)=>{
  console.log('invoked');
 return await Posts.destroy({
    where:{PostId:id}
  })
 }


  // Comments 
  const commOfPost = async (id)=>{
    
    return await Comments.findAll({where:{PostId:id}})
  }
  



// Don't forget to export your functions!
module.exports = {

  sequelize,
  Sequelize,

  // querry
  userCreation,
  getOneUser,
  getAllPosts,
  postCreation,
  onePost,
  commOfPost,
  commentCreation,
  UpdatePost,
  AllPostOfUser,
  deletePost,
};
