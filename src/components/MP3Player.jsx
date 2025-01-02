import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import PlayerControls from './PlayerControls';
import Typography from './shared/Typography';
import Button from './shared/Button';
import { useHistory } from './useHistory'; // Assuming useHistory is defined in this file

const MP3Player = () => {
  const { t } = useTranslation();
  const { startSession, updateSession, endSession } = useHistory('en'); // Assuming language is 'en'
  const [file, setFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'audio/mpeg') {
      setFile(file);
      const url = URL.createObjectURL(file);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/mpeg': ['.mp3'] },
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      endSession();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const handlePlay = () => {
    if (!isPlaying) {
      startSession(file, playbackRate, duration, {});
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    updateSession(currentTime);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    endSession();
  };

  const handlePlaybackRateChange = (newRate) => {
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
      updateSession(currentTime, newRate);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="max-w-2xl mx-auto p-6"
      role="main"
      aria-live="polite"
    >
      <Typography.h1>
        {file ? file.name : t('player.select_file')}
      </Typography.h1>
      
      <div
        {...getRootProps()}
        className={`
          mt-6 border-2 border-dashed rounded-lg p-8 text-center
          ${isDragActive ? 'border-itunes-accent bg-itunes-surface/50' : 'border-gray-600'}
          transition-colors duration-200
        `}
        role="button"
        tabIndex="0"
        aria-label={t('player.drop_zone_aria')}
      >
        <input {...getInputProps()} aria-label={t('player.file_input_aria')} />
        <Typography.body className="mb-4">
          {t('player.drag_drop_message')}
        </Typography.body>
        <div className="flex justify-center items-center gap-2">
          <span className="text-itunes-secondary">{t('player.or')}</span>
          <Button
            variant="primary"
            size="medium"
            onClick={(e) => {
              e.stopPropagation();
              document.querySelector('input[type="file"]').click();
            }}
            className="inline-flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {t('player.browse_button')}
          </Button>
        </div>
        <Typography.bodySmall className="mt-4">
          {t('player.supported_formats')}
        </Typography.bodySmall>
      </div>
      
      <audio ref={audioRef} className="hidden" />
      
      {file && (
        <div className="mt-6 space-y-4">
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
            playbackRate={playbackRate}
            onSpeedChange={handlePlaybackRateChange}
            disabled={!file}
          />
          
          <div 
            className="space-y-2"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress}
            aria-label={t('player.progress_aria')}
          >
            <div className="h-2 bg-itunes-button rounded-full overflow-hidden">
              <div
                className="h-full bg-itunes-accent rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-itunes-secondary">
              <span aria-label={t('player.current_time')}>
                {formatTime(currentTime)}
              </span>
              <span aria-label={t('player.duration')}>
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MP3Player;
