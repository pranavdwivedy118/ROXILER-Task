
const axios = require('axios');
const Transaction = require('../models/Transaction');

const fetchData = async () => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        await Transaction.deleteMany({}); // Clear existing data
        await Transaction.insertMany(data); // Insert new data
        console.log('Database initialized with fetched data');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

module.exports = fetchData;
