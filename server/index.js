const express = require("express")
const cors = require("cors")
require('./db/config')
const User = require("./db/User") //database
const app = express();


app.use(express.json());
app.use(cors())

app.post("/signup", async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject();
    delete result.password
    res.send(result)
})

// app.get("/userInfo/:id", (req, res) =>{
//   // let data = await User();
//   let data = User.find(({_id: req.params.id}),function(err,val){
//     res.send(val)
//   })
//   // console.log(data)
//   res.send(data)
// })

app.get("/userInfo/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.json( {data : user} );
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});



app.post("/login", async (req, res) => {
    console.log(req.body)
    let user = await User.findOne(req.body).select("-password")
    console.log("USER DATA",user)
    if (req.body.password && req.body.email) {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } else {
        res.status(400).json({ error: "Invalid request" });
      }
})


//update data
app.put('/addData/:id',async(req,res)=>{
  let result = await User.updateOne(
    {_id: req.params.id},
    {
      $set :req.body
    }
  )
  res.send(result)
})


app.listen(4000);