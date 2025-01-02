import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr, enUS, arSA } from 'date-fns/locale';
import { Trash2, Clock, Music } from 'lucide-react';

const History = () => {
  const { t, i18n } = useTranslation();
  const history = JSON.parse(localStorage.getItem('playHistory') || '[]');

  const getLocale = () => {
    switch (i18n.language) {
      case 'fr':
        return fr;
      case 'ar':
        return arSA;
      default:
        return enUS;
    }
  };

  const formatDate = (date) => {
    return format(new Date(date), 'PPpp', {
      locale: getLocale()
    });
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return t('history.duration_format', {
      minutes,
      seconds: seconds.toString().padStart(2, '0')
    });
  };

  const handleClearHistory = () => {
    if (window.confirm(t('history.clear_confirm'))) {
      localStorage.removeItem('playHistory');
      window.location.reload();
    }
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <div className="text-center space-y-6">
          <Clock className="w-16 h-16 text-itunes-secondary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-itunes-text">
            {t('history.empty')}
          </h2>
          <p className="text-lg text-itunes-secondary max-w-md mx-auto">
            {t('history.empty_description')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">{t('history.title')}</h1>
          <p className="text-itunes-secondary">
            {t('history.subtitle', { count: history.length })}
          </p>
        </div>
        <button
          onClick={handleClearHistory}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          aria-label={t('history.clear_aria')}
        >
          <Trash2 className="w-4 h-4" />
          <span>{t('history.clear')}</span>
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={item.id || index}
            className="p-6 bg-itunes-button hover:bg-itunes-hover rounded-lg transition-all duration-200 transform hover:scale-[1.01]"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-itunes-accent bg-opacity-10 rounded-full">
                <Music className="w-6 h-6 text-itunes-accent" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-lg mb-1">
                  {item.fileName || t('history.unknown_file')}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-itunes-secondary">
                  <p>
                    {t('history.played_at', {
                      date: formatDate(item.date)
                    })}
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDuration(item.duration)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
