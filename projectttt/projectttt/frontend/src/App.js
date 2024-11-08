
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, [page, search]);

    const fetchTransactions = async () => {
        const response = await axios.get('http://localhost:3001/api/transactions', {
            params: { search, page }
        });
        setTransactions(response.data);
    };

    return (
        <div className="App">
            <h1>Transactions</h1>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
            />
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction._id}>
                        {transaction.title} - ${transaction.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
