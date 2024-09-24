export async function FetchUserProfile(token) {
  const response = await fetch(
    "http://localhost:3000/profileRoute/fetch-profile",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}
