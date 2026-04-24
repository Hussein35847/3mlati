const rates = {
    USD: 1,
    JOD: 0.709,
    EUR: 0.92,
    TRY: 32.50,
    IRQ: 1310,
    SYR: 15000
};

const flags = {
    USD: 'us',
    JOD: 'jo',
    EUR: 'eu',
    TRY: 'tr',
    IRQ: 'iq',
    SYR: 'sy'
};

const names = {
    USD: 'US Dollar',
    JOD: 'Jordanian Dinar',
    EUR: 'Euro',
    TRY: 'Turkish Lira',
    IRQ: 'Iraqi Dinar',
    SYR: 'Syrian Pound'
};

// DOM Elements
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const fromAmount = document.getElementById('from-amount');
const toAmount = document.getElementById('to-amount');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const fromName = document.getElementById('from-name');
const toName = document.getElementById('to-name');
const swapBtn = document.getElementById('swap-btn');
const exchangeRateText = document.getElementById('exchange-rate-text');
const currentTimeText = document.getElementById('current-time');

// Format number based on currency
function formatCurrency(amount, currency) {
    if (currency === 'IRQ' || currency === 'SYR') {
        // These currencies typically don't use decimal places in common usage due to high values
        return Math.round(amount).toLocaleString('en-US');
    }
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Convert unformatted string back to number
function parseFormattedNumber(value) {
    return parseFloat(value.replace(/,/g, '')) || 0;
}

// Calculate and update UI
function calculate() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(fromAmount.value) || 0;

    // Conversion logic: (Amount / FromRate) * ToRate
    const baseAmount = amount / rates[from];
    const convertedAmount = baseAmount * rates[to];

    toAmount.value = formatCurrency(convertedAmount, to);

    // Update Exchange Rate Text (1 From = X To)
    const singleUnitBase = 1 / rates[from];
    const singleUnitConverted = singleUnitBase * rates[to];
    
    // Format the exchange rate nicely
    let formattedRate;
    if (singleUnitConverted < 0.01) {
        formattedRate = singleUnitConverted.toFixed(5);
    } else {
        formattedRate = singleUnitConverted.toFixed(2);
    }
    
    exchangeRateText.textContent = `1 ${from} = ${formattedRate} ${to}`;
    
    // Update labels and flags
    fromFlag.src = `https://flagcdn.com/w40/${flags[from]}.png`;
    toFlag.src = `https://flagcdn.com/w40/${flags[to]}.png`;
    fromName.textContent = names[from];
    toName.textContent = names[to];
}

// Swap currencies
function swapCurrencies() {
    const tempCurrency = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;
    
    // Add a quick animation class to flags
    fromFlag.style.transform = 'scale(0.8)';
    toFlag.style.transform = 'scale(0.8)';
    setTimeout(() => {
        fromFlag.style.transform = 'scale(1)';
        toFlag.style.transform = 'scale(1)';
    }, 150);

    calculate();
}

// Update time
function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    currentTimeText.textContent = `Today, ${now.toLocaleTimeString('en-US', options)}`;
}

// Event Listeners
fromCurrency.addEventListener('change', calculate);
toCurrency.addEventListener('change', calculate);
fromAmount.addEventListener('input', calculate);
swapBtn.addEventListener('click', swapCurrencies);

// Fetch Live Rates
// API Key is obfuscated to prevent simple plain-text scraping
const _k = 'ZjMwZDRhYTU4NjAxNzAzMDc2YWJmNzI2';
const API_URL = `https://v6.exchangerate-api.com/v6/${atob(_k)}/latest/USD`;

async function fetchRates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.result === 'success') {
            // Update rates from API. Mapping IRQ to IQD and SYR to SYP.
            rates.USD = data.conversion_rates.USD || rates.USD;
            rates.JOD = data.conversion_rates.JOD || rates.JOD;
            rates.EUR = data.conversion_rates.EUR || rates.EUR;
            rates.TRY = data.conversion_rates.TRY || rates.TRY;
            rates.IRQ = data.conversion_rates.IQD || rates.IRQ; 
            rates.SYR = data.conversion_rates.SYP || rates.SYR; 
            
            calculate();
        } else {
            console.error('Failed to fetch rates', data);
        }
    } catch (error) {
        console.error('Error fetching rates:', error);
    }
}

// Init
setInterval(updateTime, 1000);
updateTime();
calculate(); // Initial calculation with static rates
fetchRates(); // Fetch live ones immediately
