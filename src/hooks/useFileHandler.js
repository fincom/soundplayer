import { useCallback, useState } from 'react';
import { validateMP3, formatFileSize } from '../utils/fileValidation';

export const useFileHandler = (onFileAccepted) => {
  const [error, setError] = useState(null);

  const handleFile = useCallback((file) => {
    setError(null);

    if (!file) {
      setError('Aucun fichier sélectionné');
      return false;
    }

    if (!validateMP3(file)) {
      const errorMessage = file.type !== 'audio/mpeg'
        ? 'Le fichier doit être au format MP3'
        : `Le fichier est trop volumineux (maximum 100MB, actuel: ${formatFileSize(file.size)})`;
      
      setError(errorMessage);
      return false;
    }

    try {
      onFileAccepted(file);
      return true;
    } catch (err) {
      setError('Erreur lors du traitement du fichier');
      console.error('File handling error:', err);
      return false;
    }
  }, [onFileAccepted]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { 
    handleFile,
    error,
    clearError
  };
};
