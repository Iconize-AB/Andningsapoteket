export async function inviteFriends(token, emails) {
  const response = await fetch(
    "http://localhost:3000/v1/invitations/invite-friends",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emails,
      }),
    }
  );
  return response;
}
