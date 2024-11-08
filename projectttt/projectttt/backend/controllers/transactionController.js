
const Transaction = require('../models/Transaction');

exports.getAllTransactions = async (req, res) => {
    const { search, page = 1, perPage = 10 } = req.query;
    const query = {};

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: parseFloat(search) }
        ];
    }

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};
