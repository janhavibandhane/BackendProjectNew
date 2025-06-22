import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:'string',required:true},
    email:{type:'string',required:true,unique:true},
    password:{type:'string',required:true},
    content:{type:'string',required:true},
      instaId:{type:'string'},
      age:{type:'string',required:true}
},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User;