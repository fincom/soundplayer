import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Trash2, Play, Settings, Calendar, Search, Filter } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';
import { useHistory } from '../hooks/useHistory';
import Typography from './shared/Typography';
import Button from './shared/Button';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';

const StatCard = ({ icon: Icon, label, value, subValue }) => (
  <div className="bg-itunes-surface p-4 rounded-lg flex items-center space-x-3">
    <Icon className="w-5 h-5 text-itunes-accent" />
    <div>
      <div className="text-sm text-itunes-secondary">{label}</div>
      <div className="font-medium">{value}</div>
      {subValue && (
        <div className="text-xs text-itunes-secondary mt-1">{subValue}</div>
      )}
    </div>
  </div>
);

const FilterBar = ({ onFilterChange, dateRange, searchTerm }) => (
  <div className="flex gap-4 mb-6">
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-itunes-secondary" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 bg-itunes-button rounded-lg text-sm focus:ring-2 focus:ring-itunes-accent"
          placeholder="Rechercher par titre, artiste..."
        />
      </div>
    </div>
    <select
      value={dateRange}
      onChange={(e) => {
        const today = new Date();
        let range;
        switch (e.target.value) {
          case 'week':
            range = { start: startOfWeek(today), end: endOfWeek(today) };
            break;
          case 'month':
            range = { start: startOfMonth(today), end: endOfMonth(today) };
            break;
          case 'last3months':
            range = { start: startOfMonth(subMonths(today, 3)), end: today };
            break;
          default:
            range = null;
        }
        onFilterChange({ dateRange: range });
      }}
      className="px-4 py-2 bg-itunes-button rounded-lg text-sm focus:ring-2 focus:ring-itunes-accent"
    >
      <option value="all">Toute la période</option>
      <option value="week">Cette semaine</option>
      <option value="month">Ce mois</option>
      <option value="last3months">3 derniers mois</option>
    </select>
  </div>
);

const HistoryItem = ({ entry, selected, onSelect, formatDate, formatTime, t }) => (
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
          {entry.metadata?.title || entry.fileName}
        </h3>
        {entry.metadata?.artist && (
          <p className="text-sm text-itunes-secondary">{entry.metadata.artist}</p>
        )}
        <p className="text-sm text-itunes-secondary flex items-center gap-2">
          <Clock className="w-3 h-3" />
          {formatDate(entry.timestamp)}
        </p>
      </div>
      <div className="text-right text-sm text-itunes-secondary">
        <p>{t('history.speed')}: {entry.playbackRate}x</p>
        <p>{t('history.duration')}: {formatTime(entry.duration)}</p>
        <p>{t('history.listened')}: {formatTime(entry.listenedDuration)}</p>
        <p>{t('history.completion')}: {((entry.listenedDuration / entry.duration) * 100).toFixed(0)}%</p>
      </div>
    </div>
  </div>
);

const History = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { history, clearHistory, filterHistory, getStats, formatDate } = useHistory(language);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState(null);
  const [filteredHistory, setFilteredHistory] = useState(history);
  const stats = getStats();

  const handleFilterChange = (filters) => {
    if ('search' in filters) {
      setSearchTerm(filters.search);
    }
    if ('dateRange' in filters) {
      setDateRange(filters.dateRange);
    }

    const filtered = filterHistory({
      search: filters.search ?? searchTerm,
      dateRange: filters.dateRange ?? dateRange
    });
    setFilteredHistory(filtered);
  };

  const handleClearSelected = () => {
    if (selectedItems.length > 0) {
      clearHistory({ ids: selectedItems });
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
            variant="danger"
            onClick={handleClearSelected}
            className="inline-flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {t('history.delete_selected')} ({selectedItems.length})
          </Button>
        )}
      </div>

      <FilterBar
        onFilterChange={handleFilterChange}
        dateRange={dateRange}
        searchTerm={searchTerm}
      />

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={Play}
          label={t('history.total_listens')}
          value={stats.total}
          subValue={t('history.most_listened', { name: stats.mostListened })}
        />
        <StatCard
          icon={Clock}
          label={t('history.total_duration')}
          value={formatTime(stats.totalDuration)}
          subValue={t('history.listened_duration', { time: formatTime(stats.totalListenedDuration) })}
        />
        <StatCard
          icon={Settings}
          label={t('history.avg_speed')}
          value={`${stats.avgPlaybackRate}x`}
          subValue={t('history.completion_rate', { rate: stats.avgCompletionRate })}
        />
        <StatCard
          icon={Calendar}
          label={t('history.listening_period')}
          value={stats.lastListen ? formatDate(stats.lastListen) : t('history.never')}
          subValue={stats.firstListen ? t('history.first_listen', { date: formatDate(stats.firstListen) }) : ''}
        />
      </div>

      <div className="space-y-2">
        {filteredHistory.map(entry => (
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
            formatTime={formatTime}
            t={t}
          />
        ))}

        {filteredHistory.length === 0 && (
          <div className="text-center py-12 bg-itunes-surface rounded-lg">
            <Play className="w-12 h-12 mx-auto mb-4 text-itunes-secondary" />
            <Typography.body className="text-itunes-secondary">
              {searchTerm || dateRange ? t('history.no_results') : t('history.empty')}
            </Typography.body>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
