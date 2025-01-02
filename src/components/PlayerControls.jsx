import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Play, Pause, RotateCw } from 'lucide-react';
import Button from './shared/Button';
import Typography from './shared/Typography';

const PlayerControls = ({ 
  isPlaying, 
  onPlayPause, 
  playbackRate, 
  onSpeedChange,
  disabled = false 
}) => {
  const { t } = useTranslation();

  const speedOptions = [
    { value: 0.25, label: '0.25x' },
    { value: 0.5, label: '0.5x' },
    { value: 1, label: t('player.normal_speed') },
    { value: 1.5, label: '1.5x' },
    { value: 2, label: '2x' },
    { value: 3, label: '3x' }
  ];

  return (
    <div 
      className="flex items-center space-x-4 bg-itunes-surface p-4 rounded-lg player-controls"
      role="group"
      aria-label={t('player.controls_aria')}
    >
      <Button
        onClick={onPlayPause}
        disabled={disabled}
        variant="primary"
        size="large"
        aria-label={isPlaying ? t('player.stop_aria') : t('player.play_aria')}
        aria-pressed={isPlaying}
        className="w-16 h-16 flex items-center justify-center"
      >
        {isPlaying ? (
          <Pause className="w-8 h-8" />
        ) : (
          <Play className="w-8 h-8" />
        )}
      </Button>
      
      <div className="flex-1">
        <label 
          htmlFor="speed-control"
          className="sr-only"
        >
          {t('player.speed_label')}
        </label>
        <div className="flex items-center space-x-2">
          <RotateCw className="w-4 h-4 text-itunes-secondary" />
          <select
            id="speed-control"
            value={playbackRate}
            onChange={e => onSpeedChange(Number(e.target.value))}
            disabled={disabled}
            className="flex-1 bg-itunes-button text-itunes-text p-2 rounded transition-colors duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-itunes-accent focus:ring-opacity-50"
            aria-label={t('player.speed_aria')}
          >
            {speedOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

PlayerControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  playbackRate: PropTypes.number.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default PlayerControls;
