const express=require('express');
const dbConnect=require('./mongodb');
const app=express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

//getting list of employee
app.get('/employees',async(req,res)=>{
let data=await dbConnect();
data=await data.find().toArray();
console.log(data);
res.send(data)
})
//add new employee
 app.post('/addEmp',async(req,res)=>{
    let data=await dbConnect();
    console.log('req.body',req.body)
    let result=await data.insertOne(req.body);
    res.send(result) 
})
//updating employee details
const { ObjectId } = require('mongodb');

app.put('/updateDetails', async (req, res) => {
  let data = await dbConnect();

  const id = req.body._id; // Extract the _id
  delete req.body._id; // Remove _id from the update payload

  try {
    const result = await data.updateOne(
      { _id: new ObjectId(id) },  // Match by ObjectId
      { $set: req.body }          // Set the updated fields
    );

    if (result.modifiedCount > 0) {
      res.send({ success: true, message: "Employee updated successfully", result });
    } else {
      res.send({ success: false, message: "No document was updated", result });
    }
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).send({ success: false, message: "Error updating employee", error });
  }
});

//deleting employee details
 
app.delete('/deleteEmp', async (req, res) => {
  try {
    const db = await dbConnect();
    const id = req.body._id;

    console.log('Deleting ID:', id);

    const result = await db.deleteOne({ _id: new ObjectId(id) });  
    res.send(result);
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send({ error: "Deletion failed" });
  }
});

  

app.listen(5000);
