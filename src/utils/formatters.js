/**
 * Format number to Indonesian Rupiah currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted Rupiah string (e.g., "Rp 2.500.000")
 */
export const formatRupiah = (amount) => {
  if (!amount && amount !== 0) return 'Rp 0';
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

