const API_URL = 'http://localhost:1337/quotes';

async function fetchAllQuotes() {
    const response = await fetch(API_URL);
}

async function getRandomQuote() {
    const response = await fetch(`${API_URL}/random`);
    const quote = await response.json();
    const randomQuoteContainer = document.querySelector('#random-quote');
    randomQuoteContainer.textContent = quote.quote;
}