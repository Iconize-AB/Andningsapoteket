export async function GetMostPlayedSessions(token) {
  const response = await fetch(
    "http://localhost:3000/v1/sessions/most-watched",
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

export async function GetHighlightedSessions(token) {
  const response = await fetch(
    "http://localhost:3000/v1/sessions/highlighted",
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
