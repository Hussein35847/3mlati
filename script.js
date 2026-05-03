// ============================================================
//  3mlati - Currency Converter  |  script.js  v2.0.0
// ============================================================

// ── Fallback exchange rates (base: USD) ──────────────────────
const rates = {
    USD: 1,        EUR: 0.923,    GBP: 0.791,    JPY: 153.8,   CHF: 0.909,
    CAD: 1.372,    AUD: 1.531,    CNY: 7.243,
    JOD: 0.709,    SAR: 3.751,    AED: 3.673,    QAR: 3.641,   KWD: 0.308,
    BHD: 0.377,    EGP: 48.3,     MAD: 10.05,    DZD: 134.5,   TND: 3.128,
    IQD: 1309,     SYP: 15000,    YER: 250.3,
    INR: 83.5,     KRW: 1370,     SGD: 1.356,    HKD: 7.831,   THB: 36.8,
    MYR: 4.78,     IDR: 16200,    PHP: 57.5,
    SEK: 10.9,     NOK: 10.98,    DKK: 6.9,      PLN: 3.98,    CZK: 23.5,
    HUF: 365,      RUB: 93,
    BRL: 5.2,      MXN: 17.1,     ARS: 870,      CLP: 950,     COP: 3900,
    PEN: 3.7,
    ZAR: 18.9,     NGN: 1300,     KES: 133,      GHS: 13.5,    ETB: 57,
    TRY: 32.5,     ILS: 3.76,     BTC: 0.0000154
};

// ── Flag codes (flagcdn.com) – 'ae' is valid for UAE ─────────
const flags = {
    USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', CHF: 'ch', CAD: 'ca', AUD: 'au', CNY: 'cn',
    JOD: 'jo', SAR: 'sa', AED: 'ae', QAR: 'qa', KWD: 'kw', BHD: 'bh', EGP: 'eg',
    MAD: 'ma', DZD: 'dz', TND: 'tn', IQD: 'iq', SYP: 'sy', YER: 'ye',
    INR: 'in', KRW: 'kr', SGD: 'sg', HKD: 'hk', THB: 'th', MYR: 'my', IDR: 'id', PHP: 'ph',
    SEK: 'se', NOK: 'no', DKK: 'dk', PLN: 'pl', CZK: 'cz', HUF: 'hu', RUB: 'ru',
    BRL: 'br', MXN: 'mx', ARS: 'ar', CLP: 'cl', COP: 'co', PEN: 'pe',
    ZAR: 'za', NGN: 'ng', KES: 'ke', GHS: 'gh', ETB: 'et',
    TRY: 'tr', ILS: 'il',
    BTC: '__bitcoin__'   // handled specially
};

// ── English names ─────────────────────────────────────────────
const names = {
    USD: 'US Dollar',          EUR: 'Euro',                GBP: 'British Pound',
    JPY: 'Japanese Yen',       CHF: 'Swiss Franc',         CAD: 'Canadian Dollar',
    AUD: 'Australian Dollar',  CNY: 'Chinese Yuan',
    JOD: 'Jordanian Dinar',    SAR: 'Saudi Riyal',         AED: 'UAE Dirham',
    QAR: 'Qatari Riyal',       KWD: 'Kuwaiti Dinar',       BHD: 'Bahraini Dinar',
    EGP: 'Egyptian Pound',     MAD: 'Moroccan Dirham',     DZD: 'Algerian Dinar',
    TND: 'Tunisian Dinar',     IQD: 'Iraqi Dinar',         SYP: 'Syrian Pound',
    YER: 'Yemeni Rial',
    INR: 'Indian Rupee',       KRW: 'South Korean Won',    SGD: 'Singapore Dollar',
    HKD: 'Hong Kong Dollar',   THB: 'Thai Baht',           MYR: 'Malaysian Ringgit',
    IDR: 'Indonesian Rupiah',  PHP: 'Philippine Peso',
    SEK: 'Swedish Krona',      NOK: 'Norwegian Krone',     DKK: 'Danish Krone',
    PLN: 'Polish Zloty',       CZK: 'Czech Koruna',        HUF: 'Hungarian Forint',
    RUB: 'Russian Ruble',
    BRL: 'Brazilian Real',     MXN: 'Mexican Peso',        ARS: 'Argentine Peso',
    CLP: 'Chilean Peso',       COP: 'Colombian Peso',      PEN: 'Peruvian Sol',
    ZAR: 'South African Rand', NGN: 'Nigerian Naira',      KES: 'Kenyan Shilling',
    GHS: 'Ghanaian Cedi',      ETB: 'Ethiopian Birr',
    TRY: 'Turkish Lira',       ILS: 'Israeli Shekel',      BTC: 'Bitcoin'
};

// ── Arabic names ──────────────────────────────────────────────
const namesAR = {
    USD: 'الدولار الأمريكي',   EUR: 'اليورو',              GBP: 'الجنيه الإسترليني',
    JPY: 'الين الياباني',      CHF: 'الفرنك السويسري',     CAD: 'الدولار الكندي',
    AUD: 'الدولار الأسترالي',  CNY: 'اليوان الصيني',
    JOD: 'الدينار الأردني',    SAR: 'الريال السعودي',      AED: 'الدرهم الإماراتي',
    QAR: 'الريال القطري',      KWD: 'الدينار الكويتي',     BHD: 'الدينار البحريني',
    EGP: 'الجنيه المصري',      MAD: 'الدرهم المغربي',      DZD: 'الدينار الجزائري',
    TND: 'الدينار التونسي',    IQD: 'الدينار العراقي',     SYP: 'الليرة السورية',
    YER: 'الريال اليمني',
    INR: 'الروبية الهندية',    KRW: 'الوون الكوري',        SGD: 'الدولار السنغافوري',
    HKD: 'دولار هونغ كونغ',   THB: 'البات التايلاندي',    MYR: 'الرينغيت الماليزي',
    IDR: 'الروبية الإندونيسية', PHP: 'البيزو الفلبيني',
    SEK: 'الكرونة السويدية',   NOK: 'الكرونة النرويجية',   DKK: 'الكرونة الدنماركية',
    PLN: 'الزلوتي البولندي',   CZK: 'الكرونة التشيكية',   HUF: 'الفورنت المجري',
    RUB: 'الروبل الروسي',
    BRL: 'الريال البرازيلي',   MXN: 'البيزو المكسيكي',    ARS: 'البيزو الأرجنتيني',
    CLP: 'البيزو التشيلي',     COP: 'البيزو الكولومبي',    PEN: 'السول البيروفي',
    ZAR: 'الراند الجنوب أفريقي', NGN: 'النيرة النيجيرية', KES: 'الشلن الكيني',
    GHS: 'السيدي الغاني',      ETB: 'البر الإثيوبي',
    TRY: 'الليرة التركية',     ILS: 'الشيكل الإسرائيلي',  BTC: 'البيتكوين'
};

// ── State ─────────────────────────────────────────────────────
let isArabic = false;

// ── DOM refs ──────────────────────────────────────────────────
const fromCurrency    = document.getElementById('from-currency');
const toCurrency      = document.getElementById('to-currency');
const fromAmount      = document.getElementById('from-amount');
const toAmount        = document.getElementById('to-amount');
const fromFlag        = document.getElementById('from-flag');
const toFlag          = document.getElementById('to-flag');
const fromName        = document.getElementById('from-name');
const toName          = document.getElementById('to-name');
const swapBtn         = document.getElementById('swap-btn');
const exchangeRateText = document.getElementById('exchange-rate-text');
const currentTimeText  = document.getElementById('current-time');

// ── Flag URL helper ───────────────────────────────────────────
function getFlagUrl(code) {
    if (!flags[code]) return '';
    if (flags[code] === '__bitcoin__') {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/40px-Bitcoin.svg.png';
    }
    return `https://flagcdn.com/w80/${flags[code]}.png`;
}

// Safe flag setter with onerror fallback
function setFlag(imgEl, code) {
    const url = getFlagUrl(code);
    if (!url) return;
    imgEl.onerror = () => {
        imgEl.onerror = null;
        imgEl.style.display = 'none';
    };
    imgEl.onload = () => { imgEl.style.display = ''; };
    imgEl.src = url;
    imgEl.alt = code + ' flag';
}

// ── Format number by currency ─────────────────────────────────
function formatCurrency(amount, currency) {
    if (!isFinite(amount) || isNaN(amount)) return '0.00';
    if (currency === 'IQD' || currency === 'SYP' || currency === 'IDR' || currency === 'KRW') {
        return Math.round(amount).toLocaleString('en-US');
    }
    if (currency === 'BTC') {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 });
    }
    if (currency === 'JPY' || currency === 'HUF' || currency === 'CLP' || currency === 'COP') {
        return Math.round(amount).toLocaleString('en-US');
    }
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Main calculation ──────────────────────────────────────────
function calculate() {
    const from   = fromCurrency.value;
    const to     = toCurrency.value;
    const amount = parseFloat(fromAmount.value) || 0;

    if (!rates[from] || !rates[to]) {
        toAmount.value = '—';
        return;
    }

    const converted = (amount / rates[from]) * rates[to];
    toAmount.value  = formatCurrency(converted, to);

    // Exchange rate line: 1 FROM = X TO
    const rate = rates[to] / rates[from];
    let formattedRate;
    if (rate < 0.0001)      formattedRate = rate.toFixed(8);
    else if (rate < 0.01)   formattedRate = rate.toFixed(5);
    else if (rate < 1)      formattedRate = rate.toFixed(4);
    else                    formattedRate = rate.toFixed(2);

    exchangeRateText.textContent = `1 ${from} = ${formattedRate} ${to}`;

    // Flags
    setFlag(fromFlag, from);
    setFlag(toFlag, to);

    // Names
    const n = isArabic ? namesAR : names;
    fromName.textContent = n[from] || from;
    toName.textContent   = n[to]   || to;
}

// ── Swap ──────────────────────────────────────────────────────
function swapCurrencies() {
    const tmp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value   = tmp;

    document.getElementById('from-currency-display').textContent = fromCurrency.value;
    document.getElementById('to-currency-display').textContent   = toCurrency.value;

    // Mini bounce on flags
    [fromFlag, toFlag].forEach(f => {
        f.style.transform = 'scale(0.75)';
        setTimeout(() => f.style.transform = 'scale(1)', 150);
    });

    calculate();
}

// ── Live clock ────────────────────────────────────────────────
function updateTime() {
    const now     = new Date();
    const opts    = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const locale  = isArabic ? 'ar-JO' : 'en-US';
    const prefix  = isArabic ? 'اليوم، ' : 'Today, ';
    currentTimeText.textContent = prefix + now.toLocaleTimeString(locale, opts);
}

// ── Event listeners ───────────────────────────────────────────
fromAmount.addEventListener('input', () => {
    // Block negative
    if (parseFloat(fromAmount.value) < 0) {
        fromAmount.value = Math.abs(parseFloat(fromAmount.value));
    }
    calculate();
});

swapBtn.addEventListener('click', swapCurrencies);

// ── Fetch live rates ──────────────────────────────────────────
const _k = 'ZjMwZDRhYTU4NjAxNzAzMDc2YWJmNzI2';
const API_URL = `https://v6.exchangerate-api.com/v6/${atob(_k)}/latest/USD`;

async function fetchRates() {
    try {
        const res  = await fetch(API_URL);
        const data = await res.json();
        if (data.result === 'success') {
            Object.keys(rates).forEach(code => {
                if (data.conversion_rates[code]) {
                    rates[code] = data.conversion_rates[code];
                }
            });
            calculate();
        }
    } catch (e) {
        console.warn('Live rates unavailable — using fallback rates.', e);
    }
}

// ── Initialise ────────────────────────────────────────────────
setInterval(updateTime, 1000);
updateTime();
calculate();
fetchRates();

// ─────────────────────────────────────────────────────────────
// LANGUAGE TOGGLE
// ─────────────────────────────────────────────────────────────
const langBtn = document.getElementById('lang-btn');

const translations = {
    en: {
        btn:          'عربي',
        subtitle:     'Seamless Currency Transfer',
        youSend:      'You Send',
        theyReceive:  'They Receive',
        exchangeRate: 'Exchange Rate',
        transferFee:  'Transfer Fee',
        noFees:       'No Fees',
        lastUpdated:  'Last Updated',
        secureText:   'Secure &amp; Encrypted &bull; 3mlati &copy; 2026',
        developedBy:  'Developed by',
        pickerTitle:  'Select Currency',
        pickerSearch: 'Search currencies...',
        dir:          'ltr',
        lang:         'en'
    },
    ar: {
        btn:          'English',
        subtitle:     'تحويل عملات سلس',
        youSend:      'من',
        theyReceive:  'إلى',
        exchangeRate: 'سعر الصرف',
        transferFee:  'رسوم التحويل',
        noFees:       'بدون رسوم',
        lastUpdated:  'آخر تحديث',
        secureText:   'آمن ومشفر &bull; عملاتي &copy; 2026',
        developedBy:  'تم التطوير بواسطة',
        pickerTitle:  'اختر العملة',
        pickerSearch: 'ابحث عن عملة...',
        dir:          'rtl',
        lang:         'ar'
    }
};

function setLanguage(arabic) {
    isArabic = arabic;
    const t  = isArabic ? translations.ar : translations.en;

    document.documentElement.dir  = t.dir;
    document.documentElement.lang = t.lang;

    langBtn.textContent = t.btn;

    const el = id => document.getElementById(id);
    const setText = (id, txt) => { const e = el(id); if (e) e.textContent = txt; };
    const setHTML = (id, html) => { const e = el(id); if (e) e.innerHTML = html; };

    setText('subtitle-text',     t.subtitle);
    setText('you-send-text',     t.youSend);
    setText('they-receive-text', t.theyReceive);
    setText('exchange-rate-label', t.exchangeRate);
    setText('transfer-fee-label',  t.transferFee);
    setText('no-fees-text',      t.noFees);
    setText('last-updated-label', t.lastUpdated);
    setText('developed-by-label', t.developedBy);
    setHTML('secure-text',       t.secureText);

    // Picker UI (if visible)
    const pTitle  = el('picker-title');
    const pSearch = el('picker-search');
    if (pTitle)  pTitle.textContent  = t.pickerTitle;
    if (pSearch) pSearch.placeholder = t.pickerSearch;

    // Re-render picker list if open
    if (pickerTarget) renderPickerList(pSearch ? pSearch.value.trim() : '');

    calculate();
    updateTime();
}

langBtn.addEventListener('click', () => setLanguage(!isArabic));

// ─────────────────────────────────────────────────────────────
// CURRENCY PICKER
// ─────────────────────────────────────────────────────────────
const popularCurrencies = ['JOD', 'USD', 'EUR', 'SAR', 'AED', 'EGP', 'GBP', 'TRY'];
const allCurrencyCodes  = Object.keys(rates);
let pickerTarget = null;

const pickerOverlay = document.getElementById('currency-picker-overlay');
const pickerPanel   = document.getElementById('currency-picker');
const pickerSearch  = document.getElementById('picker-search');
const pickerList    = document.getElementById('picker-list');
const pickerTitle   = document.getElementById('picker-title');

function openPicker(target) {
    pickerTarget = target;
    if (pickerSearch) pickerSearch.value = '';

    const t = isArabic ? translations.ar : translations.en;
    if (pickerTitle)  pickerTitle.textContent  = t.pickerTitle;
    if (pickerSearch) pickerSearch.placeholder = t.pickerSearch;

    renderPickerList('');
    pickerOverlay.classList.add('active');
    pickerPanel.classList.add('active');
    setTimeout(() => { if (pickerSearch) pickerSearch.focus(); }, 350);
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
    const input   = document.getElementById(pickerTarget + '-currency');
    const display = document.getElementById(pickerTarget + '-currency-display');
    input.value   = code;
    display.textContent = code;
    calculate();
    closePicker();
}

function renderPickerList(query) {
    const currentVal  = pickerTarget ? document.getElementById(pickerTarget + '-currency').value : '';
    const activeNames = isArabic ? namesAR : names;
    const q = query.toLowerCase();
    let html = '';

    if (!q) {
        html += `<div class="picker-section-label">${isArabic ? '⭐ الأكثر استخداماً' : '⭐ Popular'}</div>`;
        html += '<div class="popular-chips">';
        popularCurrencies.forEach(code => {
            const sel = code === currentVal ? ' selected' : '';
            html += `<div class="popular-chip${sel}" onclick="selectCurrency('${code}')">`;
            html += `<img src="${getFlagUrl(code)}" alt="${code}" onerror="this.style.display='none'">`;
            html += code + '</div>';
        });
        html += '</div>';
        html += '<div class="picker-divider"></div>';
        html += `<div class="picker-section-label">${isArabic ? '🌍 جميع العملات' : '🌍 All Currencies'}</div>`;
    }

    const filtered = allCurrencyCodes.filter(code => {
        if (!q) return true;
        return code.toLowerCase().includes(q)
            || (names[code]   || '').toLowerCase().includes(q)
            || (namesAR[code] || '').toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
        html += `<div class="picker-no-results">${isArabic ? 'لا توجد نتائج' : 'No results found'}</div>`;
    }

    filtered.forEach(code => {
        const sel  = code === currentVal ? ' selected' : '';
        const name = activeNames[code] || code;
        html += `<div class="picker-item${sel}" onclick="selectCurrency('${code}')">`;
        html += `<img src="${getFlagUrl(code)}" alt="${code}" onerror="this.style.display='none'">`;
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

// Attach onerror after rendering (for dynamically added images)
pickerList.addEventListener('error', e => {
    if (e.target.tagName === 'IMG') e.target.style.display = 'none';
}, true);

// Close picker on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && pickerTarget) closePicker();
});

// ─────────────────────────────────────────────────────────────
// SERVICE WORKER (PWA)
// ─────────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.warn('SW failed:', err));
    });
}
