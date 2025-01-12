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

// Create models
const Customer = mongoose.model('Customer', customerSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Customer, Order };
