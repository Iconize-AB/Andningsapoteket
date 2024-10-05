export async function AddVideoToPlaylist(token, listName, listId, videoId) {
  const response = await fetch(
    "http://localhost:3000/playlistsRoute/lists/add-video",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ listName, listId, videoId }),
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
    "http://localhost:3000/playlistsRoute/fetch/lists",
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
      "Failed to fetch playlists and added videos:",
      response.statusText
    );
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

export async function FetchUserLibrary(token) {
  const response = await fetch("http://localhost:3000/libraryRoute/library", {
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

export async function AddVideoToLibrary(token, videoId) {
  const response = await fetch(
    "http://localhost:3000/libraryRoute/library/add-video",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ videoId }),
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
    `http://localhost:3000/playlistsRoute/lists/delete/${playlistId}`,
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
