import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';

const Settings = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">{t('settings.title')}</h1>
      
      <div className="space-y-6">
        <div className="p-4 bg-itunes-button hover:bg-itunes-hover rounded-lg transition-colors duration-200">
          <label className="text-lg block mb-2">{t('settings.language')}</label>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 bg-itunes-bg rounded border border-itunes-border focus:border-itunes-accent focus:ring-1 focus:ring-itunes-accent outline-none"
            aria-label={t('settings.language')}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-itunes-button hover:bg-itunes-hover rounded-lg transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <span className="text-lg">{t('settings.theme')}</span>
            <span className="text-sm text-itunes-secondary">
              {isDark ? t('settings.theme_on') : t('settings.theme_off')}
            </span>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${isDark ? 'bg-itunes-accent' : 'bg-gray-600'}`}
            role="switch"
            aria-checked={isDark}
            aria-label={t('settings.theme')}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${isDark ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        <div className="p-4 bg-itunes-button hover:bg-itunes-hover rounded-lg transition-colors duration-200">
          <label className="text-lg block mb-2">{t('settings.playback_speed')}</label>
          <select 
            defaultValue="1"
            className="w-full p-2 bg-itunes-bg rounded border border-itunes-border focus:border-itunes-accent focus:ring-1 focus:ring-itunes-accent outline-none"
          >
            <option value="0.5">0.5x ({t('player.speed.slow')})</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x ({t('player.speed.normal')})</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x ({t('player.speed.fast')})</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-itunes-button hover:bg-itunes-hover rounded-lg transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <span className="text-lg">{t('settings.notifications')}</span>
            <span className="text-sm text-itunes-secondary">{t('settings.coming_soon')}</span>
          </div>
          <button
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 cursor-not-allowed opacity-50"
            disabled
          >
            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
