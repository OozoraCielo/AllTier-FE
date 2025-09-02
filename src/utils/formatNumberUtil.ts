export default function formatNumber(numberString: string): string {
  const number = parseInt(numberString, 10);

  // Return original string if it's not a valid number or is less than 1000
  if (isNaN(number) || number < 1000) {
    return numberString;
  }

  // Use the Intl.NumberFormat API for compact notation
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
}