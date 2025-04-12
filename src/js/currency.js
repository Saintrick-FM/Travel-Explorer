const EXCHANGE_API_KEY = 'YOUR_API_KEY'; // Replace with actual API key

export function initCurrency() {
  // Initialize currency module
}

export async function updateCurrency(destination) {
  const converterContent = document.querySelector('.converter-content');
  
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/USD`
    );
    
    if (!response.ok) throw new Error('Currency data not found');
    
    const data = await response.json();
    
    converterContent.innerHTML = `
      <div class="converter-card">
        <h3>Currency Converter</h3>
        <div class="converter-form">
          <div class="input-group">
            <label for="amount">Amount</label>
            <div class="currency-input">
              <input type="number" id="amount" value="1" min="0" step="0.01">
              <select id="from-currency">
                ${Object.keys(data.rates).map(currency => 
                  `<option value="${currency}" ${currency === 'USD' ? 'selected' : ''}>${currency}</option>`
                ).join('')}
              </select>
            </div>
          </div>
          
          <div class="swap-icon">
            <i class="fas fa-exchange-alt"></i>
          </div>
          
          <div class="input-group">
            <label for="result">Converted Amount</label>
            <div class="currency-input">
              <input type="number" id="result" readonly>
              <select id="to-currency">
                ${Object.keys(data.rates).map(currency => 
                  `<option value="${currency}" ${currency === 'EUR' ? 'selected' : ''}>${currency}</option>`
                ).join('')}
              </select>
            </div>
          </div>
        </div>
        <p class="rate-info" id="rate-info"></p>
      </div>
    `;
    
    // Add event listeners for currency conversion
    setupCurrencyConverterEvents(data.rates);
  } catch (error) {
    converterContent.innerHTML = '<p class="error">Currency converter unavailable</p>';
    console.error('Error fetching currency data:', error);
  }
}

function setupCurrencyConverterEvents(rates) {
  const amount = document.getElementById('amount');
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const result = document.getElementById('result');
  const rateInfo = document.getElementById('rate-info');
  const swapIcon = document.querySelector('.swap-icon');

  function updateRateInfo() {
    const fromRate = rates[fromCurrency.value];
    const toRate = rates[toCurrency.value];
    const rate = toRate / fromRate;
    rateInfo.textContent = `1 ${fromCurrency.value} = ${rate.toFixed(4)} ${toCurrency.value}`;
  }

  function convert() {
    const fromRate = rates[fromCurrency.value];
    const toRate = rates[toCurrency.value];
    const convertedAmount = (amount.value * toRate) / fromRate;
    result.value = convertedAmount.toFixed(2);
    updateRateInfo();
  }

  function swapCurrencies() {
    const tempCurrency = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;
    convert();
  }

  amount.addEventListener('input', convert);
  fromCurrency.addEventListener('change', convert);
  toCurrency.addEventListener('change', convert);
  swapIcon.addEventListener('click', swapCurrencies);

  // Initial conversion
  convert();
}