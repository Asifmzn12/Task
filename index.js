const express=require('express')
require('./Database/config')
const products=require('./Module/product')
const category=require('./Module/category')
const { collection } = require('./Module/category')
const app=express()
app.use(express.json());

/* Aggregate for join the collection*/
  products.aggregate([

    {$lookup:{ from:"category", localField:' Catogory_id', 
      foreignField:'category_id',as:'Productitem'}},
]).exec((err, result)=>{
    if (err) {
        console.log("error" ,err)
    }
    if (result) {
        console.log(result);
    }
});
/* Find the result */
products.aggregate([
    { $group : { _id : '$name', totaldocs : { $sum : 1 } } }
  ])
/*Crud Operation */
app.post("/create",async(req,resp)=>{
    let categorydata=await new category(req.body)
    await categorydata.save()
    console.log(categorydata);
    resp.send(categorydata)
})

app.post("/product",async(req,resp)=>{
    let productdata = await new products(req.body)
    await productdata.save()
    console.log(productdata);
    resp.send(productdata)
})
app.get("/",async(req,res)=>{
    try{
        const data = await products.find()
        res.send(data)
        console.log(data);
    }
    catch(error){
        res.send("something went wrong")
    }
})
app.get("/categorydata",async(req,res)=>{
    try{
        const data = await category.find()
        res.send(data)
        console.log(data);
    }
    catch(error){
        res.send("something went wrong")
    }
})

app.delete("/delete/:_id",async(req,res)=>{
        await products.findByIdAndDelete({_id:req.params._id}),function(err,docs){
            res.send(docs)
            console.log(docs);
        }
})
app.delete("/deletecat/:_id",async(req,res)=>{
        await category.findByIdAndDelete({_id:req.params._id}),function(err,docs){
            res.send(docs)
            console.log(docs);
        }
})

app.put("/update/:_id",async(req,res)=>{
    var data = await products.findOneAndUpdate({_id:req.query._id})
    data.product_id = req.body.product_id??data.product_id
    data.product_name = req.body.product_name??data.product_name
    data.qtyPerUnit = req.body.qtyPerUnit??data.qtyPerUnit
    data.unitPrice = req.body.unitPrice??data.unitPrice
    data.unitInStock = req.body.unitInStock??data.unitInStock
    data.discontinued = req.body.discontinued??data.discontinued
    data.Catogory_id = req.body.Catogory_id??data.Catogory_id
    await data.save()
    res.send(data)
})
app.put("/updatecat/:_id",async(req,res)=>{
    var data = await category.findOneAndUpdate({_id:req.query._id})
    data.category_id = req.body.category_id??data.category_id
    data.category_name = req.body.category_name??data.category_name
    await data.save()
    res.send(data)
})


app.listen(6000);