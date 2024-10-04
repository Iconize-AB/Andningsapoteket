export async function AddVideoToPlaylist(token, listName, listId, videoId) {  
    console.log('token', token);  
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

    console.log('response', response);
  
    if (!response.ok) {
      console.error("Failed to add video to playlist:", response.statusText);
      throw new Error(`Error: ${response.statusText}`);
    }
  
    return response.json();
  }

  export async function FetchUserPlaylists(token) {  
    console.log('token', token);  
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
      console.error("Failed to fetch playlists and added videos:", response.statusText);
      throw new Error(`Error: ${response.statusText}`);
    }
  
    return response.json();
  }

  export async function FetchUserLibrary(token) {  
    console.log('token', token);  
    const response = await fetch(
      "http://localhost:3000/libraryRoute/fetch/library",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      console.error("Failed to fetch library:", response.statusText);
      throw new Error(`Error: ${response.statusText}`);
    }
  
    return response.json();
  }
  