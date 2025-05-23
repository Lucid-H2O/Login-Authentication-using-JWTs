const mongoose = require('mongoose');

module.exports = () =>{
    const params ={
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.DB);
        console.log("connected to database");
    }catch(error){
        console.log(error);
        console.log("cannot connect to database");
    }
}