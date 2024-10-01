export async function TrackGlobalWatchedSessionEvent(token, videoId) {
    const response = await fetch(
      `http://localhost:3000/eventsRoute/videos/watch`,
      {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            videoId
        }),
      }
    );
    return response;
  }