import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "fr" | "ar";

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

// Translation dictionary. Keys = English source text.
const dict: Record<string, { fr: string; ar: string }> = {
  // Nav
  "Home": { fr: "Accueil", ar: "الرئيسية" },
  "Live": { fr: "Direct", ar: "مباشر" },
  "Relay": { fr: "Relais", ar: "المرحل" },
  "Alerts": { fr: "Alertes", ar: "التنبيهات" },
  "More": { fr: "Plus", ar: "المزيد" },
  "GSM": { fr: "GSM", ar: "GSM" },
  "GPS": { fr: "GPS", ar: "GPS" },
  "Statistics": { fr: "Statistiques", ar: "الإحصائيات" },
  "AI Prediction": { fr: "Prédiction IA", ar: "تنبؤ الذكاء الاصطناعي" },

  // Settings
  "Settings": { fr: "Paramètres", ar: "الإعدادات" },
  "OPERATOR PREFERENCES": { fr: "PRÉFÉRENCES OPÉRATEUR", ar: "تفضيلات المشغّل" },
  "Lead Operator · Tier 3 Access": { fr: "Opérateur principal · Accès niveau 3", ar: "مشغّل رئيسي · وصول من المستوى 3" },
  "Protection Thresholds": { fr: "Seuils de protection", ar: "عتبات الحماية" },
  "Min Voltage": { fr: "Tension min", ar: "الجهد الأدنى" },
  "Max Voltage": { fr: "Tension max", ar: "الجهد الأقصى" },
  "Push Notifications": { fr: "Notifications push", ar: "الإشعارات الفورية" },
  "GSM Auto-Reconnect": { fr: "Reconnexion GSM auto", ar: "إعادة اتصال GSM تلقائيًا" },
  "Auto Trip Protection": { fr: "Déclenchement auto", ar: "حماية الفصل التلقائي" },
  "Language": { fr: "Langue", ar: "اللغة" },
  "Theme": { fr: "Thème", ar: "السمة" },
  "Dark · Default": { fr: "Sombre · Défaut", ar: "داكن · افتراضي" },
  "Disconnect Session": { fr: "Déconnecter la session", ar: "إنهاء الجلسة" },

  // Dashboard
  "Dashboard": { fr: "Tableau de bord", ar: "لوحة التحكم" },
  "GRID · LIVE · ENCRYPTED": { fr: "RÉSEAU · DIRECT · CHIFFRÉ", ar: "الشبكة · مباشر · مشفّر" },
  "System Status": { fr: "État du système", ar: "حالة النظام" },
  "All Systems": { fr: "Tous les systèmes", ar: "جميع الأنظمة" },
  "Protected": { fr: "Protégés", ar: "محمية" },
  "SAFETY LEVEL": { fr: "NIVEAU DE SÉCURITÉ", ar: "مستوى الأمان" },
  "OPTIMAL": { fr: "OPTIMAL", ar: "مثالي" },
  "Voltage": { fr: "Tension", ar: "الجهد" },
  "Current": { fr: "Courant", ar: "التيار" },
  "Power": { fr: "Puissance", ar: "الطاقة" },
  "Connectivity": { fr: "Connectivité", ar: "الاتصال" },
  "ALL LINKS UP": { fr: "TOUS LES LIENS ACTIFS", ar: "كل الاتصالات نشطة" },
  "Main Relay": { fr: "Relais principal", ar: "المرحل الرئيسي" },
  "ENERGIZED": { fr: "SOUS TENSION", ar: "مُشغّل" },
  "DISCONNECTED": { fr: "DÉCONNECTÉ", ar: "مفصول" },

  // Monitor
  "Live Monitor": { fr: "Surveillance en direct", ar: "المراقبة المباشرة" },
  "REAL-TIME · 50ms POLL": { fr: "TEMPS RÉEL · 50ms", ar: "الوقت الحقيقي · 50 م.ث" },
  "VOLTS AC": { fr: "VOLTS AC", ar: "فولت تيار متردد" },
  "AMPERES": { fr: "AMPÈRES", ar: "أمبير" },
  "Waveform": { fr: "Forme d'onde", ar: "الموجة" },
  "AC Sine · phase A": { fr: "Sinus AC · phase A", ar: "جيب تيار · الطور A" },
  "LIVE": { fr: "DIRECT", ar: "مباشر" },
  "MIN": { fr: "MIN", ar: "الأدنى" },
  "AVG": { fr: "MOY", ar: "المتوسط" },
  "MAX": { fr: "MAX", ar: "الأقصى" },

  // Control
  "Remote Control": { fr: "Contrôle à distance", ar: "التحكم عن بُعد" },
  "ENCRYPTED · ESP32 LINK": { fr: "CHIFFRÉ · LIEN ESP32", ar: "مشفّر · اتصال ESP32" },
  "Tap to toggle main contactor": { fr: "Touchez pour basculer le contacteur", ar: "اضغط لتبديل القاطع الرئيسي" },
  "Protection Mode": { fr: "Mode de protection", ar: "وضع الحماية" },
  "Standard": { fr: "Standard", ar: "قياسي" },
  "Sensitive": { fr: "Sensible", ar: "حساس" },
  "Industrial": { fr: "Industriel", ar: "صناعي" },
  "Night": { fr: "Nuit", ar: "ليلي" },
  "System Tests": { fr: "Tests système", ar: "اختبارات النظام" },
  "Buzzer": { fr: "Buzzer", ar: "الجرس" },
  "GSM Ping": { fr: "Ping GSM", ar: "اختبار GSM" },
  "GPS Fix": { fr: "Fix GPS", ar: "تثبيت GPS" },
  "Reset ESP32": { fr: "Réinit. ESP32", ar: "إعادة ضبط ESP32" },

  // Alarms
  "Alarms": { fr: "Alarmes", ar: "الإنذارات" },
  "ANOMALY TIMELINE · 24H": { fr: "CHRONOLOGIE · 24H", ar: "سجل الحوادث · 24 ساعة" },
  "Critical": { fr: "Critique", ar: "حرج" },
  "Warning": { fr: "Avertissement", ar: "تحذير" },
  "Info": { fr: "Info", ar: "معلومة" },
  "Overvoltage Detected": { fr: "Surtension détectée", ar: "تم اكتشاف فرط جهد" },
  "Phase A exceeded 248V — relay tripped automatically.": { fr: "La phase A a dépassé 248 V — le relais s'est déclenché automatiquement.", ar: "تجاوز الطور A 248 فولت — تم فصل المرحل تلقائيًا." },
  "Overcurrent Warning": { fr: "Avertissement de surintensité", ar: "تحذير فرط تيار" },
  "Load surged to 21.4 A on circuit B for 2.4s.": { fr: "La charge a atteint 21,4 A sur le circuit B pendant 2,4 s.", ar: "ارتفع الحمل إلى 21.4 أمبير على الدائرة B لمدة 2.4 ثانية." },
  "Overtemperature Critical": { fr: "Surchauffe critique", ar: "ارتفاع حرارة حرج" },
  "Power module reached 78.2°C — fan triggered.": { fr: "Le module a atteint 78,2 °C — ventilateur activé.", ar: "بلغت وحدة الطاقة 78.2°م — تم تشغيل المروحة." },
  "GSM Signal Drop": { fr: "Chute du signal GSM", ar: "انخفاض إشارة GSM" },
  "Signal strength below threshold for 12s.": { fr: "Signal sous le seuil pendant 12 s.", ar: "الإشارة تحت العتبة لمدة 12 ثانية." },
  "Brown-out Recovered": { fr: "Sous-tension rétablie", ar: "تمت استعادة الجهد" },
  "Voltage restored to nominal range after 3s dip.": { fr: "Tension rétablie après une baisse de 3 s.", ar: "عاد الجهد إلى المعدل بعد انخفاض 3 ثوانٍ." },
  "Yesterday": { fr: "Hier", ar: "أمس" },

  // GSM
  "GSM Module": { fr: "Module GSM", ar: "وحدة GSM" },
  "SIM7600 · 4G LTE": { fr: "SIM7600 · 4G LTE", ar: "SIM7600 · 4G LTE" },
  "SIM Status": { fr: "État SIM", ar: "حالة SIM" },
  "REGISTERED": { fr: "ENREGISTRÉE", ar: "مسجّلة" },
  "Operator": { fr: "Opérateur", ar: "المشغّل" },
  "Signal": { fr: "Signal", ar: "الإشارة" },
  "Mode": { fr: "Mode", ar: "النمط" },
  "Cell ID": { fr: "ID Cellule", ar: "معرّف الخلية" },
  "Send SMS Alert": { fr: "Envoyer un SMS", ar: "إرسال تنبيه SMS" },
  "Alert message…": { fr: "Message d'alerte…", ar: "رسالة التنبيه…" },
  "PowerGuard: anomaly detected. Voltage stable now.": { fr: "PowerGuard : anomalie détectée. Tension stable maintenant.", ar: "PowerGuard: تم اكتشاف خلل. الجهد مستقر الآن." },
  "TRANSMIT SMS": { fr: "ENVOYER SMS", ar: "إرسال SMS" },
  "EMERGENCY CALL": { fr: "APPEL D'URGENCE", ar: "اتصال الطوارئ" },

  // GPS
  "GPS Tracker": { fr: "Traceur GPS", ar: "متعقّب GPS" },
  "NEO-6M · 9 SATELLITES": { fr: "NEO-6M · 9 SATELLITES", ar: "NEO-6M · 9 أقمار" },
  "Latitude": { fr: "Latitude", ar: "خط العرض" },
  "Longitude": { fr: "Longitude", ar: "خط الطول" },
  "Altitude": { fr: "Altitude", ar: "الارتفاع" },
  "Speed": { fr: "Vitesse", ar: "السرعة" },
  "Navigate": { fr: "Naviguer", ar: "التوجيه" },
  "Share Location": { fr: "Partager position", ar: "مشاركة الموقع" },

  // Stats
  "ENERGY ANALYTICS": { fr: "ANALYSE ÉNERGÉTIQUE", ar: "تحليل الطاقة" },
  "Daily": { fr: "Jour", ar: "يومي" },
  "Weekly": { fr: "Semaine", ar: "أسبوعي" },
  "Monthly": { fr: "Mois", ar: "شهري" },
  "Total": { fr: "Total", ar: "الإجمالي" },
  "Peak": { fr: "Pic", ar: "الذروة" },
  "Cost": { fr: "Coût", ar: "التكلفة" },
  "Energy Consumption": { fr: "Consommation", ar: "استهلاك الطاقة" },
  "Voltage / Current": { fr: "Tension / Courant", ar: "الجهد / التيار" },

  // AI
  "NEURAL PROTECTION ENGINE": { fr: "MOTEUR DE PROTECTION NEURONAL", ar: "محرك الحماية العصبي" },
  "Risk Forecast · Next 24h": { fr: "Prévision risque · 24h", ar: "توقع المخاطر · 24 ساعة" },
  "LOW": { fr: "FAIBLE", ar: "منخفض" },
  "SAFE": { fr: "SÛR", ar: "آمن" },
  "WATCH": { fr: "VEILLE", ar: "مراقبة" },
  "WARN": { fr: "ALERTE", ar: "تحذير" },
  "CRITICAL": { fr: "CRITIQUE", ar: "حرج" },
  "Health": { fr: "Santé", ar: "الصحة" },
  "Trend": { fr: "Tendance", ar: "الاتجاه" },
  "Stable": { fr: "Stable", ar: "مستقر" },
  "Smart Recommendations": { fr: "Recommandations intelligentes", ar: "توصيات ذكية" },
  "Schedule load balance at 18:00": { fr: "Planifier équilibrage à 18:00", ar: "جدولة موازنة الحمل عند 18:00" },
  "Predicted peak demand on circuit B.": { fr: "Pic de demande prévu sur le circuit B.", ar: "ذروة طلب متوقعة على الدائرة B." },
  "Inspect cooling fan within 7 days": { fr: "Inspecter ventilateur sous 7 jours", ar: "افحص مروحة التبريد خلال 7 أيام" },
  "Temperature gradient rising 0.4°C/day.": { fr: "Gradient thermique +0,4 °C/jour.", ar: "تدرّج الحرارة يرتفع 0.4°م/يوم." },
  "Update GSM firmware": { fr: "Mettre à jour le firmware GSM", ar: "تحديث برنامج GSM" },
  "New revision improves signal stability by 12%.": { fr: "Nouvelle version : stabilité +12 %.", ar: "النسخة الجديدة تحسّن استقرار الإشارة بنسبة 12%." },

  // Login
  "Secure Access": { fr: "Accès sécurisé", ar: "دخول آمن" },
  "Welcome": { fr: "Bon retour", ar: "مرحبًا" },
  "back": { fr: "parmi nous", ar: "بعودتك" },
  "Authenticate to enter your protection grid.": { fr: "Authentifiez-vous pour accéder à votre réseau de protection.", ar: "قم بالتوثيق للدخول إلى شبكة الحماية." },
  "Email": { fr: "E-mail", ar: "البريد الإلكتروني" },
  "Password": { fr: "Mot de passe", ar: "كلمة المرور" },
  "Remember device": { fr: "Se souvenir de l'appareil", ar: "تذكّر هذا الجهاز" },
  "Forgot?": { fr: "Oublié ?", ar: "نسيت؟" },
  "ACCESS DASHBOARD": { fr: "ACCÉDER AU TABLEAU", ar: "الدخول إلى اللوحة" },
  "or": { fr: "ou", ar: "أو" },
  "New operator?": { fr: "Nouvel opérateur ?", ar: "مشغّل جديد؟" },
  "Request enrollment": { fr: "Demander l'inscription", ar: "طلب التسجيل" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("pg_lang")) as Lang | null;
    if (saved && (saved === "en" || saved === "fr" || saved === "ar")) {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("pg_lang", l);
  };

  const t = (key: string) => {
    if (lang === "en") return key;
    const entry = dict[key];
    if (!entry) return key;
    return entry[lang];
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
