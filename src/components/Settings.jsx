import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import Typography from './shared/Typography';

const SettingsSection = ({ title, children }) => (
  <div className="bg-itunes-button rounded-lg p-4 space-y-2">
    <Typography.h2>{title}</Typography.h2>
    {children}
  </div>
);

const Settings = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);
  const { isDark, setIsDark } = useTheme();
  const [screenReader, setScreenReader] = useState(() => 
    localStorage.getItem('screenReader') === 'true'
  );
  const [defaultSpeed, setDefaultSpeed] = useState(() => 
    localStorage.getItem('defaultSpeed') || '1'
  );
  const [textSize, setTextSize] = useState(() => 
    localStorage.getItem('textSize') || 'medium'
  );

  useEffect(() => {
    localStorage.setItem('screenReader', screenReader);
    localStorage.setItem('defaultSpeed', defaultSpeed);
    localStorage.setItem('textSize', textSize);
  }, [screenReader, defaultSpeed, textSize]);

  return (
    <div 
      className="max-w-2xl mx-auto p-6 space-y-6"
      role="region"
      aria-label={t('settings.title')}
    >
      <Typography.h1>{t('settings.title')}</Typography.h1>

      <SettingsSection title={t('settings.appearance')}>
        {/* Thème */}
        <div className="flex items-center justify-between">
          <label className="text-lg">{t('settings.theme')}</label>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`w-14 h-8 rounded-full p-1 transition-colors
              ${isDark ? 'bg-itunes-accent' : 'bg-gray-600'}`}
            role="switch"
            aria-checked={isDark}
          >
            <span className={`block w-6 h-6 rounded-full bg-white transition-transform
              ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
        </div>

        {/* Taille du texte */}
        <div className="space-y-2">
          <label className="text-lg block">
            {t('settings.text_size')}
          </label>
          <select
            value={textSize}
            onChange={(e) => setTextSize(e.target.value)}
            className="w-full p-2 bg-itunes-surface rounded text-itunes-text"
          >
            <option value="small">{t('settings.text_size_small')}</option>
            <option value="medium">{t('settings.text_size_medium')}</option>
            <option value="large">{t('settings.text_size_large')}</option>
          </select>
        </div>
      </SettingsSection>

      <SettingsSection title={t('settings.language')}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 bg-itunes-surface rounded text-itunes-text"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </SettingsSection>

      <SettingsSection title={t('settings.playback')}>
        {/* Vitesse par défaut */}
        <div className="space-y-2">
          <label className="text-lg block">
            {t('settings.default_speed')}
          </label>
          <select
            value={defaultSpeed}
            onChange={(e) => setDefaultSpeed(e.target.value)}
            className="w-full p-2 bg-itunes-surface rounded text-itunes-text"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x ({t('settings.normal')})</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </SettingsSection>

      <SettingsSection title={t('settings.accessibility')}>
        {/* Lecteur d'écran */}
        <div className="flex items-center justify-between">
          <label className="text-lg">
            {t('settings.screen_reader')}
          </label>
          <button
            onClick={() => setScreenReader(!screenReader)}
            className={`w-14 h-8 rounded-full p-1 transition-colors
              ${screenReader ? 'bg-itunes-accent' : 'bg-gray-600'}`}
            role="switch"
            aria-checked={screenReader}
          >
            <span className={`block w-6 h-6 rounded-full bg-white transition-transform
              ${screenReader ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
        </div>

        {/* Annonces automatiques */}
        <div className="pl-6 text-sm text-itunes-secondary">
          {t('settings.screen_reader_description')}
        </div>
      </SettingsSection>

      <SettingsSection title={t('settings.about')}>
        <div className="text-sm text-itunes-secondary">
          <p>Version: 0.11.0</p>
          <p>{t('settings.about_description')}</p>
        </div>
      </SettingsSection>
    </div>
  );
};

export default Settings;
