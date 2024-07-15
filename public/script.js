document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('#searchForm');
    const searchInput = document.querySelector('#searchInput');
    const resultsDiv = document.querySelector('#results');

    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = searchInput.value;
  
      fetch(`/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
          resultsDiv.innerHTML = '';
          if (data.results.length) {
            data.results.forEach(result => {
              const resultElement = document.createElement('div');
              resultElement.textContent = result;
              resultsDiv.appendChild(resultElement);
            });
          } else {
            resultsDiv.textContent = 'No results found';
          }
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
          resultsDiv.textContent = 'An error occurred. Please try again.';
        });
    });
  });
  