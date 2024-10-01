const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    passwordHash:{type:String,required:true}
})
// 这是创一个文档模型
const User = mongoose.model('User', UserSchema,'user')
// 这个User模型与user集合相关联,User就可以用来操作数据库
module.exports=User