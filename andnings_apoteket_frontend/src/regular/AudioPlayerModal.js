import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const AudioPlayerModal = ({ isVisible, onClose, track, onLikePress }) => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const positionRef = useRef(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (isVisible) {
      loadAudio();
    } else {
      unloadAudio();
    }
  }, [isVisible]);

  const loadAudio = async () => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.url },
      { shouldPlay: false }
    );
    setSound(newSound);

    const status = await newSound.getStatusAsync();
    setDuration(status.durationMillis / 1000);
  };

  const unloadAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      setPosition(0);
      positionRef.current = 0;
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
        startPositionUpdate();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startPositionUpdate = () => {
    if (sound) {
      const interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          setPosition(status.positionMillis / 1000);
          positionRef.current = status.positionMillis / 1000;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  };

  const skipBackward = async () => {
    if (sound) {
      const newPosition = Math.max(0, positionRef.current - 15);
      await sound.setPositionAsync(newPosition * 1000);
      setPosition(newPosition);
    }
  };

  const skipForward = async () => {
    if (sound) {
      const newPosition = Math.min(duration, positionRef.current + 15);
      await sound.setPositionAsync(newPosition * 1000);
      setPosition(newPosition);
    }
  };

  const onSliderValueChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000);
      setPosition(value);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.artworkContainer}>
            <Image
              source={{ uri: track.url }}
              style={styles.artwork}
            />
          </View>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
            thumbTintColor="#FFFFFF"
            onSlidingComplete={onSliderValueChange}
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
          <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={skipBackward}>
              <Ionicons name="play-skip-back" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipForward}>
              <Ionicons name="play-skip-forward" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onLikePress} style={styles.likeButton}>
            <Ionicons name={"heart-outline"} size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: '#1E3A5F',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  artworkContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  artwork: {
    width: '100%',
    height: '100%',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginVertical: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  playPauseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioPlayerModal;
