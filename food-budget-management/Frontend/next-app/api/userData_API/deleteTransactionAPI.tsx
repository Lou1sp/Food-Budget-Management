export default async function DeleteTransactionAPI(
  token: string | null,
  transaction_id: number,
) {
  if (!transaction_id) return;

  try {
    const res = await fetch(
      `http://localhost:5000/api/data/deletetransaction?transaction_id=${transaction_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.json();
  } catch (error) {
    console.log('Delete transaction failed: ' + error);
  }
}
