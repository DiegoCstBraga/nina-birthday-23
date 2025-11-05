export function isCurrentDateAfterOrEqualNiver() {
  const targetDate = new Date(2025, 10, 7);

  // Data atual
  const currentDate = new Date();

  targetDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  return currentDate >= targetDate;
}
