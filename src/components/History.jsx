import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Trash2, Play, Settings } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';
import { useHistory } from '../hooks/useHistory';
import Typography from './shared/Typography';
import Button from './shared/Button';

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-itunes-surface p-4 rounded-lg flex items-center space-x-3">
    <Icon className="w-5 h-5 text-itunes-accent" />
    <div>
      <div className="text-sm text-itunes-secondary">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

const HistoryItem = ({ entry, selected, onSelect, formatDate, t }) => (
  <div
    className={`bg-itunes-button p-4 rounded-lg transition-all duration-200 hover:bg-itunes-hover cursor-pointer
      ${selected ? 'border-2 border-itunes-accent' : 'border-2 border-transparent'}`}
    onClick={onSelect}
    role="button"
    aria-pressed={selected}
    tabIndex="0"
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <h3 className="font-medium flex items-center gap-2">
          <Play className="w-4 h-4" />
          {entry.fileName}
        </h3>
        <p className="text-sm text-itunes-secondary flex items-center gap-2">
          <Clock className="w-3 h-3" />
          {formatDate(entry.timestamp)}
        </p>
      </div>
      <div className="text-right text-sm text-itunes-secondary">
        <p>{t('history.speed')}: {entry.playbackRate}x</p>
        <p>{t('history.duration')}: {formatTime(entry.duration)}</p>
      </div>
    </div>
    {entry.metadata && Object.keys(entry.metadata).length > 0 && (
      <div className="mt-2 pt-2 border-t border-itunes-border text-sm grid grid-cols-2 gap-2">
        {entry.metadata.title && (
          <p className="text-itunes-secondary">
            {t('history.title')}: {entry.metadata.title}
          </p>
        )}
        {entry.metadata.artist && (
          <p className="text-itunes-secondary">
            {t('history.artist')}: {entry.metadata.artist}
          </p>
        )}
      </div>
    )}
  </div>
);

const History = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { history, clearHistory, getStats, formatDate } = useHistory(language);
  const [selectedItems, setSelectedItems] = useState([]);
  const stats = getStats();

  const handleClearSelected = () => {
    if (selectedItems.length > 0) {
      clearHistory(selectedItems);
      setSelectedItems([]);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="max-w-2xl mx-auto p-6 space-y-6"
      role="region"
      aria-label={t('history.title')}
    >
      <div className="flex justify-between items-center">
        <Typography.h1>{t('history.title')}</Typography.h1>
        {selectedItems.length > 0 && (
          <Button
            variant="primary"
            onClick={handleClearSelected}
            className="inline-flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {t('history.delete_selected')} ({selectedItems.length})
          </Button>
        )}
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={Play}
          label={t('history.total_listens')}
          value={stats.total}
        />
        <StatCard
          icon={Clock}
          label={t('history.total_duration')}
          value={formatTime(stats.totalDuration)}
        />
        <StatCard
          icon={Settings}
          label={t('history.avg_speed')}
          value={`${stats.avgPlaybackRate}x`}
        />
        <StatCard
          icon={Clock}
          label={t('history.last_listen')}
          value={stats.lastListen ? formatDate(stats.lastListen) : t('history.never')}
        />
      </div>

      {/* Liste d'historique */}
      <div className="space-y-2">
        {history.map(entry => (
          <HistoryItem
            key={entry.id}
            entry={entry}
            selected={selectedItems.includes(entry.id)}
            onSelect={() => {
              setSelectedItems(prev =>
                prev.includes(entry.id)
                  ? prev.filter(id => id !== entry.id)
                  : [...prev, entry.id]
              );
            }}
            formatDate={formatDate}
            t={t}
          />
        ))}

        {history.length === 0 && (
          <div className="text-center py-12 bg-itunes-surface rounded-lg">
            <Play className="w-12 h-12 mx-auto mb-4 text-itunes-secondary" />
            <Typography.body className="text-itunes-secondary">
              {t('history.empty')}
            </Typography.body>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
