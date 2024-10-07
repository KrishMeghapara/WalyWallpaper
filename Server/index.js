const express =require('express');
const mongoose =require('mongoose');
const cors =require('cors');
const UserModel = require('./models/Users')


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://krishmeghapara2:et6ZAJjNOxp3j8X8@krishmeghapara.c3aii.mongodb.net/WalyWallperData");

app.get('/getUsers', (req, res) => {
    UserModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err));
  });

app.listen(3001,()=>{
    console.log("server is on");
})