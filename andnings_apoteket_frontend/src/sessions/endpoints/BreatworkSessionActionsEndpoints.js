export async function AddVideoToPlaylist(token, listName, listId, sessionId) {
  console.log('listName', listName, listId, sessionId);
  const response = await fetch(
    "http://localhost:3000/v1/playlists/add-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ listName, listId, sessionId }),
    }
  );

  if (!response.ok) {
    console.error("Failed to add video to playlist:", response.statusText);
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

export async function FetchUserPlaylists(token) {
  const response = await fetch(
    "http://localhost:3000/v1/playlists/fetch",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch playlists and added sessions:",
      response.statusText
    );
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

export async function FetchUserLibrary(token) {
  const response = await fetch("http://localhost:3000/v1/library/fetch", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch library:", response.statusText);
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

export async function AddVideoToLibrary(token, sessionId) {
  const response = await fetch(
    "http://localhost:3000/v1/library/add-video",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sessionId }),
    }
  );

  if (!response.ok) {
    console.error("Failed to add video to library:", response.statusText);
    throw new Error(`Error: ${response.statusText}`);
  }

  return response;
}

export async function DeleteUserPlaylist(token, playlistId) {
  const response = await fetch(
    `http://localhost:3000/v1/playlists/delete/${playlistId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to delete playlist:", response.statusText);
    throw new Error(`Error: ${response.statusText}`);
  }

  return response;
}

export async function DeleteUserLibrarySessions(token, selectedSessionIds) {
  const response = await fetch(
    "http://localhost:3000/v1/library/delete",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sessionIds: selectedSessionIds }),
    }
  );
  return response;
}

export const FetchRelatedSessionsList = async (token, sessionId) => {
  try {
    const response = await fetch(`http://localhost:3000/v1/sessions/related-sessions?sessionId=${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('fetchRelatedSession response:', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('fetchRelatedSession data:', data);

    return data;
  } catch (error) {
    console.error('Error fetching related session:', error);
    throw error;
  }
};
