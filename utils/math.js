// Simple calculator for ticket pricing
export function calculateTicketPrice(basePrice, discount = 0) {
    return basePrice * (1 - discount / 100);
  }
  
  export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }
  