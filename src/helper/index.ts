const getNextInstallmentDate = (date: Date): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + 30);

  while (result.getDay() === 0 || result.getDay() === 6) {
    result.setDate(result.getDate() + 1);
  }

  return result;
}

export { getNextInstallmentDate }
