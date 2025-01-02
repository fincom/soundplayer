import { useState, useEffect } from 'react';
import { format, isWithinInterval } from 'date-fns';
import { fr, enUS, ar } from 'date-fns/locale';

const HISTORY_KEY = 'mp3player_history';
const CURRENT_SESSION_KEY = 'currentSession';
const MAX_HISTORY = 100;

const locales = { fr, en: enUS, ar };

const validateHistoryEntry = (entry) => {
  const requiredFields = ['id', 'fileName', 'fileSize', 'timestamp', 'playbackRate', 'duration', 'listenedDuration'];
  const isValid = requiredFields.every(field => field in entry);
  if (!isValid) {
    throw new Error(`Invalid history entry: missing required fields`);
  }
};

const getMostFrequent = (arr) => {
  const counts = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
};

export const useHistory = (language) => {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid history format');
      }
      parsed.forEach(validateHistoryEntry);
      return parsed;
    } catch (error) {
      console.error('History corrupted, resetting:', error);
      localStorage.setItem(HISTORY_KEY, '[]');
      return [];
    }
  });

  const startSession = (file, speed, duration, metadata) => {
    const session = {
      id: Date.now().toString(),
      fileName: file.name,
      fileSize: file.size,
      timestamp: new Date().toISOString(),
      playbackRate: speed,
      duration,
      listenedDuration: 0,
      metadata: metadata || {}
    };
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
  };

  const updateSession = (currentTime, speed) => {
    const session = JSON.parse(localStorage.getItem(CURRENT_SESSION_KEY));
    if (session) {
      session.listenedDuration = currentTime;
      if (speed) session.playbackRate = speed;
      localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
    }
  };

  const endSession = () => {
    const session = JSON.parse(localStorage.getItem(CURRENT_SESSION_KEY));
    if (session) {
      setHistory(prev => {
        const newHistory = [session, ...prev].slice(0, MAX_HISTORY);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
      localStorage.removeItem(CURRENT_SESSION_KEY);
    }
  };

  const clearHistory = (options = {}) => {
    setHistory(prev => {
      let filtered = [...prev];

      if (options.ids) {
        filtered = filtered.filter(item => !options.ids.includes(item.id));
      }

      if (options.beforeDate) {
        filtered = filtered.filter(item => 
          new Date(item.timestamp) > new Date(options.beforeDate)
        );
      }

      if (options.fileNames) {
        filtered = filtered.filter(item => 
          !options.fileNames.includes(item.fileName)
        );
      }

      if (options.all) {
        filtered = [];
      }

      localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
      return filtered;
    });
  };

  const filterHistory = (criteria = {}) => {
    return history.filter(entry => {
      if (criteria.dateRange) {
        return isWithinInterval(new Date(entry.timestamp), criteria.dateRange);
      }
      if (criteria.search) {
        const search = criteria.search.toLowerCase();
        return (
          entry.fileName.toLowerCase().includes(search) ||
          entry.metadata?.title?.toLowerCase().includes(search) ||
          entry.metadata?.artist?.toLowerCase().includes(search)
        );
      }
      return true;
    });
  };

  const getStats = () => {
    if (history.length === 0) {
      return {
        total: 0,
        totalDuration: 0,
        totalListenedDuration: 0,
        avgPlaybackRate: 0,
        avgCompletionRate: 0,
        mostListened: null,
        firstListen: null,
        lastListen: null
      };
    }

    const total = history.length;
    const totalDuration = history.reduce((acc, curr) => acc + curr.duration, 0);
    const totalListenedDuration = history.reduce((acc, curr) => acc + curr.listenedDuration, 0);
    const avgPlaybackRate = history.reduce((acc, curr) => acc + curr.playbackRate, 0) / total;
    const avgCompletionRate = (totalListenedDuration / totalDuration) * 100;
    const mostListened = getMostFrequent(history.map(h => h.fileName));

    return {
      total,
      totalDuration,
      totalListenedDuration,
      avgPlaybackRate: avgPlaybackRate.toFixed(2),
      avgCompletionRate: avgCompletionRate.toFixed(1),
      mostListened,
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
    startSession,
    updateSession,
    endSession,
    clearHistory,
    filterHistory,
    getStats,
    formatDate
  };
};
