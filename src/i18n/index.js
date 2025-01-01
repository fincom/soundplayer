import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      player: {
        title: 'Lecteur MP3',
        upload: 'Déposez votre fichier MP3 ici',
        stop: 'Arrêter',
        start: 'Démarrer',
        speed: 'Vitesse : {{speed}}x',
        drop_file: 'Déposez un fichier MP3 ici',
        or: 'ou',
        browse: 'Parcourir',
        speed_options: {
          slow: 'Lent',
          normal: 'Normal',
          fast: 'Rapide'
        }
      },
      history: {
        title: 'Historique',
        empty: 'Aucun fichier lu récemment',
        playedAt: 'Écouté le {{date}}',
        duration: 'Durée : {{time}}',
        clear: 'Effacer l\'historique'
      },
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
      navigation: {
        player: 'Lecteur',
        history: 'Historique',
        settings: 'Paramètres'
      }
    }
  },
  en: {
    translation: {
      player: {
        title: 'MP3 Player',
        upload: 'Drop your MP3 file here',
        stop: 'Stop',
        start: 'Start',
        speed: 'Speed: {{speed}}x',
        drop_file: 'Drop MP3 file here',
        or: 'or',
        browse: 'Browse',
        speed_options: {
          slow: 'Slow',
          normal: 'Normal',
          fast: 'Fast'
        }
      },
      history: {
        title: 'History',
        empty: 'No recently played files',
        playedAt: 'Played on {{date}}',
        duration: 'Duration: {{time}}',
        clear: 'Clear history'
      },
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
      navigation: {
        player: 'Player',
        history: 'History',
        settings: 'Settings'
      }
    }
  },
  ar: {
    translation: {
      player: {
        title: 'مشغل MP3',
        upload: 'اسحب ملف MP3 هنا',
        stop: 'إيقاف',
        start: 'تشغيل',
        speed: 'السرعة: {{speed}}x',
        drop_file: 'اسحب ملف MP3 هنا',
        or: 'أو',
        browse: 'تصفح',
        speed_options: {
          slow: 'بطيء',
          normal: 'عادي',
          fast: 'سريع'
        }
      },
      history: {
        title: 'السجل',
        empty: 'لا توجد ملفات مشغلة مؤخراً',
        playedAt: 'تم التشغيل في {{date}}',
        duration: 'المدة: {{time}}',
        clear: 'مسح السجل'
      },
      settings: {
        title: 'الإعدادات',
        language: 'اللغة',
        theme: 'المظهر الداكن',
        theme_on: 'مفعل',
        theme_off: 'معطل',
        playback_speed: 'سرعة التشغيل',
        notifications: 'الإشعارات',
        coming_soon: 'قريباً'
      },
      navigation: {
        player: 'المشغل',
        history: 'السجل',
        settings: 'الإعدادات'
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
