export async function FetchVideosByCategoryName(token, selectedCategory) {
  console.log("#selectedCategory", selectedCategory);
  const response = await fetch(
    `http://localhost:3000/breathworkRoute/videos?category=${selectedCategory}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}
