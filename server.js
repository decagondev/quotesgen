const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const CORS = require('cors');

const app = express();
const PORT = 1337;

app.use(express.json());
app.use(CORS());


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'quotes.db'
});

const Quote = sequelize.define('Quote', {
    quote: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
}
);

sequelize.sync().then(() => {
    console.log('Database synced!');
});

// GET /
app.get('/', (req, res) => {
    res.json({message: "time2code"});
})

// GET all quotes
app.get('/quotes', async (req, res) => {
    try {
        const quotes = await Quote.findAll();
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// GET a random quote
app.get('/quotes/random', async (req, res) => {
    try {
        const quote = await Quote.findOne({ order: Sequelize.literal('random()') });
        res.json(quote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// POST a new quote
app.post('/quotes', async (req, res) => {
    const { quote } = req.body;
    try {
        const newQuote = await Quote.create({ quote });
        res.status(201).json(newQuote);
    } catch (err) {
        console.log('SQL:', err.query);
        console.log('Error:', err.message);
        res.status(500).json({ error: err.message });
    }
})

// PUT (update) a quote

// DELETE a quote


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})