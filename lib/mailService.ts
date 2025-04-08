// lib/mailService.ts
export const sendBudgetAlertEmail = async (
  to: string,
  budget: number,
  currency: string,
  message: string
) => {
  const res = await fetch('/api/sendBudgetAlertEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ to, budget, currency, message })
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to send email');
  }
  return await res.json();
};
