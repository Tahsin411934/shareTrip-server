const { default: mongoose } = require("mongoose");

const busSeduleSchema = new  mongoose.Schema({
    busNumber: {  type: String, required: true },
    busName: { type:  String, required: true },
    class: {type:  String, required: true },
    from :{ type : String, required: true},
    to : { type : String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    seatsAvailable: { type: Number, required: true },
    price: { type: Number, required: true },
    date:  { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const  BusSchedule = mongoose.model('BusSchedule', busSeduleSchema);

module.exports = BusSchedule;
