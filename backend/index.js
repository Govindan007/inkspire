const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
<<<<<<< HEAD

var port=3004;

app.post("/check", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await signin.findOne({ email });
    if (existingUser) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error while checking user" });
  }
});


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
=======
app.use(express.json());

app.use("/admin", require("./routes/adminRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/blogs", require("./routes/blogRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Only images are allowed') {
    console.error('❌ Multer error:', err.message);
    return res.status(400).json({ error: err.message });
  }

  // Other errors
  console.error('❌ Unexpected server error:', err);
  res.status(500).json({ error: 'Server error' });
});
