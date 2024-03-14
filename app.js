const API_URL = 'http://localhost:1337/quotes';

async function fetchAllQuotes() {
    const response = await fetch(API_URL);
    const quotes = await response.json();
    const quotesContainer = document.querySelector('#quotes-container');
    quotesContainer.innerHTML = '';

    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('quote');

        const quoteText = document.createElement('p');
        quoteText.classList.add('quote-text');

        quoteText.textContent = quote.quote;
        quoteElement.appendChild(quoteText);

        quotesContainer.appendChild(quoteElement);
    });    
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

window.addEventListener('load', fetchAllQuotes);
document.querySelector('#quote-form').addEventListener('submit', saveQuote);