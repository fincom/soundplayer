import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      player: {
        title: 'Lecteur MP3',
        subtitle: 'Écoutez votre musique préférée',
        upload: 'Déposez votre fichier MP3 ici',
        stop: 'Arrêter',
        start: 'Démarrer',
        play_aria: 'Lancer la lecture',
        stop_aria: 'Arrêter la lecture',
        speed: 'Vitesse : {{speed}}x',
        drop_here: 'Déposez le fichier ici...',
        drag_drop: 'Glissez un fichier MP3 ou cliquez pour sélectionner',
        or: 'ou',
        browse: 'Sélectionner un fichier',
        supported_formats: 'Format accepté : MP3 (max 100MB)',
        invalid_file: 'Format de fichier invalide. Veuillez sélectionner un fichier MP3.',
        invalid_file_size: 'Le fichier est trop volumineux. Maximum 100MB.',
      },
      history: {
        title: 'Historique',
        subtitle: '{{count}} fichiers écoutés',
        empty: 'Votre historique est vide',
        empty_description: 'Les morceaux que vous écoutez apparaîtront ici',
        played_at: 'Écouté le {{date}}',
        duration_format: '{{minutes}}:{{seconds}}',
        clear: 'Effacer l\'historique',
        clear_confirm: 'Êtes-vous sûr de vouloir effacer tout l\'historique ?',
        clear_aria: 'Effacer tout l\'historique de lecture',
        unknown_file: 'Fichier inconnu'
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
        player_aria: 'Aller au lecteur MP3',
        history: 'Historique',
        history_aria: 'Voir l\'historique de lecture',
        settings: 'Paramètres',
        settings_aria: 'Accéder aux paramètres',
        mobile_nav_aria: 'Navigation mobile'
      }
    }
  },
  en: {
    translation: {
      player: {
        title: 'MP3 Player',
        subtitle: 'Listen to your favorite music',
        upload: 'Drop your MP3 file here',
        stop: 'Stop',
        start: 'Start',
        play_aria: 'Start playback',
        stop_aria: 'Stop playback',
        speed: 'Speed: {{speed}}x',
        drop_here: 'Drop file here...',
        drag_drop: 'Drag and drop an MP3 file or click to select',
        or: 'or',
        browse: 'Select file',
        supported_formats: 'Accepted format: MP3 (max 100MB)',
        invalid_file: 'Invalid file format. Please select an MP3 file.',
        invalid_file_size: 'File is too large. Maximum size is 100MB.',
      },
      history: {
        title: 'History',
        subtitle: '{{count}} files played',
        empty: 'Your history is empty',
        empty_description: 'Tracks you listen to will appear here',
        played_at: 'Played on {{date}}',
        duration_format: '{{minutes}}:{{seconds}}',
        clear: 'Clear history',
        clear_confirm: 'Are you sure you want to clear all history?',
        clear_aria: 'Clear all playback history',
        unknown_file: 'Unknown file'
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
        player_aria: 'Go to MP3 player',
        history: 'History',
        history_aria: 'View playback history',
        settings: 'Settings',
        settings_aria: 'Access settings',
        mobile_nav_aria: 'Mobile navigation'
      }
    }
  },
  ar: {
    translation: {
      player: {
        title: 'مشغل MP3',
        subtitle: 'استمع إلى موسيقاك المفضلة',
        upload: 'اسحب ملف MP3 هنا',
        stop: 'إيقاف',
        start: 'تشغيل',
        play_aria: 'بدء التشغيل',
        stop_aria: 'إيقاف التشغيل',
        speed: 'السرعة: {{speed}}x',
        drop_here: 'أسقط الملف هنا...',
        drag_drop: 'اسحب وأفلت ملف MP3 أو انقر للاختيار',
        or: 'أو',
        browse: 'اختر ملفاً',
        supported_formats: 'الصيغة المقبولة: MP3 (الحد الأقصى 100 ميجابايت)',
        invalid_file: 'صيغة ملف غير صالحة. يرجى اختيار ملف MP3.',
        invalid_file_size: 'الملف كبير جداً. الحد الأقصى 100 ميجابايت.',
      },
      history: {
        title: 'السجل',
        subtitle: '{{count}} ملفات تم تشغيلها',
        empty: 'سجلك فارغ',
        empty_description: 'ستظهر المقاطع التي تستمع إليها هنا',
        played_at: 'تم التشغيل في {{date}}',
        duration_format: '{{minutes}}:{{seconds}}',
        clear: 'مسح السجل',
        clear_confirm: 'هل أنت متأكد من أنك تريد مسح كل السجل؟',
        clear_aria: 'مسح كل سجل التشغيل',
        unknown_file: 'ملف غير معروف'
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
        player_aria: 'الذهاب إلى مشغل MP3',
        history: 'السجل',
        history_aria: 'عرض سجل التشغيل',
        settings: 'الإعدادات',
        settings_aria: 'الوصول إلى الإعدادات',
        mobile_nav_aria: 'التنقل على الجوال'
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
