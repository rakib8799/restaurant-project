const mongoose = require('mongoose');

const connectDB = async ()=>{
try{
        await  mongoose.connect(`mongodb+srv://mkrakib:Amirakib007@cluster0.jbzpp.mongodb.net/ecommerce?retryWrites=true&w=majority`,{
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