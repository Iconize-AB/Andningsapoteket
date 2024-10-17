export async function GetSixDayChallenge(token) {
  const response = await fetch(
    "http://localhost:3000/v1/challenge/six-day-challenge",
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
