export const sendBudgetAlertEmail = async (to: string, budget: number, currency: string) => {
    const res = await fetch('/api/sendBudgetAlertEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to, budget, currency })
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to send email');
    }
    return await res.json();
  };
  