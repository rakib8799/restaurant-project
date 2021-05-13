const mongoose = require('mongoose');

const connectDB = async ()=>{
try{
        await  mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jbzpp.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection established');
}
catch(err){
    console.log(err);
}
}

module.exports = connectDB;