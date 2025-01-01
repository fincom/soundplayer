import * as musicMetadata from 'music-metadata-browser';

export const extractMetadata = async (file) => {
  try {
    const metadata = await musicMetadata.parseBlob(file);
    return {
      titre: metadata.common.title || 'Inconnu',
      artiste: metadata.common.artist || 'Inconnu',
      album: metadata.common.album || 'Inconnu',
      annee: metadata.common.year || 'Inconnue',
      duree: metadata.format.duration || 0,
      genre: metadata.common.genre?.[0] || 'Inconnu',
      bitrate: Math.round(metadata.format.bitrate / 1000) || 0
    };
  } catch (error) {
    console.error('Erreur lecture metadata:', error);
    return null;
  }
};
