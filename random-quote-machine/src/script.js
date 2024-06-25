document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.getElementById('text');
  const authorElement = document.getElementById('author');
  const newQuoteButton = document.getElementById('new-quote');
  const tweetQuoteLink = document.getElementById('tweet-quote');

  let currentQuote = '';
  let currentAuthor = '';

  // Function to fetch a new quote from an API
  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      currentQuote = data.content;
      currentAuthor = data.author;
      updateQuote();
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  // Function to update the quote and author in the DOM
  const updateQuote = () => {
    textElement.textContent = currentQuote;
    authorElement.textContent = `- ${currentAuthor}`;
    updateTweetLink();
  };

  // Function to update the tweet link with the current quote and author
  const updateTweetLink = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text="${currentQuote}" - ${currentAuthor}`;
    tweetQuoteLink.setAttribute('href', tweetUrl);
  };

  // Event listener for the New Quote button
  newQuoteButton.addEventListener('click', fetchQuote);

  // Initial fetch for a quote on page load
  fetchQuote();
});