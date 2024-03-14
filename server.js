const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const CORS = require('cors');

const app = express();
const PORT = 1337;

app.use(express.json());
app.use(CORS());

  const quoteData = [
    { id: 0, quote: "The only way to do great work is to love what you do. - Steve Jobs" },
    { id: 1, quote: "In the end, we only regret the chances we didn't take. - Unknown" },
    { id: 2, quote: "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama" },
    { id: 3, quote: "Life is what happens when you're busy making other plans. - John Lennon" },
    { id: 4, quote: "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill" },
    { id: 5, quote: "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela" },
    { id: 6, quote: "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt" },
    { id: 7, quote: "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt" },
    { id: 8, quote: "Don't watch the clock; do what it does. Keep going. - Sam Levenson" },
    { id: 9, quote: "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it. - Jordan Belfort" }
  ];

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'quotes.db'
});

const Quote = sequelize.define('Quote', {
    quote: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// GET /
app.get('/', (req, res) => {
    res.json({message: "time2code"});
})

// GET all quotes
app.get('/quotes', (req, res) => {
    res.json(quoteData);
})

// GET a random quote
app.get('/quotes/random', (req, res) => {
    const currentQuoteIndex = Math.floor(Math.random() * 9);
    const currentQuote = quoteData[currentQuoteIndex];
    res.json(currentQuote);
})

// POST a new quote
app.post('/quotes', async (req, res) => {
    const { quote } = req.body;
    try {
        const newQuote = await Quote.create({ quote });
        res.status(201).json(newQuote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// PUT (update) a quote

// DELETE a quote


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})