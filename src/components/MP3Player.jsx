import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Music, Upload, Play, Pause, RotateCw } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useFileHandler } from '../hooks/useFileHandler';
import { useSettings } from '../hooks/useSettings';
import { formatFileSize } from '../utils/fileValidation';
import { extractMetadata } from '../utils/metadata';
import SpeedSelector from './SpeedSelector';

const MP3Player = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useSettings();
  const [playbackRate, setPlaybackRate] = useState(settings.playbackRate);
  const [metadata, setMetadata] = useState(null);
  
  const {
    audioRef,
    duration,
    currentTime,
    isPlaying,
    play,
    pause,
    seek,
    setPlaybackRate: updatePlaybackRate
  } = useAudioPlayer();

  const { handleFile, clearError } = useFileHandler(async (file) => {
    setFile(file);
    const url = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      if (settings.lastPlayedFile === file.name) {
        audioRef.current.currentTime = settings.lastPlayedTime || 0;
      }
    }
    
    const meta = await extractMetadata(file);
    setMetadata(meta);
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'audio/mpeg') {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        setError(t('player.invalid_file_size'));
        return;
      }
      handleFile(file);
      setError(null);
    } else {
      setError(t('player.invalid_file'));
    }
  }, [handleFile, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSpeedChange = (speed) => {
    const newRate = parseFloat(speed);
    setPlaybackRate(newRate);
    setSettings(current => ({
      ...current,
      playbackRate: newRate
    }));
    updatePlaybackRate(newRate);
  };

  useEffect(() => {
    if (audioRef.current) {
      updatePlaybackRate(playbackRate);
    }
  }, [playbackRate, updatePlaybackRate]);

  const handleProgressClick = (e) => {
    if (audioRef.current && duration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const time = percent * duration;
      seek(time);
    }
  };

  useEffect(() => {
    const savePlaybackPosition = () => {
      if (file && currentTime > 0) {
        setSettings(current => ({
          ...current,
          lastPlayedFile: file.name,
          lastPlayedTime: currentTime
        }));
      }
    };

    const interval = setInterval(savePlaybackPosition, 5000);
    window.addEventListener('beforeunload', savePlaybackPosition);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', savePlaybackPosition);
    };
  }, [file, currentTime, setSettings]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{t('player.title')}</h1>
        <p className="text-itunes-secondary">{t('player.subtitle')}</p>
      </div>

      {!file ? (
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive ? 'border-itunes-accent bg-itunes-accent bg-opacity-5 scale-[1.02]' : 'border-itunes-border hover:border-itunes-accent hover:bg-opacity-5'}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-itunes-secondary" />
          <div className="space-y-4 max-w-md mx-auto">
            <p className="text-lg font-medium">
              {isDragActive ? t('player.drop_here') : t('player.drag_drop')}
            </p>
            <div className="inline-flex items-center">
              <span className="text-itunes-secondary">{t('player.or')}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  document.querySelector('input[type="file"]').click();
                }}
                className="mx-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transform hover:scale-105 transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>{t('player.browse')}</span>
              </button>
            </div>
            <p className="text-xs text-itunes-secondary mt-4">
              {t('player.supported_formats')}
            </p>
            {error && (
              <p className="text-red-500 text-sm mt-2 bg-red-100 bg-opacity-10 p-2 rounded">
                {error}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-itunes-button rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Music className="w-8 h-8 text-itunes-accent" />
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-itunes-secondary">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <SpeedSelector 
                  value={playbackRate} 
                  onChange={handleSpeedChange}
                />
                <button
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-16 h-16 flex items-center justify-center"
                  aria-label={isPlaying ? t('player.stop_aria') : t('player.play_aria')}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>
            <div 
              className="h-2 bg-itunes-button rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressClick}
              role="slider"
              aria-label="Progression de la lecture"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={(currentTime / duration) * 100}
            >
              <div
                className="h-full bg-itunes-accent rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-itunes-secondary mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <audio
              ref={audioRef}
              src={URL.createObjectURL(file)}
            />
          </div>
          {metadata && (
            <div className="mt-8 p-6 bg-itunes-button rounded-xl" role="region" aria-label="Informations sur le fichier">
              <h2 className="text-xl font-semibold mb-4">{t('player.metadata')}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-itunes-secondary mb-2">{t('player.track')}</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-itunes-secondary text-sm">{t('player.title')}</dt>
                      <dd className="text-itunes-text">{metadata.titre}</dd>
                    </div>
                    <div>
                      <dt className="text-itunes-secondary text-sm">{t('player.artist')}</dt>
                      <dd className="text-itunes-text">{metadata.artiste}</dd>
                    </div>
                    <div>
                      <dt className="text-itunes-secondary text-sm">{t('player.album')}</dt>
                      <dd className="text-itunes-text">{metadata.album}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-itunes-secondary mb-2">{t('player.details')}</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-itunes-secondary text-sm">{t('player.year')}</dt>
                      <dd className="text-itunes-text">{metadata.annee}</dd>
                    </div>
                    <div>
                      <dt className="text-itunes-secondary text-sm">{t('player.genre')}</dt>
                      <dd className="text-itunes-text">{metadata.genre}</dd>
                    </div>
                    <div>
                      <dt className="text-itunes-secondary text-sm">{t('player.bitrate')}</dt>
                      <dd className="text-itunes-text">{metadata.bitrate} kbps</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MP3Player;
