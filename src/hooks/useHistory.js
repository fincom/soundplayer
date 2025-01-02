import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr, enUS, ar } from 'date-fns/locale';

const HISTORY_KEY = 'mp3player_history';
const MAX_HISTORY = 100;

const locales = { fr, en: enUS, ar };

export const useHistory = (language) => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const addToHistory = (file, playbackRate, duration) => {
    const entry = {
      id: Date.now(),
      fileName: file.name,
      fileSize: file.size,
      timestamp: new Date().toISOString(),
      playbackRate,
      duration,
      metadata: file.metadata || {}
    };

    setHistory(prev => {
      const newHistory = [entry, ...prev].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = (ids) => {
    setHistory(prev => {
      const newHistory = ids 
        ? prev.filter(item => !ids.includes(item.id))
        : [];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const getStats = () => {
    if (history.length === 0) {
      return {
        total: 0,
        totalDuration: 0,
        avgPlaybackRate: '0.00',
        firstListen: null,
        lastListen: null
      };
    }

    const total = history.length;
    const totalDuration = history.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    const avgPlaybackRate = history.reduce((acc, curr) => acc + (curr.playbackRate || 1), 0) / total;

    return {
      total,
      totalDuration,
      avgPlaybackRate: avgPlaybackRate.toFixed(2),
      firstListen: history[history.length - 1]?.timestamp,
      lastListen: history[0]?.timestamp
    };
  };

  const formatDate = (date) => {
    if (!date) return '';
    return format(new Date(date), 'PPpp', { locale: locales[language] });
  };

  return { 
    history, 
    addToHistory, 
    clearHistory, 
    getStats,
    formatDate
  };
};
