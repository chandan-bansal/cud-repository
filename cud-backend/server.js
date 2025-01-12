// const express = require('express');
// const bodyParser = require('body-parser');
// const db = require('./database');
// var cors = require('cors')

// const app = express();
// app.use(bodyParser.json());
// app.use(cors())

// // Create Customer
// app.post('/customer', (req, res) => {
//     const { name, fatherName, village, mobile, address } = req.body;
//     db.run(`INSERT INTO customer (name, fatherName, village, mobile, address) VALUES (?, ?, ?, ?, ?)`, [name, fatherName, village, mobile, address], function (err) {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(201).json({ customerId: this.lastID, name, fatherName,village, mobile, address });
//     });
// });

// // Get ALl customers
// app.get('/customer/allCustomers', (req, res) =>{
//     db.all(`SELECT * FROM customer`, (err, rows) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(rows);
//     });
// });
// // Create Order
// // app.post('/newOrder', (req, res) => {
// //     const { customerId, orderDetails } = req.body;
// //     const serializedOrderDetails = JSON.stringify(orderDetails);
// //     db.run(`INSERT INTO cudOrder (customer_id, order_details) VALUES (?, ?)`, [customerId, serializedOrderDetails], function (err) {
// //         if (err) return res.status(500).json({ error: err.message });
// //         res.status(201).json({ orderId: this.lastID, orderDetails });
// //     });
// // });

// // Get All Orders
// // app.get('/orders', (req, res) => {
// //     const query = `
// //         SELECT 
// //             o.id AS order_id,
// //             o.customer_id,
// //             o.order_details,
// //             c.name AS customer_name,
// //             c.fatherName AS customer_father_name,
// //             c.village AS customer_village,
// //             c.mobile AS customer_mobile,
// //             c.address AS customer_address
// //         FROM 
// //             cudOrder o
// //         JOIN 
// //             customer c
// //         ON 
// //             o.customer_id = c.id
// //     `;

// //     db.all(query, [], (err, rows) => {
// //         if (err) return res.status(500).json({ error: err.message });
// //         console.log("Rows", rows);
// //         // Parse order_details back to an object
// //         const formattedRows = rows.map(row => ({
// //             order_id: row.order_id,
// //             customer_id: row.customer_id,
// //             order_details: JSON.parse(row.order_details),
// //             customer: {
// //                 name: row.customer_name,
// //                 fatherName: row.customer_father_name,
// //                 village: row.customer_village,
// //                 mobile: row.customer_mobile,
// //                 address: row.customer_address,
// //             },
// //         }));

// //         res.json(formattedRows);
// //     });
// // });


// app.post('/newOrder', (req, res) => {
//     const { customerId, orderDetails } = req.body;
//     console.log(typeof(orderDetails))
//     const stringOrder = JSON.stringify(orderDetails)
    
//     // Ensure orderDetails is a valid JSON string
//     try {
//         JSON.parse(stringOrder); // Validate JSON
//     } catch (error) {
//         return res.status(400).json({ error: 'Invalid JSON in orderDetails' });
//     }

//     db.run(
//         `INSERT INTO cudOrder (customer_id, order_details) VALUES (?, ?)`,
//         [customerId, stringOrder], // Insert the raw JSON string
//         function (err) {
//             if (err) {
//                 console.error('Database Error:', err.message);
//                 return res.status(500).json({ error: 'Internal server error' });
//             }
//             res.status(201).json({ orderId: this.lastID, orderDetails: JSON.parse(stringOrder) });
//         }
//     );
// });

// app.get('/orders', (req, res) => {
//     const query = `
//         SELECT 
//             o.id AS order_id,
//             o.customer_id,
//             o.order_details,
//             c.name AS customer_name,
//             c.fatherName AS customer_father_name,
//             c.village AS customer_village,
//             c.mobile AS customer_mobile,
//             c.address AS customer_address
//         FROM 
//             cudOrder o
//         JOIN 
//             customer c
//         ON 
//             o.customer_id = c.id
//     `;

//     db.all(query, [], (err, rows) => {
//         if (err) return res.status(500).json({ error: err.message });

//         const formattedRows = rows.map(row => {
//             let orderDetails;

//             // Parse JSON safely
//             try {
//                 orderDetails = JSON.parse(row.order_details);
//             } catch (error) {
//                 console.error(`Failed to parse order_details for order_id ${row.order_id}`);
//                 orderDetails = null; // Handle invalid data gracefully
//             }

//             return {
//                 order_id: row.order_id,
//                 customer_id: row.customer_id,
//                 order_details: orderDetails,
//                 customer: {
//                     name: row.customer_name,
//                     fatherName: row.customer_father_name,
//                     village: row.customer_village,
//                     mobile: row.customer_mobile,
//                     address: row.customer_address,
//                 },
//             };
//         });

//         res.json(formattedRows);
//     });
// });

// // Get Orders for a customer
// app.get('/orders/:customer_id', (req, res) => {
//     const { customer_id } = req.params; // Extract customer_id from route parameters

//     const query = `
//         SELECT 
//             o.id AS order_id,
//             o.customer_id,
//             o.order_details,
//             c.name AS customer_name,
//             c.fatherName AS customer_father_name,
//             c.village AS customer_village,
//             c.mobile AS customer_mobile,
//             c.address AS customer_address
//         FROM 
//             cudOrder o
//         JOIN 
//             customer c
//         ON 
//             o.customer_id = c.id
//         WHERE 
//             o.customer_id = ?`; // Use parameterized query to prevent SQL injection

//     db.all(query, [customer_id], (err, rows) => {
//         if (err) return res.status(500).json({ error: err.message });

//         const formattedRows = rows.map(row => {
//             let orderDetails;

//             // Parse JSON safely
//             try {
//                 orderDetails = JSON.parse(row.order_details);
//             } catch (error) {
//                 console.error(`Failed to parse order_details for order_id ${row.order_id}`);
//                 orderDetails = null; // Handle invalid data gracefully
//             }

//             return {
//                 order_id: row.order_id,
//                 customer_id: row.customer_id,
//                 order_details: orderDetails,
//                 customer: {
//                     name: row.customer_name,
//                     fatherName: row.customer_father_name,
//                     village: row.customer_village,
//                     mobile: row.customer_mobile,
//                     address: row.customer_address,
//                 },
//             };
//         });

//         res.json(formattedRows);
//     });
// });

// // Start Server
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Customer, Order } = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create Customer
app.post('/customer', async (req, res) => {
    const { name, fatherName, village, mobile, address } = req.body;

    try {
        const customer = new Customer({ name, fatherName, village, mobile, address });
        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Customers
app.get('/customer/allCustomers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Order
app.post('/newOrder', async (req, res) => {
    const { customerId, orderDetails } = req.body;

    try {
        const order = new Order({ customerId, orderDetails });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId');
        const formattedOrders = orders.map(order => ({
            order_id: order._id,
            customer_id: order.customerId._id,
            order_details: order.orderDetails,
            customer: {
                name: order.customerId.name,
                fatherName: order.customerId.fatherName,
                village: order.customerId.village,
                mobile: order.customerId.mobile,
                address: order.customerId.address,
            },
        }));
        res.json(formattedOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Orders for a Customer
app.get('/orders/:customerId', async (req, res) => {
    const { customerId } = req.params;

    try {
        const orders = await Order.find({ customerId }).populate('customerId');
        const formattedOrders = orders.map(order => ({
            order_id: order._id,
            customer_id: order.customerId._id,
            order_details: order.orderDetails,
            customer: {
                name: order.customerId.name,
                fatherName: order.customerId.fatherName,
                village: order.customerId.village,
                mobile: order.customerId.mobile,
                address: order.customerId.address,
            },
        }));
        res.json(formattedOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
