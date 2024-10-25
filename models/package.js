const { default: mongoose } = require("mongoose");

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true }, // Discount field added
    duration: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
