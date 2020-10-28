const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Userdata = require('./module/user');


var app = new express();

// app.use(express.urlencoded());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/users',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION');
    Userdata.find().then(user=>{
        res.send(user);
        console.log(user);
    })
})

app.post('/user',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION');

    var user= {
        name : req.body.user.name,
        email : req.body.user.email,
        phone : req.body.user.phone,
        password : req.body.user.password
    }
    var users = new Userdata(user);
    users.save();
})

app.post('/login',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTION');

    var email = req.body.user.useremail;
    console.log("user email is "+" "+email);
    var password = req.body.user.userPass;

   
    Userdata.findOne({email:email, password:password})
    .then(data=>{
        // console.log("user email is"+""+data.email);
        if(data.email !== null && data.email==email && data.password==password){
            Userdata.findOne({email:email})
            .then(details=>{
                
                res.send(details);
                console.log("ok");
            })
        }
        else{
            console.log("invalid email or password")
        }
    })

    .catch(err=>{
        console.log(err);
    })
})

app.listen(4000,function(){
    console.log("Port 4000 is running good");
})