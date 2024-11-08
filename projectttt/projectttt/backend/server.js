
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetchData = require('./services/fetchData');
const transactionRoutes = require('./routes/transactions');
const statsRoutes = require('./routes/stats');
const chartRoutes = require('./routes/charts');
const combinedRoutes = require('./routes/combined');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/combined', combinedRoutes);

fetchData(); // Fetch and initialize database with third-party data

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
