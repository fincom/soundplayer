import { useState, useEffect } from 'react';

const STORAGE_KEY = 'mp3player_settings';

const DEFAULT_SETTINGS = {
  playbackRate: 1,
  volume: 1,
  theme: 'light',
  lastPlayedTime: 0
};

export const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored 
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
        : DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  });

  const updateSettings = (newSettings) => {
    setSettings(current => {
      const updated = {
        ...current,
        ...(typeof newSettings === 'function' 
          ? newSettings(current)
          : newSettings)
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving settings:', error);
      }
      return updated;
    });
  };

  return [settings, updateSettings];
};
