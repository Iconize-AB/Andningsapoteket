export async function FetchUserProfile(token) {
  const response = await fetch(
    "http://localhost:3000/v1/profile/fetch-profile",
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

export async function ChangeUserDetails(token, userDetails) {
  const response = await fetch(
    "http://localhost:3000/v1/profile/update/user",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: userDetails.fullName,
        email: userDetails.email,
      }),
    }
  );
  return response;
}
