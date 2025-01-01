/**
 * Validates an MP3 file based on type and size constraints
 * @param {File} file - The file to validate
 * @returns {boolean} - Whether the file is valid
 */
export const validateMP3 = (file) => {
  if (!file) return false;
  if (file.type !== 'audio/mpeg') return false;
  if (file.size > 100 * 1024 * 1024) return false; // 100MB max
  return true;
};

/**
 * Formats a file size in bytes to a human-readable string
 * @param {number} bytes - The size in bytes
 * @returns {string} - Formatted size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
