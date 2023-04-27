const CURRENCY = {
  NGN: 'NGN',
  USD: 'USD',
};

const LOCALE = {
  NG: 'en-NG',
  US: 'en-US',
};

const CURRENCY_FORMATTER = new Intl.NumberFormat(LOCALE.NG, {
  currency: CURRENCY.NGN,
  style: 'currency',
});

export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}


export function formatDate(date) {
  const parsedDate = Date.parse(date);
  if (isNaN(parsedDate)) {
    return 'Invalid Date';
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    // year: 'numeric',
    // month: 'short',
    // day: '2-digit',
    // hour: 'numeric',
    // minute: 'numeric',
    hour12: true,
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(parsedDate);

  return formattedDate;
}
