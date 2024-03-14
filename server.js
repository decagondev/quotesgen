const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 1337;

app.use(express.json());

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

// GET a random quote

// POST a new quote

// PUT (update) a quote

// DELETE a quote


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})