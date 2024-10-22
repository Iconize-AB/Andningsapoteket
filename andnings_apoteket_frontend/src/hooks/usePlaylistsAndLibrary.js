import { useState, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchUserPlaylists, FetchUserLibrary } from "../sessions/endpoints/BreatworkSessionActionsEndpoints";

export const usePlaylistsAndLibrary = () => {
  const [playlists, setPlaylists] = useState([]);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const [playlistsData, libraryData] = await Promise.all([
        FetchUserPlaylists(token),
        FetchUserLibrary(token),
      ]);

      setPlaylists(playlistsData?.lists || []);
      setLibrary(libraryData?.library || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateData = useCallback((newPlaylists, newLibrary) => {
    if (newPlaylists) setPlaylists(newPlaylists);
    if (newLibrary) setLibrary(newLibrary);
  }, []);

  console.log('playlists', playlists);

  return { playlists, library, loading, refreshData, updateData };
};
