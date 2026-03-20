export default async function PostCategoryAPI(
  token: string | null,
  name: string
) {
  if (!name) return;
  try {
    const res = await fetch('http://localhost:5000/api/data/newcategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name
      }),
    });
    
    return res.json();
  } catch (error) {
    console.log('New category creation failed: ' + error);
  }
}