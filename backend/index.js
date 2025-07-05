var express=require("express");
var dotenv=require('dotenv')
dotenv.config()

require("./db");
var signin = require("./model")
var cors=require("cors");

var app = express();
app.use(express.json());
app.use(cors());

var port=3004;

app.post('/s',(req,res)=>{
    try {
        signin(req.body).save();
        res.send("signin sucessfull")
    } catch (err) {
        res.send(err)
    }
})

// app.post("/sc",async(req,res)=>{
//     const {email1, password1}=req.body
//     const check=await signin.findOne({ email1 });
//     if(!check){
//         return res.json({success:false, message:"user not found1"})
//     }
//     else{
//         return res.json({success:true, message:"user found1"})
//     }
// })

app.post("/l",async(req,res)=>{
    const {email, password}=req.body;
    try {
        const user=await signin.findOne({ email });
        console.log("Login request for:", email);
        if(!user){
            return res.status(400).json({success:false, message:"user not found"})
        }
        if(user.password!==password){
            return res.status(400).json({success:false,message:"incorrect password"})
        }

        res.json({success:true, message:"Login successfull", user})

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server error" });
    }
});


app.listen(port,()=>{
    console.log(`server is running in ${port}`);
});
