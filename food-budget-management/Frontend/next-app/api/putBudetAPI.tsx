export default async function PutBudgetAPI(
  token: string | null,
  amount: number,
  month: number,
  year: number,
) {
  try {
    const res = await fetch('http://localhost:5000/api/data/updatebudget', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount, month, year }),
    });
    const data = await res.json();
    console.log("PUT response:", data); // 👈
    return data;
  } catch (error) {
    console.log('Error:', error); // 👈 xem lỗi thật sự
    return null; // 👈 thay vì return undefined
  }
}