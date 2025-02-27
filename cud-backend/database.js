// 

const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(`${process.env.MONGODB_URI}/ordersDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define schemas
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    village: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String },
});

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    orderDetails: { type: Object, required: true }, // Stores order details as a JSON object
});

const productSchema = new mongoose.Schema({
    name: { type: String, required:true},
    imageUrl:{type: String, required: true},
    pricePerKg: {type: Number, required: true},
    pricePerBag: {type: Number, required: true},
    weightOfBag: {type: Number, required: true},
    category:{type: String, required: true},
    description:{type:String},
    isFodderIngredient: {type:Boolean, required:true},
    productCanBeAddedToFodder: {type:Boolean, required:true},
    isWhole: {type:Boolean, required:true},
    totalAvailableCount: {type: Number,required: true},
    totalAvailableWeight: {type:Number, required: true}
});

// Create models
const Customer = mongoose.model('Customer', customerSchema);
const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model("Product", productSchema);

module.exports = { Customer, Order, Product };
