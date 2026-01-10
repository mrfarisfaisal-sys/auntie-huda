/**
 * Multi-language translations for Auntie Huda
 * Supported: English (en), Arabic (ar), French (fr)
 */

export type Language = "en" | "ar" | "fr";

export const languages: { code: Language; name: string; nativeName: string; dir: "ltr" | "rtl"; flag: string }[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "🇸🇦" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr", flag: "🇫🇷" },
];

export const translations = {
  // Landing Page
  landing: {
    title: {
      en: "Auntie Huda",
      ar: "خالتك هدى",
      fr: "Tante Huda",
    },
    subtitle: {
      en: "Your Finance Roast AI",
      ar: "مستشارتك المالية",
      fr: "Votre Coach Financier IA",
    },
    description: {
      en: "Your favorite Arab auntie who roasts your spending habits with love! Track expenses, set savings goals, and get honest feedback.",
      ar: "خالتك العربية اللي تحاسبك على مصاريفك بحب! تتبع مصاريفك، حدد أهداف التوفير، واحصل على ردود صادقة.",
      fr: "Votre tante arabe préférée qui critique vos habitudes de dépenses avec amour! Suivez vos dépenses, fixez des objectifs d'épargne.",
    },
    cta: {
      en: "Start Saving Now",
      ar: "ابدأ التوفير الآن",
      fr: "Commencez à Épargner",
    },
    features: {
      title: {
        en: "Features",
        ar: "المميزات",
        fr: "Fonctionnalités",
      },
      tracking: {
        title: {
          en: "Smart Tracking",
          ar: "تتبع ذكي",
          fr: "Suivi Intelligent",
        },
        desc: {
          en: "Track every transaction with AI-powered analysis",
          ar: "تتبع كل معاملة بتحليل الذكاء الاصطناعي",
          fr: "Suivez chaque transaction avec analyse IA",
        },
      },
      goals: {
        title: {
          en: "Savings Goals",
          ar: "أهداف التوفير",
          fr: "Objectifs d'Épargne",
        },
        desc: {
          en: "Set goals for car, wedding, travel & more",
          ar: "حدد أهدافك: سيارة، زواج، سفر والمزيد",
          fr: "Fixez des objectifs: voiture, mariage, voyage",
        },
      },
      challenges: {
        title: {
          en: "Daily Challenges",
          ar: "تحديات يومية",
          fr: "Défis Quotidiens",
        },
        desc: {
          en: "Complete challenges to boost your savings",
          ar: "أكمل التحديات لزيادة توفيرك",
          fr: "Complétez des défis pour augmenter votre épargne",
        },
      },
      roasts: {
        title: {
          en: "Honest Feedback",
          ar: "ردود صادقة",
          fr: "Retours Honnêtes",
        },
        desc: {
          en: "Get roasted with love by Auntie Huda",
          ar: "احصل على توبيخ بحب من خالتك هدى",
          fr: "Recevez des critiques avec amour de Tante Huda",
        },
      },
    },
  },

  // Onboarding
  onboarding: {
    welcome: {
      title: {
        en: "Hello, Habibi! 👋",
        ar: "أهلاً يا حبيبي! 👋",
        fr: "Bonjour, Habibi! 👋",
      },
      subtitle: {
        en: "I am Auntie Huda, your favorite auntie",
        ar: "أنا خالتك هدى، خالتك المفضلة",
        fr: "Je suis Tante Huda, votre tante préférée",
      },
      desc: {
        en: "I love you like my own children, but your spending habits... they keep me up at night! 😤",
        ar: "أحبك مثل ولدي، بس والله طريقة صرفك... تسهرني بالليل! 😤",
        fr: "Je t'aime comme mon propre enfant, mais tes habitudes de dépenses... elles m'empêchent de dormir! 😤",
      },
    },
    name: {
      title: {
        en: "What's your name?",
        ar: "شو اسمك؟",
        fr: "Comment tu t'appelles?",
      },
      subtitle: {
        en: "So I know who to roast properly 🔥",
        ar: "عشان أعرف مين أوبخ 🔥",
        fr: "Pour savoir qui gronder 🔥",
      },
      placeholder: {
        en: "Enter your name...",
        ar: "اكتب اسمك...",
        fr: "Entrez votre nom...",
      },
      hint: {
        en: "Don't worry, Cousin Ahmed already told me everything 👀",
        ar: "لا تخاف، ابن عمك أحمد قالي كل شي 👀",
        fr: "Ne t'inquiète pas, Cousin Ahmed m'a déjà tout dit 👀",
      },
    },
    currency: {
      title: {
        en: "Where are you from?",
        ar: "من وين أنت؟",
        fr: "D'où viens-tu?",
      },
      subtitle: {
        en: "Select your currency",
        ar: "اختر عملتك",
        fr: "Choisissez votre devise",
      },
    },
    budget: {
      title: {
        en: "Daily Spending Limit?",
        ar: "كم ميزانيتك اليومية؟",
        fr: "Limite de dépenses quotidienne?",
      },
      subtitle: {
        en: "I'll get angry if you exceed this 😡",
        ar: "بزعل لو تجاوزتها 😡",
        fr: "Je serai fâchée si tu dépasses 😡",
      },
      hint: {
        en: "Your mother would be proud if you stick to this! 🤲",
        ar: "أمك بتفتخر فيك لو التزمت! 🤲",
        fr: "Ta mère serait fière si tu respectes ça! 🤲",
      },
    },
    goal: {
      title: {
        en: "What are you saving for?",
        ar: "توفر لأجل شو؟",
        fr: "Pour quoi économises-tu?",
      },
      subtitle: {
        en: "Give Auntie a reason to yell at you 😤",
        ar: "عطيني سبب أصرخ عليك 😤",
        fr: "Donne-moi une raison de te gronder 😤",
      },
      customPlaceholder: {
        en: "What's your goal?",
        ar: "شو هدفك؟",
        fr: "Quel est ton objectif?",
      },
      targetAmount: {
        en: "Target Amount",
        ar: "المبلغ المستهدف",
        fr: "Montant Cible",
      },
    },
    promises: {
      title: {
        en: "Here's what I'll do for you",
        ar: "هذا اللي بسويه لك",
        fr: "Voici ce que je ferai pour toi",
      },
      subtitle: {
        en: "With love and tough love 💜",
        ar: "بحب وبقسوة 💜",
        fr: "Avec amour et fermeté 💜",
      },
      items: {
        track: {
          en: "Track every riyal you spend",
          ar: "أتابع كل ريال تصرفه",
          fr: "Suivre chaque centime que tu dépenses",
        },
        roast: {
          en: "Roast your wasteful purchases",
          ar: "أوبخك على المصاريف الزايدة",
          fr: "Critiquer tes achats inutiles",
        },
        celebrate: {
          en: "Celebrate your savings wins",
          ar: "أحتفل معاك بكل توفير",
          fr: "Célébrer tes économies",
        },
        help: {
          en: "Help you save for your goal",
          ar: "أساعدك توفر لهدفك",
          fr: "T'aider à atteindre ton objectif",
        },
      },
    },
    buttons: {
      next: {
        en: "Continue",
        ar: "التالي",
        fr: "Continuer",
      },
      start: {
        en: "Let's Start!",
        ar: "يلا نبدأ!",
        fr: "Commençons!",
      },
    },
  },

  // Chat
  chat: {
    header: {
      title: {
        en: "Auntie Huda",
        ar: "خالتي هدى",
        fr: "Tante Huda",
      },
      online: {
        en: "Online now",
        ar: "متصلة الآن",
        fr: "En ligne",
      },
      budget: {
        en: "Today's Budget",
        ar: "ميزانيتك اليوم",
        fr: "Budget du Jour",
      },
    },
    input: {
      placeholder: {
        en: "Type your expense... e.g. Starbucks 25",
        ar: "اكتب مصروفك... مثال: ستاربكس 25 ريال",
        fr: "Tapez votre dépense... ex: Starbucks 25",
      },
      helper: {
        en: "Upload a bank SMS screenshot or type the amount",
        ar: "صوّر رسالة البنك أو اكتب المبلغ مباشرة",
        fr: "Téléchargez une capture SMS bancaire ou tapez le montant",
      },
    },
    welcome: {
      en: "Hello! 👋 I'm Auntie Huda. Send me your expenses and I'll tell you the truth. Show me what you bought today! 💜",
      ar: "أهلاً يا حبيبي! 👋 أنا خالتك هدى. أرسلي مصاريفك وبقولك الحقيقة. يلا، وريني شو اشتريت اليوم! 💜",
      fr: "Bonjour! 👋 Je suis Tante Huda. Envoyez-moi vos dépenses et je vous dirai la vérité. Montrez-moi ce que vous avez acheté! 💜",
    },
    actions: {
      clearChat: {
        en: "Clear Chat",
        ar: "مسح المحادثة",
        fr: "Effacer le Chat",
      },
      resetDay: {
        en: "Reset Today",
        ar: "إعادة تعيين اليوم",
        fr: "Réinitialiser Aujourd'hui",
      },
    },
  },

  // Quick Actions
  quickActions: {
    coffee: { en: "Coffee", ar: "قهوة", fr: "Café" },
    delivery: { en: "Delivery", ar: "توصيل", fr: "Livraison" },
    shopping: { en: "Shopping", ar: "تسوق", fr: "Shopping" },
    transport: { en: "Transport", ar: "مواصلات", fr: "Transport" },
    groceries: { en: "Groceries", ar: "بقالة", fr: "Courses" },
  },

  // Daily Challenge
  challenge: {
    title: {
      en: "Today's Challenge",
      ar: "تحدي اليوم",
      fr: "Défi du Jour",
    },
    endsIn: {
      en: "Ends in",
      ar: "ينتهي خلال",
      fr: "Se termine dans",
    },
    reward: {
      en: "Reward",
      ar: "المكافأة",
      fr: "Récompense",
    },
    accept: {
      en: "Accept Challenge",
      ar: "قبول التحدي",
      fr: "Accepter le Défi",
    },
    completed: {
      en: "Completed",
      ar: "مكتمل",
      fr: "Terminé",
    },
    saving: {
      en: "savings",
      ar: "توفير",
      fr: "économies",
    },
  },

  // Savings
  savings: {
    goal: {
      en: "Savings Goal",
      ar: "هدف التوفير",
      fr: "Objectif d'Épargne",
    },
    todaySaving: {
      en: "Today's Saving",
      ar: "توفير اليوم",
      fr: "Économies du Jour",
    },
    addedEndOfDay: {
      en: "Added at end of day ✨",
      ar: "يُضاف لرصيدك نهاية اليوم ✨",
      fr: "Ajouté en fin de journée ✨",
    },
    of: {
      en: "of",
      ar: "من",
      fr: "sur",
    },
    complete: {
      en: "Complete! 🎉",
      ar: "تم! 🎉",
      fr: "Terminé! 🎉",
    },
    motivation: {
      complete: {
        en: "Mashallah! Auntie is SO proud of you!",
        ar: "ماشاء الله! خالتك فخورة فيك!",
        fr: "Mashallah! Tante est TRÈS fière de toi!",
      },
      halfway: {
        en: "More than halfway! Keep going!",
        ar: "أكثر من النص! كمّل يا بطل!",
        fr: "Plus de la moitié! Continue!",
      },
      start: {
        en: "Every riyal counts. You got this!",
        ar: "كل ريال يفرق. أنت تقدر!",
        fr: "Chaque centime compte. Tu peux le faire!",
      },
    },
  },

  // Common
  common: {
    streak: {
      en: "day streak",
      ar: "يوم متتالي",
      fr: "jours consécutifs",
    },
    days: {
      en: "days",
      ar: "أيام",
      fr: "jours",
    },
    hours: {
      en: "h",
      ar: "س",
      fr: "h",
    },
    minutes: {
      en: "m",
      ar: "د",
      fr: "m",
    },
    share: {
      en: "Share",
      ar: "مشاركة",
      fr: "Partager",
    },
    close: {
      en: "Close",
      ar: "إغلاق",
      fr: "Fermer",
    },
    save: {
      en: "Save",
      ar: "حفظ",
      fr: "Enregistrer",
    },
    cancel: {
      en: "Cancel",
      ar: "إلغاء",
      fr: "Annuler",
    },
  },

  // Savings Goals (for onboarding)
  savingsGoals: {
    phone: { en: "Phone / Tech", ar: "جوال / تقنية", fr: "Téléphone / Tech" },
    car: { en: "New Car", ar: "سيارة جديدة", fr: "Nouvelle Voiture" },
    wedding: { en: "Wedding", ar: "زواج", fr: "Mariage" },
    travel: { en: "Travel / Vacation", ar: "سفر / إجازة", fr: "Voyage / Vacances" },
    emergency: { en: "Emergency Fund", ar: "صندوق طوارئ", fr: "Fonds d'Urgence" },
    home: { en: "Home / Apartment", ar: "بيت / شقة", fr: "Maison / Appartement" },
    education: { en: "Education", ar: "تعليم", fr: "Éducation" },
    custom: { en: "Custom Goal", ar: "هدف آخر", fr: "Objectif Personnalisé" },
  },

  // Currencies
  currencies: {
    SAR: { en: "Saudi Riyal", ar: "ريال سعودي", fr: "Riyal Saoudien" },
    AED: { en: "UAE Dirham", ar: "درهم إماراتي", fr: "Dirham des EAU" },
    EGP: { en: "Egyptian Pound", ar: "جنيه مصري", fr: "Livre Égyptienne" },
    KWD: { en: "Kuwaiti Dinar", ar: "دينار كويتي", fr: "Dinar Koweïtien" },
    QAR: { en: "Qatari Riyal", ar: "ريال قطري", fr: "Riyal Qatari" },
    EUR: { en: "Euro", ar: "يورو", fr: "Euro" },
    USD: { en: "US Dollar", ar: "دولار أمريكي", fr: "Dollar Américain" },
  },
} as const;

// Helper type for translation keys
export type TranslationKey = keyof typeof translations;
