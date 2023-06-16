function calculateIncomeAfterTaxes(incomeAmount, taxRate) {
    const taxAmount = incomeAmount * (taxRate / 100);
    const incomeAfterTaxes = incomeAmount - taxAmount;
    return incomeAfterTaxes;
  }