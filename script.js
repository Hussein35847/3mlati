const rates = {
    USD: 1, EUR: 0.92, GBP: 0.79, JPY: 154.0, CHF: 0.91, CAD: 1.37, AUD: 1.53, CNY: 7.24,
    JOD: 0.709, SAR: 3.75, AED: 3.67, QAR: 3.64, KWD: 0.31, BHD: 0.38, EGP: 48.0, MAD: 10.0, DZD: 134.0, TND: 3.13, IQD: 1310, SYP: 15000, YER: 250.3,
    INR: 83.5, KRW: 1370.0, SGD: 1.36, HKD: 7.83, THB: 36.8, MYR: 4.78, IDR: 16200.0, PHP: 57.5,
    SEK: 10.9, NOK: 11.0, DKK: 6.9, PLN: 4.0, CZK: 23.5, HUF: 365.0, RUB: 93.0,
    BRL: 5.2, MXN: 17.0, ARS: 870.0, CLP: 950.0, COP: 3900.0, PEN: 3.7,
    ZAR: 18.9, NGN: 1300.0, KES: 133.0, GHS: 13.5, ETB: 57.0,
    TRY: 32.50, ILS: 3.76, BTC: 0.000015
};

const flags = {
    USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', CHF: 'ch', CAD: 'ca', AUD: 'au', CNY: 'cn',
    JOD: 'jo', SAR: 'sa', AED: 'ae', QAR: 'qa', KWD: 'kw', BHD: 'bh', EGP: 'eg', MAD: 'ma', DZD: 'dz', TND: 'tn', IQD: 'iq', SYP: 'sy', YER: 'ye',
    INR: 'in', KRW: 'kr', SGD: 'sg', HKD: 'hk', THB: 'th', MYR: 'my', IDR: 'id', PHP: 'ph',
    SEK: 'se', NOK: 'no', DKK: 'dk', PLN: 'pl', CZK: 'cz', HUF: 'hu', RUB: 'ru',
    BRL: 'br', MXN: 'mx', ARS: 'ar', CLP: 'cl', COP: 'co', PEN: 'pe',
    ZAR: 'za', NGN: 'ng', KES: 'ke', GHS: 'gh', ETB: 'et',
    TRY: 'tr', ILS: 'il', BTC: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/40px-Bitcoin.svg.png'
};

let isArabic = false;

const names = {
    USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', JPY: 'Japanese Yen', CHF: 'Swiss Franc', CAD: 'Canadian Dollar', AUD: 'Australian Dollar', CNY: 'Chinese Yuan',
    JOD: 'Jordanian Dinar', SAR: 'Saudi Riyal', AED: 'UAE Dirham', QAR: 'Qatari Riyal', KWD: 'Kuwaiti Dinar', BHD: 'Bahraini Dinar', EGP: 'Egyptian Pound', MAD: 'Moroccan Dirham', DZD: 'Algerian Dinar', TND: 'Tunisian Dinar', IQD: 'Iraqi Dinar', SYP: 'Syrian Pound', YER: 'Yemeni Rial',
    INR: 'Indian Rupee', KRW: 'South Korean Won', SGD: 'Singapore Dollar', HKD: 'Hong Kong Dollar', THB: 'Thai Baht', MYR: 'Malaysian Ringgit', IDR: 'Indonesian Rupiah', PHP: 'Philippine Peso',
    SEK: 'Swedish Krona', NOK: 'Norwegian Krone', DKK: 'Danish Krone', PLN: 'Polish Zloty', CZK: 'Czech Koruna', HUF: 'Hungarian Forint', RUB: 'Russian Ruble',
    BRL: 'Brazilian Real', MXN: 'Mexican Peso', ARS: 'Argentine Peso', CLP: 'Chilean Peso', COP: 'Colombian Peso', PEN: 'Peruvian Sol',
    ZAR: 'South African Rand', NGN: 'Nigerian Naira', KES: 'Kenyan Shilling', GHS: 'Ghanaian Cedi', ETB: 'Ethiopian Birr',
    TRY: 'Turkish Lira', ILS: 'Israeli New Shekel', BTC: 'Bitcoin'
};

const namesAR = {
    USD: 'الدولار الأمريكي', EUR: 'اليورو', GBP: 'الجنيه الإسترليني', JPY: 'الين الياباني', CHF: 'الفرنك السويسري', CAD: 'الدولار الكندي', AUD: 'الدولار الأسترالي', CNY: 'اليوان الصيني',
    JOD: 'الدينار الأردني', SAR: 'الريال السعودي', AED: 'الدرهم الإماراتي', QAR: 'الريال القطري', KWD: 'الدينار الكويتي', BHD: 'الدينار البحريني', EGP: 'الجنيه المصري', MAD: 'الدرهم المغربي', DZD: 'الدينار الجزائري', TND: 'الدينار التونسي', IQD: 'الدينار العراقي', SYP: 'الليرة السورية', YER: 'الريال اليمني',
    INR: 'الروبية الهندية', KRW: 'الوون الكوري', SGD: 'الدولار السنغافوري', HKD: 'دولار هونغ كونغ', THB: 'البات التايلاندي', MYR: 'الرينغيت الماليزي', IDR: 'الروبية الإندونيسية', PHP: 'البيزو الفلبيني',
    SEK: 'الكرونة السويدية', NOK: 'الكرونة النرويجية', DKK: 'الكرونة الدنماركية', PLN: 'الزلوتي البولندي', CZK: 'الكرونة التشيكية', HUF: 'الفورنت المجري', RUB: 'الروبل الروسي',
    BRL: 'الريال البرازيلي', MXN: 'البيزو المكسيكي', ARS: 'البيزو الأرجنتيني', CLP: 'البيزو التشيلي', COP: 'البيزو الكولومبي', PEN: 'السول البيروفي',
    ZAR: 'الراند الجنوب أفريقي', NGN: 'النيرة النيجيرية', KES: 'الشلن الكيني', GHS: 'السيدي الغاني', ETB: 'البر الإثيوبي',
    TRY: 'الليرة التركية', ILS: 'الشيكل الإسرائيلي', BTC: 'البيتكوين'
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
    if (currency === 'IQD' || currency === 'SYP') {
        // These currencies typically don't use decimal places in common usage due to high values
        return Math.round(amount).toLocaleString('en-US');
    }
    if (currency === 'BTC') {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 });
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
    if (!rates[from] || !rates[to]) {
        toAmount.value = "Error";
        return;
    }

    const baseAmount = amount / rates[from];
    const convertedAmount = baseAmount * rates[to];

    toAmount.value = formatCurrency(convertedAmount, to);

    // Update Exchange Rate Text (1 From = X To)
    const singleUnitBase = 1 / rates[from];
    const singleUnitConverted = singleUnitBase * rates[to];
    
    // Format the exchange rate nicely
    let formattedRate;
    if (singleUnitConverted < 0.0001) {
        formattedRate = singleUnitConverted.toFixed(8);
    } else if (singleUnitConverted < 0.01) {
        formattedRate = singleUnitConverted.toFixed(5);
    } else {
        formattedRate = singleUnitConverted.toFixed(2);
    }
    
    exchangeRateText.textContent = `1 ${from} = ${formattedRate} ${to}`;
    
    // Update labels and flags
    if (flags[from]) {
        fromFlag.src = flags[from].startsWith('http') ? flags[from] : `https://flagcdn.com/w40/${flags[from]}.png`;
    }
    if (flags[to]) {
        toFlag.src = flags[to].startsWith('http') ? flags[to] : `https://flagcdn.com/w40/${flags[to]}.png`;
    }
    
    const activeNames = isArabic ? namesAR : names;
    fromName.textContent = activeNames[from] || from;
    toName.textContent = activeNames[to] || to;
}

// Swap currencies
function swapCurrencies() {
    const tempCurrency = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;
    
    // Sync display spans
    document.getElementById('from-currency-display').textContent = fromCurrency.value;
    document.getElementById('to-currency-display').textContent = toCurrency.value;
    
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
    const timeStr = now.toLocaleTimeString(isArabic ? 'ar-JO' : 'en-US', options);
    const prefix = isArabic ? 'اليوم، ' : 'Today, ';
    currentTimeText.textContent = `${prefix}${timeStr}`;
}

// Event Listeners
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
            // Update rates from API.
            Object.keys(rates).forEach(currency => {
                if (data.conversion_rates[currency]) {
                    rates[currency] = data.conversion_rates[currency];
                }
            });
            
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

// Language Toggle
const langBtn = document.getElementById('lang-btn');
const els = {
    subtitle: document.getElementById('subtitle-text'),
    youSend: document.getElementById('you-send-text'),
    theyReceive: document.getElementById('they-receive-text'),
    exchangeRateLabel: document.getElementById('exchange-rate-label'),
    transferFeeLabel: document.getElementById('transfer-fee-label'),
    noFees: document.getElementById('no-fees-text'),
    lastUpdatedLabel: document.getElementById('last-updated-label'),
    secureText: document.getElementById('secure-text'),
    developedByLabel: document.getElementById('developed-by-label')
};

const translations = {
    en: {
        btn: 'عربي',
        subtitle: 'Seamless Currency Transfer',
        youSend: 'You Send',
        theyReceive: 'They Receive',
        exchangeRate: 'Exchange Rate',
        transferFee: 'Transfer Fee',
        noFees: 'No Fees',
        lastUpdated: 'Last Updated',
        secureText: 'Secure & Encrypted &bull; 3mlati &copy; 2026',
        developedBy: 'Developed by',
        dir: 'ltr'
    },
    ar: {
        btn: 'English',
        subtitle: 'تحويل عملات سلس',
        youSend: 'من',
        theyReceive: 'الى',
        exchangeRate: 'سعر الصرف',
        transferFee: 'رسوم التحويل',
        noFees: 'بدون رسوم',
        lastUpdated: 'آخر تحديث',
        secureText: 'آمن ومشفر &bull; عملاتي &copy; 2026',
        developedBy: 'تم التطوير بواسطة',
        dir: 'rtl'
    }
};

function toggleLanguage() {
    isArabic = !isArabic;
    const t = isArabic ? translations.ar : translations.en;
    
    document.documentElement.dir = t.dir;
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    langBtn.textContent = t.btn;
    if (els.subtitle) els.subtitle.textContent = t.subtitle;
    if (els.youSend) els.youSend.textContent = t.youSend;
    if (els.theyReceive) els.theyReceive.textContent = t.theyReceive;
    if (els.exchangeRateLabel) els.exchangeRateLabel.textContent = t.exchangeRate;
    if (els.transferFeeLabel) els.transferFeeLabel.textContent = t.transferFee;
    if (els.noFees) els.noFees.textContent = t.noFees;
    if (els.lastUpdatedLabel) els.lastUpdatedLabel.textContent = t.lastUpdated;
    if (els.secureText) els.secureText.innerHTML = t.secureText;
    if (els.developedByLabel) els.developedByLabel.textContent = t.developedBy;
    
    calculate();
    updateTime();
}

if (langBtn) {
    langBtn.addEventListener('click', toggleLanguage);
}

// ========== Currency Picker ==========
const popularCurrencies = ['USD', 'EUR', 'GBP', 'JOD', 'SAR', 'AED', 'EGP', 'TRY'];
const allCurrencyCodes = Object.keys(rates);
let pickerTarget = null; // 'from' or 'to'

const pickerOverlay = document.getElementById('currency-picker-overlay');
const pickerPanel = document.getElementById('currency-picker');
const pickerSearch = document.getElementById('picker-search');
const pickerList = document.getElementById('picker-list');
const pickerTitle = document.getElementById('picker-title');

function getFlagUrl(code) {
    const f = flags[code];
    if (!f) return '';
    return f.startsWith('http') ? f : `https://flagcdn.com/w40/${f}.png`;
}

function openPicker(target) {
    pickerTarget = target;
    pickerSearch.value = '';
    pickerTitle.textContent = isArabic ? 'اختر العملة' : 'Select Currency';
    pickerSearch.placeholder = isArabic ? 'ابحث عن عملة...' : 'Search currencies...';
    renderPickerList('');
    pickerOverlay.classList.add('active');
    pickerPanel.classList.add('active');
    setTimeout(() => pickerSearch.focus(), 350);
}

function closePicker() {
    pickerOverlay.classList.remove('active');
    pickerPanel.classList.remove('active');
    pickerTarget = null;
}

function filterCurrencies() {
    renderPickerList(pickerSearch.value.trim());
}

function selectCurrency(code) {
    if (!pickerTarget) return;
    const input = document.getElementById(pickerTarget + '-currency');
    const display = document.getElementById(pickerTarget + '-currency-display');
    input.value = code;
    display.textContent = code;
    calculate();
    closePicker();
}

function renderPickerList(query) {
    const currentVal = pickerTarget ? document.getElementById(pickerTarget + '-currency').value : '';
    const activeNames = isArabic ? namesAR : names;
    const q = query.toLowerCase();
    let html = '';

    // --- Popular section (hidden when searching) ---
    if (!q) {
        html += `<div class="picker-section-label">${isArabic ? '⭐ الأكثر استخداماً' : '⭐ Popular'}</div>`;
        html += '<div class="popular-chips">';
        popularCurrencies.forEach(code => {
            const sel = code === currentVal ? ' selected' : '';
            html += `<div class="popular-chip${sel}" onclick="selectCurrency('${code}')">`;
            html += `<img src="${getFlagUrl(code)}" alt="${code}"> ${code}`;
            html += '</div>';
        });
        html += '</div>';
        html += '<div class="picker-divider"></div>';
        html += `<div class="picker-section-label">${isArabic ? '🌍 جميع العملات' : '🌍 All Currencies'}</div>`;
    }

    // --- Filter ---
    const filtered = allCurrencyCodes.filter(code => {
        if (!q) return true;
        const enName = (names[code] || '').toLowerCase();
        const arName = (namesAR[code] || '').toLowerCase();
        return code.toLowerCase().includes(q) || enName.includes(q) || arName.includes(q);
    });

    if (filtered.length === 0) {
        html += `<div class="picker-no-results">${isArabic ? 'لا توجد نتائج' : 'No results found'}</div>`;
    }

    filtered.forEach(code => {
        const sel = code === currentVal ? ' selected' : '';
        const name = activeNames[code] || code;
        html += `<div class="picker-item${sel}" onclick="selectCurrency('${code}')">`;
        html += `<img src="${getFlagUrl(code)}" alt="${code}">`;
        html += '<div class="picker-item-info">';
        html += `<div class="picker-item-code">${code}</div>`;
        html += `<div class="picker-item-name">${name}</div>`;
        html += '</div>';
        html += `<ion-icon name="checkmark-outline" class="picker-item-check"></ion-icon>`;
        html += '</div>';
    });

    pickerList.innerHTML = html;
    pickerList.scrollTop = 0;
}
