const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Kari:806086kappka@cluster0-cscdb.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
    console.log("conected to db success");
}).catch((err)=>{console.log("conected to db failed", err)})

module.exports = {
    mongoose
}

