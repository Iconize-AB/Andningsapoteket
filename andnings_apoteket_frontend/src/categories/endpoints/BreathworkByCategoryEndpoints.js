export async function FetchVideosByCategoryName(token, selectedCategory) {
  const response = await fetch(
    `http://localhost:3000/v1/sessions/recordings?category=${selectedCategory}`,
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

export async function FetchVideosByCondition(token, condition) {
  const response = await fetch(
    `http://localhost:3000/v1/sessions/recordings/by-condition?condition=${condition}`,
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


