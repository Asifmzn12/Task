/* Schema and Model of Category*/
const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
  category_id:Number,
  category_name:String



})
module.exports=mongoose.model('categories',categorySchema)
