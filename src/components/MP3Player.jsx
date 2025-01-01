import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useFileHandler } from '../hooks/useFileHandler';
import { useSettings } from '../hooks/useSettings';
import { formatFileSize } from '../utils/fileValidation';
import { extractMetadata } from '../utils/metadata';
import SpeedSelector from './SpeedSelector';

const MP3Player = () => {
  const [file, setFile] = useState(null);
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

  const { handleFile, error, clearError } = useFileHandler(async (file) => {
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

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const mp3File = acceptedFiles[0];
      handleFile(mp3File);
    }
  }, [handleFile]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3']
    },
    maxSize: 100 * 1024 * 1024,
    multiple: false,
    noClick: true,
    noKeyboard: false
  });

  const handleButtonClick = (e) => {
    e.stopPropagation();
    open();
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

  const handleRateChange = (rate) => {
    const newRate = parseFloat(rate);
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

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

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

  return (
    <div className="min-h-screen bg-itunes-bg font-sf text-itunes-text">
      <audio ref={audioRef} />
      <header className="p-4 border-b border-itunes-border">
        <h1 className="text-2xl font-bold tracking-tight">SoundPlayer</h1>
      </header>

      <div className="max-w-2xl mx-auto p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors
            ${isDragActive 
              ? 'border-itunes-accent bg-itunes-button/50' 
              : 'border-itunes-border hover:border-itunes-accent'}
            ${error ? 'border-red-500 bg-red-500/10' : ''}`}
          role="button"
          aria-label="Zone de dépôt pour fichier MP3"
        >
          <input {...getInputProps()} />
          
          <div className="mb-4">
            <p className="text-lg mb-4">
              {isDragActive
                ? 'Déposez le fichier ici...'
                : 'Glissez un fichier MP3 ou utilisez le bouton ci-dessous'}
            </p>
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-6 py-3 bg-itunes-button text-itunes-text rounded-full
                hover:bg-itunes-hover focus:outline-none focus:ring-2 focus:ring-itunes-accent
                transition-colors"
            >
              Sélectionner un fichier MP3
            </button>
          </div>
          
          <p className="text-sm text-itunes-secondary">
            Maximum: 100MB
          </p>
          
          {error && (
            <p className="text-sm text-red-400 mt-2" role="alert">
              {error}
            </p>
          )}
        </div>

        {metadata && (
          <div className="mt-8 p-6 bg-itunes-button rounded-xl" role="region" aria-label="Informations sur le fichier">
            <h2 className="text-xl font-semibold mb-4">Informations</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-itunes-secondary mb-2">Piste</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-itunes-secondary text-sm">Titre</dt>
                    <dd className="text-itunes-text">{metadata.titre}</dd>
                  </div>
                  <div>
                    <dt className="text-itunes-secondary text-sm">Artiste</dt>
                    <dd className="text-itunes-text">{metadata.artiste}</dd>
                  </div>
                  <div>
                    <dt className="text-itunes-secondary text-sm">Album</dt>
                    <dd className="text-itunes-text">{metadata.album}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-itunes-secondary mb-2">Détails</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-itunes-secondary text-sm">Année</dt>
                    <dd className="text-itunes-text">{metadata.annee}</dd>
                  </div>
                  <div>
                    <dt className="text-itunes-secondary text-sm">Genre</dt>
                    <dd className="text-itunes-text">{metadata.genre}</dd>
                  </div>
                  <div>
                    <dt className="text-itunes-secondary text-sm">Bitrate</dt>
                    <dd className="text-itunes-text">{metadata.bitrate} kbps</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {file && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-itunes-button flex items-center justify-center
                  hover:bg-itunes-hover focus:outline-none focus:ring-2 focus:ring-itunes-accent
                  transition-colors"
                aria-label={isPlaying ? 'Mettre en pause' : 'Lancer la lecture'}
              >
                <span className="text-2xl">
                  {isPlaying ? '⏸️' : '▶️'}
                </span>
              </button>

              <div className="flex-1 mx-8">
                <SpeedSelector 
                  value={playbackRate} 
                  onChange={handleRateChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div 
                className="h-2 bg-itunes-button rounded-full overflow-hidden cursor-pointer"
                onClick={handleProgressClick}
                role="slider"
                aria-label="Progression de la lecture"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress}
              >
                <div
                  className="h-full bg-itunes-accent rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-itunes-secondary">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center p-4 bg-itunes-button rounded-lg">
              <div className="text-lg font-medium">{file.name}</div>
              <div className="text-sm text-itunes-secondary">{formatFileSize(file.size)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MP3Player;