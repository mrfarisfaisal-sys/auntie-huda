"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingDown,
  Shield,
  Zap,
  Trophy,
  MessageCircle,
  Camera,
  Star,
  Check,
  ArrowRight,
  Play,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AuthButton } from "@/components/AuthButton";

const FEATURES = {
  en: [
    { icon: MessageCircle, title: "Chat Like Family", description: "Talk to Auntie Huda like you're in the family WhatsApp group. She understands Arabizi and local slang.", color: "from-purple-500 to-violet-600" },
    { icon: Camera, title: "SMS Screenshot Magic", description: "Just snap your bank SMS notification. AI extracts the transaction instantly - no typing needed.", color: "from-blue-500 to-cyan-500" },
    { icon: TrendingDown, title: "Track Every Fils", description: "Daily spending limits, category breakdown, and real-time budget tracking across SAR, AED, EGP & more.", color: "from-green-500 to-emerald-500" },
    { icon: Trophy, title: "Gamified Savings", description: "Earn badges, maintain streaks, and compete with friends. Make saving money actually fun.", color: "from-yellow-500 to-orange-500" },
    { icon: Shield, title: "Privacy First", description: "Your data stays on your device. No bank connections needed. We never see your actual transactions.", color: "from-red-500 to-pink-500" },
    { icon: Zap, title: "Instant Roasts", description: "Get real-time feedback on every purchase. Wasteful spending? Auntie won't hold back!", color: "from-indigo-500 to-purple-500" },
  ],
  ar: [
    { icon: MessageCircle, title: "دردشة عائلية", description: "تكلم مع خالتك هدى مثل قروب العائلة بالواتساب. تفهم العربيزي واللهجات المحلية.", color: "from-purple-500 to-violet-600" },
    { icon: Camera, title: "سحر صور الرسائل", description: "صور رسالة البنك وخلاص. الذكاء الاصطناعي يستخرج المعاملة تلقائياً.", color: "from-blue-500 to-cyan-500" },
    { icon: TrendingDown, title: "تتبع كل فلس", description: "ميزانية يومية، تصنيف المصاريف، وتتبع لحظي بكل العملات.", color: "from-green-500 to-emerald-500" },
    { icon: Trophy, title: "توفير ممتع", description: "اكسب شارات، حافظ على الستريك، ونافس أصحابك. خل التوفير ممتع!", color: "from-yellow-500 to-orange-500" },
    { icon: Shield, title: "خصوصية أولاً", description: "بياناتك تبقى على جهازك. ما نحتاج ربط بنكي. ما نشوف معاملاتك أبداً.", color: "from-red-500 to-pink-500" },
    { icon: Zap, title: "ردود فورية", description: "احصل على رد فوري على كل شراء. مصروف زايد؟ خالتك ما تسكت!", color: "from-indigo-500 to-purple-500" },
  ],
  fr: [
    { icon: MessageCircle, title: "Discutez en Famille", description: "Parlez à Tante Huda comme dans le groupe WhatsApp familial. Elle comprend l'argot local.", color: "from-purple-500 to-violet-600" },
    { icon: Camera, title: "Magie des Screenshots", description: "Capturez votre SMS bancaire. L'IA extrait la transaction instantanément.", color: "from-blue-500 to-cyan-500" },
    { icon: TrendingDown, title: "Suivez Chaque Centime", description: "Limites quotidiennes, catégories de dépenses, et suivi en temps réel.", color: "from-green-500 to-emerald-500" },
    { icon: Trophy, title: "Épargne Gamifiée", description: "Gagnez des badges, maintenez vos séries, et défiez vos amis.", color: "from-yellow-500 to-orange-500" },
    { icon: Shield, title: "Vie Privée d'Abord", description: "Vos données restent sur votre appareil. Pas de connexion bancaire.", color: "from-red-500 to-pink-500" },
    { icon: Zap, title: "Critiques Instantanées", description: "Obtenez un retour instantané sur chaque achat. Dépense inutile? Tante ne se retient pas!", color: "from-indigo-500 to-purple-500" },
  ],
};

const TESTIMONIALS = {
  en: [
    { name: "Sarah M.", location: "Dubai, UAE", avatar: "👩🏻", text: "I've saved 2,000 AED in 2 months just because I didn't want to disappoint Khaltu Huda 😂 This app is genius!", saved: "2,000 AED" },
    { name: "Ahmed K.", location: "Riyadh, KSA", avatar: "👨🏻", text: "Finally an app that understands our culture! The roasts are hilarious and actually make me think twice before buying coffee.", saved: "1,500 SAR" },
    { name: "Fatima A.", location: "Cairo, Egypt", avatar: "👩🏻‍🦱", text: "My mom loves that I'm finally saving money. She thinks Khaltu Huda is her new best friend 💜", saved: "3,000 EGP" },
    { name: "Omar H.", location: "Kuwait City", avatar: "👨🏻‍🦲", text: "The screenshot feature is a game-changer. I just snap my bank SMS and Auntie does the rest. So easy!", saved: "500 KWD" },
  ],
  ar: [
    { name: "سارة م.", location: "دبي، الإمارات", avatar: "👩🏻", text: "وفرت 2,000 درهم في شهرين بس لأني ما أبي أخيب ظن خالتي هدى 😂 التطبيق عبقري!", saved: "2,000 AED" },
    { name: "أحمد ك.", location: "الرياض، السعودية", avatar: "👨🏻", text: "أخيراً تطبيق يفهم ثقافتنا! الردود مضحكة وفعلاً تخليني أفكر مرتين قبل القهوة.", saved: "1,500 SAR" },
    { name: "فاطمة أ.", location: "القاهرة، مصر", avatar: "👩🏻‍🦱", text: "أمي مبسوطة إني أخيراً أوفر فلوس. تحسب خالتي هدى صاحبتها الجديدة 💜", saved: "3,000 EGP" },
    { name: "عمر هـ.", location: "الكويت", avatar: "👨🏻‍🦲", text: "ميزة الصور غيرت كل شي. أصور رسالة البنك وخالتي تسوي الباقي. سهل جداً!", saved: "500 KWD" },
  ],
  fr: [
    { name: "Sarah M.", location: "Dubaï, EAU", avatar: "👩🏻", text: "J'ai économisé 2,000 AED en 2 mois juste parce que je ne voulais pas décevoir Tante Huda 😂 Cette app est géniale!", saved: "2,000 AED" },
    { name: "Ahmed K.", location: "Riyad, KSA", avatar: "👨🏻", text: "Enfin une app qui comprend notre culture! Les critiques sont hilarantes et me font réfléchir avant d'acheter.", saved: "1,500 SAR" },
    { name: "Fatima A.", location: "Le Caire, Égypte", avatar: "👩🏻‍🦱", text: "Ma mère adore que j'économise enfin. Elle pense que Tante Huda est sa nouvelle meilleure amie 💜", saved: "3,000 EGP" },
    { name: "Omar H.", location: "Koweït", avatar: "👨🏻‍🦲", text: "La fonction screenshot change tout. Je capture mon SMS et Tante fait le reste. Trop facile!", saved: "500 KWD" },
  ],
};

const STATS = {
  en: [
    { value: "50K+", label: "Active Users" },
    { value: "$2.5M", label: "Money Saved" },
    { value: "4.9★", label: "App Rating" },
    { value: "92%", label: "Stick to Budget" },
  ],
  ar: [
    { value: "+50 ألف", label: "مستخدم نشط" },
    { value: "$2.5M", label: "تم توفيرها" },
    { value: "4.9★", label: "تقييم التطبيق" },
    { value: "92%", label: "التزموا بالميزانية" },
  ],
  fr: [
    { value: "50K+", label: "Utilisateurs Actifs" },
    { value: "$2.5M", label: "Économisé" },
    { value: "4.9★", label: "Note de l'App" },
    { value: "92%", label: "Respectent le Budget" },
  ],
};

const PRICING = {
  en: [
    { name: "Free", price: "0", description: "Perfect for getting started", features: ["Unlimited roasts from Auntie", "Basic spending tracking", "Daily budget alerts", "3 screenshot scans/day", "Basic achievements"], cta: "Start Free", popular: false },
    { name: "Premium", price: "9.99", period: "/month", description: "For serious savers", features: ["Everything in Free", "Unlimited screenshot scans", "Advanced insights & charts", "Family group challenges", "Custom savings goals", "Export spending reports", "Priority support", "No ads forever"], cta: "Start 7-Day Trial", popular: true },
    { name: "Family", price: "19.99", period: "/month", description: "Up to 6 family members", features: ["Everything in Premium", "6 family member accounts", "Family leaderboard", "Shared savings goals", "Parent controls", "Family spending insights"], cta: "Start Family Trial", popular: false },
  ],
  ar: [
    { name: "مجاني", price: "0", description: "مثالي للبداية", features: ["ردود غير محدودة من خالتك", "تتبع مصاريف أساسي", "تنبيهات الميزانية اليومية", "3 صور يومياً", "إنجازات أساسية"], cta: "ابدأ مجاناً", popular: false },
    { name: "بريميوم", price: "9.99", period: "/شهر", description: "للموفرين الجادين", features: ["كل مميزات المجاني", "صور غير محدودة", "تحليلات ورسوم متقدمة", "تحديات عائلية", "أهداف توفير مخصصة", "تصدير التقارير", "دعم أولوية", "بدون إعلانات للأبد"], cta: "جرب 7 أيام مجاناً", popular: true },
    { name: "عائلي", price: "19.99", period: "/شهر", description: "حتى 6 أفراد", features: ["كل مميزات البريميوم", "6 حسابات عائلية", "ترتيب العائلة", "أهداف توفير مشتركة", "تحكم الوالدين", "تحليلات العائلة"], cta: "جرب العائلي", popular: false },
  ],
  fr: [
    { name: "Gratuit", price: "0", description: "Parfait pour commencer", features: ["Critiques illimitées de Tante", "Suivi des dépenses basique", "Alertes budget quotidiennes", "3 captures/jour", "Succès basiques"], cta: "Commencer Gratuit", popular: false },
    { name: "Premium", price: "9.99", period: "/mois", description: "Pour les épargnants sérieux", features: ["Tout du Gratuit", "Captures illimitées", "Analyses avancées", "Défis familiaux", "Objectifs personnalisés", "Export des rapports", "Support prioritaire", "Sans pub pour toujours"], cta: "Essai 7 Jours", popular: true },
    { name: "Famille", price: "19.99", period: "/mois", description: "Jusqu'à 6 membres", features: ["Tout du Premium", "6 comptes famille", "Classement familial", "Objectifs partagés", "Contrôle parental", "Analyses familiales"], cta: "Essai Famille", popular: false },
  ],
};

const FAQS = {
  en: [
    { q: "Is my financial data safe?", a: "Absolutely! We never connect to your bank. All data stays on your device. We only see what you choose to share through screenshots or text input." },
    { q: "Does Auntie Huda speak Arabic?", a: "Auntie speaks 'Arabizi' - a mix of English and Arabic that's natural for the MENA region. She understands Arabic numerals, local merchants, and regional currencies." },
    { q: "How does the screenshot feature work?", a: "Just take a screenshot of your bank SMS notification and upload it. Our AI (GPT-4 Vision) extracts the merchant, amount, and currency automatically." },
    { q: "Can I use this outside the Middle East?", a: "While Auntie Huda is designed for the MENA region, anyone who appreciates Arab culture and wants a fun way to track spending can use it!" },
    { q: "Is the roasting actually helpful?", a: "Yes! Studies show that emotional engagement increases behavioral change. Auntie's tough love approach makes you actually think twice before wasteful purchases." },
  ],
  ar: [
    { q: "هل بياناتي المالية آمنة؟", a: "طبعاً! ما نربط ببنكك أبداً. كل البيانات تبقى على جهازك. ما نشوف إلا اللي تشاركه معنا بالصور أو الكتابة." },
    { q: "هل خالتك هدى تتكلم عربي؟", a: "خالتك تتكلم 'عربيزي' - خليط من الإنجليزي والعربي طبيعي لمنطقتنا. تفهم الأرقام العربية والمحلات والعملات المحلية." },
    { q: "كيف تعمل ميزة الصور؟", a: "صور رسالة البنك وارفعها. الذكاء الاصطناعي (GPT-4 Vision) يستخرج المحل والمبلغ والعملة تلقائياً." },
    { q: "أقدر أستخدمه برا الشرق الأوسط؟", a: "خالتك هدى مصممة للمنطقة، بس أي أحد يحب الثقافة العربية ويبي طريقة ممتعة لتتبع مصاريفه يقدر يستخدمها!" },
    { q: "هل التوبيخ فعلاً يفيد؟", a: "إي! الدراسات تثبت أن التفاعل العاطفي يزيد تغيير السلوك. أسلوب خالتك القاسي بحب يخليك تفكر مرتين قبل الصرف الزايد." },
  ],
  fr: [
    { q: "Mes données financières sont-elles sécurisées?", a: "Absolument! Nous ne nous connectons jamais à votre banque. Toutes les données restent sur votre appareil." },
    { q: "Tante Huda parle-t-elle arabe?", a: "Tante parle 'Arabizi' - un mélange d'anglais et d'arabe naturel pour la région MENA. Elle comprend les chiffres arabes et les devises locales." },
    { q: "Comment fonctionne la capture d'écran?", a: "Capturez votre SMS bancaire et téléchargez-le. Notre IA (GPT-4 Vision) extrait automatiquement le marchand, le montant et la devise." },
    { q: "Puis-je l'utiliser hors du Moyen-Orient?", a: "Bien que Tante Huda soit conçue pour la région MENA, tous ceux qui apprécient la culture arabe peuvent l'utiliser!" },
    { q: "Les critiques sont-elles vraiment utiles?", a: "Oui! Les études montrent que l'engagement émotionnel augmente le changement de comportement. L'approche de Tante vous fait réfléchir avant d'acheter." },
  ],
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { language, t, dir } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Translated content
  const title = language === "ar" ? "خالتك هدى" : language === "fr" ? "Tante Huda" : "Auntie Huda";
  const heroTitle1 = language === "ar" ? "خالتك العربية" : language === "fr" ? "Votre Tante Arabe" : "Your Arab Auntie";
  const heroTitle2 = language === "ar" ? "اللي تحاسبك على مصاريفك" : language === "fr" ? "Qui Critique Vos Dépenses" : "Who Roasts Your Spending";
  const heroSubtitle = language === "ar" 
    ? "تعرف على خالتك هدى — مستشارتك المالية بالذكاء الاصطناعي اللي تحبك لدرجة تقولك الحقيقة عن مصاريفك."
    : language === "fr"
    ? "Découvrez Tante Huda — l'assistante financière IA qui vous aime assez pour vous dire la vérité sur vos dépenses."
    : "Meet Khaltu Huda — the AI-powered financial assistant who loves you enough to tell you the truth about your spending habits.";
  const ctaText = language === "ar" ? "ابدأ التوفير الآن — مجاناً" : language === "fr" ? "Commencez à Épargner — Gratuit" : "Start Saving Now — It's Free";
  const loginText = language === "ar" ? "تسجيل الدخول" : language === "fr" ? "Connexion" : "Login";
  const tryFreeText = language === "ar" ? "جرب مجاناً" : language === "fr" ? "Essayer Gratuit" : "Try Free";
  const featuresNav = language === "ar" ? "المميزات" : language === "fr" ? "Fonctionnalités" : "Features";
  const reviewsNav = language === "ar" ? "آراء المستخدمين" : language === "fr" ? "Avis" : "Reviews";
  const pricingNav = language === "ar" ? "الأسعار" : language === "fr" ? "Tarifs" : "Pricing";
  const faqNav = language === "ar" ? "الأسئلة الشائعة" : language === "fr" ? "FAQ" : "FAQ";

  // Get language-specific data
  const features = FEATURES[language] || FEATURES.en;
  const testimonials = TESTIMONIALS[language] || TESTIMONIALS.en;
  const stats = STATS[language] || STATS.en;
  const pricing = PRICING[language] || PRICING.en;
  const faqs = FAQS[language] || FAQS.en;

  // Section titles
  const featuresTitle = language === "ar" ? "كل اللي تحتاجه لتوفر مثل المحترفين" : language === "fr" ? "Tout pour Épargner Comme un Pro" : "Everything You Need to Save Like a Pro";
  const featuresSubtitle = language === "ar" ? "خالتك هدى تجيك بكل الأدوات لتتبع وتحلل وتحسن مصاريفك — مع جرعة صحية من الحب القاسي." : language === "fr" ? "Tante Huda vient avec tous les outils pour suivre et améliorer vos dépenses — avec une dose d'amour dur." : "Auntie Huda comes with all the tools to track, analyze, and improve your spending habits — with a healthy dose of tough love.";
  const howItWorksTitle = language === "ar" ? "كيف تعمل" : language === "fr" ? "Comment Ça Marche" : "How It Works";
  const howItWorksSubtitle = language === "ar" ? "ثلاث خطوات بسيطة للحرية المالية" : language === "fr" ? "Trois étapes simples vers la liberté financière" : "Three simple steps to financial freedom";
  const testimonialsTitle = language === "ar" ? "يحبه +50,000 مستخدم" : language === "fr" ? "Aimé par 50,000+ Utilisateurs" : "Loved by 50,000+ Users";
  const testimonialsSubtitle = language === "ar" ? "ناس حقيقيون يوفرون فلوس حقيقية مع خالتك هدى" : language === "fr" ? "De vraies personnes économisant de l'argent réel avec Tante Huda" : "Real people saving real money with Auntie Huda";
  const pricingTitle = language === "ar" ? "أسعار بسيطة وشفافة" : language === "fr" ? "Tarification Simple et Transparente" : "Simple, Transparent Pricing";
  const pricingSubtitle = language === "ar" ? "ابدأ مجاناً، ارتقي لما تكون جاهز" : language === "fr" ? "Commencez gratuit, passez au niveau supérieur quand vous êtes prêt" : "Start free, upgrade when you're ready";
  const faqTitle = language === "ar" ? "الأسئلة الشائعة" : language === "fr" ? "Questions Fréquentes" : "Frequently Asked Questions";
  const ctaTitle = language === "ar" ? "جاهز تفرح خالتك؟" : language === "fr" ? "Prêt à Rendre Tante Fière?" : "Ready to Make Auntie Proud?";
  const ctaSubtitle = language === "ar" ? "انضم لـ +50,000 مستخدم يوفرون فلوس ويفرحون عائلاتهم. ابدأ رحلتك المالية اليوم — خالتك هدى تنتظرك!" : language === "fr" ? "Rejoignez 50,000+ utilisateurs qui économisent et rendent leurs familles fières. Commencez votre parcours financier aujourd'hui!" : "Join 50,000+ users who are saving money and making their families proud. Start your financial journey today — Khaltu Huda is waiting!";
  const ctaButton = language === "ar" ? "ابدأ مجاناً اليوم" : language === "fr" ? "Commencer Gratuit Aujourd'hui" : "Start Free Today";
  const noCreditCard = language === "ar" ? "لا حاجة لبطاقة ائتمان" : language === "fr" ? "Pas de carte de crédit requise" : "No credit card required";
  const footerText = language === "ar" ? "صنع بـ 💜 في الشرق الأوسط" : language === "fr" ? "Fait avec 💜 au Moyen-Orient" : "Made with 💜 in the Middle East";
  const mostPopular = language === "ar" ? "الأكثر شعبية" : language === "fr" ? "Le Plus Populaire" : "Most Popular";
  const savedText = language === "ar" ? "وفّر" : language === "fr" ? "Économisé" : "Saved";
  const watchDemo = language === "ar" ? "شاهد العرض" : language === "fr" ? "Voir la Démo" : "Watch Demo";

  // How it works steps
  const howItWorksSteps = language === "ar" 
    ? [{ step: "1", title: "سجل مصاريفك", desc: "اكتب أو صور رسالة البنك. خالتك تستخرجها تلقائياً.", emoji: "📱" }, { step: "2", title: "احصل على رد (بحب)", desc: "خالتك تحلل مشترياتك وتعطيك رأيها الصادق.", emoji: "🔥" }, { step: "3", title: "شاهد توفيرك ينمو", desc: "تتبع تقدمك، اكسب شارات، ووفر فلوس فعلياً.", emoji: "💰" }]
    : language === "fr"
    ? [{ step: "1", title: "Enregistrez Vos Dépenses", desc: "Tapez ou capturez votre SMS. Tante l'extrait automatiquement.", emoji: "📱" }, { step: "2", title: "Recevez des Critiques (Avec Amour)", desc: "Tante analyse vos achats et donne son avis honnête.", emoji: "🔥" }, { step: "3", title: "Regardez Votre Épargne Grandir", desc: "Suivez vos progrès, gagnez des badges, et économisez.", emoji: "💰" }]
    : [{ step: "1", title: "Log Your Spending", desc: "Type or screenshot your bank SMS. Auntie extracts it automatically.", emoji: "📱" }, { step: "2", title: "Get Roasted (With Love)", desc: "Auntie analyzes your purchase and gives you her honest opinion.", emoji: "🔥" }, { step: "3", title: "Watch Your Savings Grow", desc: "Track your progress, earn badges, and actually save money.", emoji: "💰" }];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white scrollable">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👩‍🦳</span>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {title}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">{featuresNav}</a>
              <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">{reviewsNav}</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">{pricingNav}</a>
              <a href="#faq" className="text-gray-400 hover:text-white transition-colors">{faqNav}</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <AuthButton />
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#1a1a2e] border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="pb-3 border-b border-white/10">
                <LanguageSwitcher variant="inline" />
              </div>
              <a href="#features" className="block text-gray-300 py-2">{featuresNav}</a>
              <a href="#testimonials" className="block text-gray-300 py-2">{reviewsNav}</a>
              <a href="#pricing" className="block text-gray-300 py-2">{pricingNav}</a>
              <a href="#faq" className="block text-gray-300 py-2">{faqNav}</a>
              <div className="pt-3 border-t border-white/10">
                <AuthButton />
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-sm text-gray-300">
              #1 Finance App in MENA Region
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              {heroTitle1}
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {heroTitle2}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            {heroSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/chat"
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center gap-2"
            >
              {ctaText}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-6 py-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Play size={20} fill="currentColor" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Auntie Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30" />
            <div className="relative bg-[#1a1a2e] rounded-3xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0">
                  👩‍🦳
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">Khaltu Huda</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">AI</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl rounded-tl-none p-4 text-left"
                  >
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Walahi?! 45 SAR on Starbucks AGAIN? ☕️ Habibi, my home coffee is FREE. 
                      You know Cousin Ahmed? He's a doctor now because he saved his coffee money! 
                      <span className="text-purple-300"> Stop trying to give me a heart attack! 💔</span>
                    </p>
                  </motion.div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-green-600/20 rounded-2xl rounded-br-none px-4 py-2 text-sm text-gray-300">
                  Starbucks - 45 SAR
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={32} className="text-gray-500" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5 bg-[#0f0f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat: { value: string; label: string }, index: number) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {featuresTitle}
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {featuresSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature: { icon: React.ComponentType<{ size: number; className: string }>; title: string; description: string; color: string }, index: number) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#0f0f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {howItWorksTitle}
            </h2>
            <p className="text-gray-400">{howItWorksSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="text-6xl mb-4">{item.emoji}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {testimonialsTitle}
              </span>
            </h2>
            <p className="text-gray-400">{testimonialsSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial: { name: string; location: string; avatar: string; text: string; saved: string }, index: number) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-medium text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-400 font-medium">
                    Saved {testimonial.saved}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[#0f0f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {pricingTitle}
            </h2>
            <p className="text-gray-400">{pricingSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan: { name: string; price: string; period?: string; description: string; features: string[]; cta: string; popular: boolean }, index: number) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-purple-900/50 to-[#1a1a2e] border-2 border-purple-500"
                    : "bg-[#1a1a2e] border border-white/5"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                    {mostPopular}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check size={16} className="text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {faqTitle}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq: { q: string; a: string }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a2e] rounded-xl border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-400">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0f0f1f] to-[#0a0a1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">👩‍🦳</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {ctaTitle}
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              {ctaSubtitle}
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
            >
              {ctaButton}
              <ArrowRight size={20} />
            </Link>
            <p className="text-gray-500 text-sm mt-4">{noCreditCard}</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👩‍🦳</span>
              <span className="font-bold text-xl">{title}</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">{language === "ar" ? "الخصوصية" : language === "fr" ? "Confidentialité" : "Privacy"}</a>
              <a href="#" className="hover:text-white transition-colors">{language === "ar" ? "الشروط" : language === "fr" ? "Conditions" : "Terms"}</a>
              <a href="#" className="hover:text-white transition-colors">{language === "ar" ? "تواصل معنا" : language === "fr" ? "Contact" : "Contact"}</a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 {title}. {footerText}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
