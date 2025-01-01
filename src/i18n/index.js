import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traductions
const resources = {
  fr: {
    translation: {
      settings: {
        title: 'Paramètres',
        language: 'Langue',
        theme: 'Thème sombre',
        theme_on: 'Activé',
        theme_off: 'Désactivé',
        playback_speed: 'Vitesse de lecture',
        notifications: 'Notifications',
        coming_soon: 'Bientôt disponible'
      },
      player: {
        no_file: 'Aucun fichier sélectionné',
        drop_file: 'Déposez un fichier MP3 ici',
        or: 'ou',
        browse: 'Parcourir',
        speed: {
          normal: 'Normal',
          slow: 'Lent',
          fast: 'Rapide'
        }
      }
    }
  },
  en: {
    translation: {
      settings: {
        title: 'Settings',
        language: 'Language',
        theme: 'Dark theme',
        theme_on: 'On',
        theme_off: 'Off',
        playback_speed: 'Playback speed',
        notifications: 'Notifications',
        coming_soon: 'Coming soon'
      },
      player: {
        no_file: 'No file selected',
        drop_file: 'Drop MP3 file here',
        or: 'or',
        browse: 'Browse',
        speed: {
          normal: 'Normal',
          slow: 'Slow',
          fast: 'Fast'
        }
      }
    }
  },
  ar: {
    translation: {
      settings: {
        title: 'الإعدادات',
        language: 'اللغة',
        theme: 'الوضع الداكن',
        theme_on: 'مفعل',
        theme_off: 'معطل',
        playback_speed: 'سرعة التشغيل',
        notifications: 'الإشعارات',
        coming_soon: 'قريباً'
      },
      player: {
        no_file: 'لم يتم اختيار ملف',
        drop_file: 'اسحب ملف MP3 هنا',
        or: 'أو',
        browse: 'تصفح',
        speed: {
          normal: 'عادي',
          slow: 'بطيء',
          fast: 'سريع'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
