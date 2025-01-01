import { useState, useRef } from 'react';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import PlaylistManager from './PlaylistManager';

/**
 * Main AudioPlayer component that manages the audio playback state
 * and coordinates between sub-components
 */
const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleSeek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {currentTrack?.title || 'No track selected'}
        </h2>
        <p className="text-gray-400">
          {currentTrack?.artist || 'Select a track to play'}
        </p>
      </div>

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />

      <Controls
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
      />

      <PlaylistManager
        currentTrack={currentTrack}
        onTrackSelect={handleTrackSelect}
      />
    </div>
  );
};

export default AudioPlayer;
