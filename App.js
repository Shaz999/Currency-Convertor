document.addEventListener('DOMContentLoaded', function () {
  const amountInput = document.querySelector('.Amount input');
  const fromCurrencySelect = document.querySelector('.from select');
  const toCurrencySelect = document.querySelector('.To select');
  const exchangeRateMsg = document.querySelector('.msg');
  const getExchangeRateBtn = document.querySelector('button');

  getExchangeRateBtn.addEventListener('click', async function (event) {
      event.preventDefault(); // Prevent form submission
      
      const amount = parseFloat(amountInput.value);
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;

      const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
      
      if (exchangeRate !== null) {
          const convertedAmount = amount * exchangeRate;
          exchangeRateMsg.textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
          alert(`${amount} ${fromCurrency} equals ${convertedAmount} ${toCurrency}`);
      } else {
          exchangeRateMsg.textContent = 'Error fetching exchange rates.';
      }
  });

  async function getExchangeRate(fromCurrency, toCurrency) {
      try {
          const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
          const data = await response.json();
          
          if (data.rates[toCurrency]) {
              return data.rates[toCurrency];
          } else {
              return null;
          }
      } catch (error) {
          console.error('Error fetching exchange rates:', error);
          return null;
      }
  }
});
