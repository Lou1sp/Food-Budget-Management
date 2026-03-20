export default async function DeleteCategoryAPI(
  token: string | null,
  category_id: number
) {
  if (!category_id) return;

  try {
    const res = await fetch(
      `http://localhost:5000/api/data/deletecategory?category_id=${category_id}`, //DELETE API shouldnt include information inside the BODY
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.json();
  } catch (error) {
    console.log('Delete category failed: ' + error);
  }
}