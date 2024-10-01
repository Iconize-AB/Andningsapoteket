export async function GetMostPlayedSessions(token) {
    const response = await fetch(
      "http://localhost:3000/breathworkRoute/videos/most-watched",
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