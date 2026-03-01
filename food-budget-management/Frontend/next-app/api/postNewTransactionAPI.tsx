export default async function PostTransactionAPI(
  token: string | null,
  category_id: number | undefined,
  amount: number | undefined,
  date: string | undefined,
  note: string | undefined,
) {
  if (!date) return;
  try {
    const res = await fetch('http://localhost:5000/api/data/newtransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category_id: category_id,
        amount: amount,
        spent_at: new Date(date),
        note: note,
      }),
    });
    return res.json();
  } catch (error) {
    console.log('New transaction creation failed: ' + error);
  }
}
