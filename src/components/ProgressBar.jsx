import PropTypes from 'prop-types';

/**
 * ProgressBar component for displaying and controlling playback progress
 */
const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    onSeek(percentage * duration);
  };

  return (
    <div className="mb-4">
      <div
        className="h-2 bg-gray-600 rounded cursor-pointer relative"
        onClick={handleClick}
      >
        <div
          className="h-full bg-blue-500 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-400 mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onSeek: PropTypes.func.isRequired,
};

export default ProgressBar;
