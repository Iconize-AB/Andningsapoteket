export async function TrackGlobalWatchedSessionEvent(token, sessionId) {
    const response = await fetch(
      `http://localhost:3000/v1/events/session/watch`,
      {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          sessionId
        }),
      }
    );
    return response;
  }