import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

/**
 * PlaylistManager component for managing the list of audio tracks
 */
const PlaylistManager = ({ currentTrack, onTrackSelect }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const track = {
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: 'Unknown Artist',
        url: URL.createObjectURL(file),
        file
      };
      onTrackSelect(track);
    });
  }, [onTrackSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav']
    }
  });

  return (
    <div className="mt-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-600 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-300">
          {isDragActive
            ? "Drop the audio files here..."
            : "Drag 'n' drop audio files here, or click to select files"}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Supports MP3 and WAV files
        </p>
      </div>

      {currentTrack && (
        <div className="mt-4 p-4 bg-gray-700 rounded">
          <h3 className="text-lg font-semibold text-white">Current Track</h3>
          <p className="text-gray-300">{currentTrack.title}</p>
          <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
        </div>
      )}
    </div>
  );
};

PlaylistManager.propTypes = {
  currentTrack: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  onTrackSelect: PropTypes.func.isRequired,
};

export default PlaylistManager;
