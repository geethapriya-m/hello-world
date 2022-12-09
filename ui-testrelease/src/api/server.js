const express = require('express')
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
var _ = require('underscore');
var cors = require('cors')
app.use(cors())


app.use(express.static(path.join(__dirname,"")))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


const fs = require("fs");
fs.readFile("./Generated_Schedule.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  // console.log("File data:", jsonString);
});
app.get("/scheduled-shift-lines",(req,res,next) => {
    fs.readFile("./Generated_Schedule.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.write(jsonString);
          res.end();
        // console.log("File data:", jsonString);
      }); 
 })

 app.get("/scheduled-shift-lines/:_id",(req,res,next) => {
  let _id = req.params._id
  fs.readFile("./Generated_Schedule.json", "utf8", (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
  else {
  // if(jsonString.indexOf(1)) 
    res.write(data)

      res.end();}
})
  
  // return requiredRecord

    // var user = _.find(jsonString.scheduleData, ['id',  _id])
    // const requestedItem = jsonString.jsonString(keyFilter('_id'))
  // UserData.findById(_id,function(err,data){
  //     if(err) return next(err);
      

  
})

 app.post("/scheduled-shift-lines",(req,res,next) => {
    let new_object;
    if(req.body!==undefined){
        new_object =  JSON.stringify(req.body);
       console.error()
    }
    // app.save()
    // console.log(new_object)
    
	fs.writeFile('./Generated_Schedule.json',new_object, 'utf-8', function(err) {
		console.error()
    
    if (err) throw err
		res.json()
    console.log('Done!')
    console.error()
	})
  
})

// app.delete("/scheduled-shift-lines/:_id",(req,res,next) => {
//   let _id = req.params._id
//   Donation.findByIdAndRemove(_id,function(err,data){
//       if(err) return next(err);
//       res.json(data)
//   })
// })

// app.put("/scheduled-shift-lines/:_id",(req,res,next) => {
//   let updated_object = req.body;
//   let _id = req.params._id
//   UserData.findByIdAndUpdate(_id,updated_object,{new: true},function(err,object){
//       if(err) return next(err);
//       res.json(object)
//   })
// })

app.listen(3000,() => {
    console.log("Server is running at port: 3000")
})
