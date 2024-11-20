const mongoose = require('mongoose')
const connectionstring=process.env.DATABASE

mongoose.connect(connectionstring).then(()=>{
    console.log("Connected to database taskMangement server");
}).catch((err)=>{
    console.log(`Error connecting to database taskMangement server: ${err}`);
})