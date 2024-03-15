const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const CORS = require('cors');

const app = express();
const PORT = 1337;

app.use(express.json());
app.use(CORS());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'quotes.sqlite',
});

const Quote = sequelize.define('Quote', {
  quote: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync().then(() => {
  console.log('Database synced');
});

app.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quote.findAll();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/quotes/random', async (req, res) => {
  try {
    const quote = await Quote.findOne({ order: Sequelize.literal('random()') });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/quotes', async (req, res) => {
  const { quote } = req.body;
  try {
    const newQuote = await Quote.create({ quote });
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/quotes/:id', async (req, res) => {
  const { id } = req.params;
  const { quote } = req.body;
  try {
    const updatedQuote = await Quote.update({ quote }, { where: { id } });
    if (updatedQuote[0] === 0) {
      res.status(404).json({ error: 'Quote not found' });
    } else {
      res.json({ message: 'Quote updated' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/quotes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuote = await Quote.destroy({ where: { id } });
    if (deletedQuote === 0) {
      res.status(404).json({ error: 'Quote not found' });
    } else {
      res.json({ message: 'Quote deleted' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});