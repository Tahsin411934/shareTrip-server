const { default: mongoose} = require('mongoose');

const accessariesSchema = new mongoose.Schema({
     productName: { type:String, requre: true } ,
     price: { type:Number, requre: true } ,
     discount: { type:Number} ,
     description: { type:String, requre: true } ,
     imgUrl: { type:String, requre: true } ,
})

const Accessaries = mongoose.model('Accessaries',accessariesSchema);


module.exports = Accessaries;