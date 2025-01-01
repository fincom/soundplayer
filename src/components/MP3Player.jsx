import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useFileHandler } from '../hooks/useFileHandler';
import { useSettings } from '../hooks/useSettings';
import { formatFileSize } from '../utils/fileValidation';
import { extractMetadata } from '../utils/metadata';
import SpeedSelector from './SpeedSelector';

const MP3Player = () => {
  const [audioFile, setAudioFile] = useState(null);
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
    setAudioFile(file);
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
        setError('Le fichier est trop volumineux. Maximum 100MB.');
        return;
      }
      handleFile(file);
      setError(null);
    } else {
      setError('Veuillez sélectionner un fichier MP3 valide.');
    }
  }, [handleFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false
  });

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  useEffect(() => {
    const savePlaybackPosition = () => {
      if (audioFile && currentTime > 0) {
        setSettings(current => ({
          ...current,
          lastPlayedFile: audioFile.name,
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
  }, [audioFile, currentTime, setSettings]);

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
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-itunes-text mb-8">SoundPlayer</h1>
      
      <div className="w-full p-6 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg">
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            ${isDragActive ? 'border-itunes-accent bg-gray-700' : 'border-gray-600 hover:border-gray-500'}`}
        >
          <input {...getInputProps()} id="fileInput" />
          <p className="text-lg text-gray-300 mb-4">
            {isDragActive 
              ? 'Déposez le fichier ici...'
              : 'Glissez un fichier MP3 ou utilisez le bouton ci-dessous'}
          </p>
          <button 
            onClick={handleButtonClick}
            className="bg-itunes-accent text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Sélectionner un fichier MP3
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Maximum: 100MB
          </p>
          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}
        </div>

        {audioFile && (
          <div className="mt-8">
            <audio ref={audioRef} controls className="w-full">
              <source src={URL.createObjectURL(audioFile)} type="audio/mpeg" />
              Votre navigateur ne supporte pas l'élément audio.
            </audio>
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
                <div className="text-lg font-medium">{audioFile.name}</div>
                <div className="text-sm text-itunes-secondary">{formatFileSize(audioFile.size)}</div>
              </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MP3Player;
