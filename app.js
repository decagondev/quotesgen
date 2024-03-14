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

async function saveQuote(event) {
    event.preventDefault();

    const quoteIdInput = document.querySelector('#quote-id');
    const quoteTextInput = document.querySelector('#quote-text');

    const quote = quoteTextInput.value.trim();
    if (!quote) {
        alert('Please enter a quote');
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quote })
    };

    let response;

    if (quoteIdInput.value) {
        // TODO: do the PUT (update) operation here
        response = { ok: null };
    } else {
        quoteIdInput.value = 1;
        requestOptions.body.id = 1;
        response = await fetch(API_URL, requestOptions);
    }

    if (response.ok) {
        quoteIdInput.value = '';
        quoteTextInput.value = ''
        await fetchAllQuotes();
    } else {
        alert('Error saving quote');
    }
}


document.querySelector('#quote-form').addEventListener('submit', saveQuote);