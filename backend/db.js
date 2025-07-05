var mongoose = require("mongoose");
// mongoose.connect("uri").then(()=>{}).catch(()=>{})
    var url=process.env.mongodb_url;
mongoose.connect(url)
    .then(()=>{
        console.log("db connected")
    })
    .catch((error)=>{
        console.log(error);
    })