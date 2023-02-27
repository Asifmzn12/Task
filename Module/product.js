const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    product_id:Number,
    product_name:String,
    qtyPerUnit:Number,
    unitPrice:Number,
    unitInStock:Number,
    discontinued:Boolean,
    Catogory_id:Number
})

  
   module.exports=mongoose.model('products',productSchema)
  
