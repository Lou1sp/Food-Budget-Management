export default async function PostBudgetAPI(
  token: string | null,
  amount: number,
  month: number,
  year: number,
) {
  if (!amount || !month || !year) return;
  try {
    const res = await fetch('http://localhost:5000/api/data/newbudget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: amount,
        month: month,
        year: year,
      }),
    });
    return res.json();
  } catch (error) {
    console.log('New category creation failed: ' + error);
  }
}
