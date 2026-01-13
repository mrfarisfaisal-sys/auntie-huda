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
    { icon: Zap, title: "Instant Roasts", description: "Get roasted in real-time. Bought coffee? Auntie has opinions. Wasteful spending triggers savage (but loving) responses.", color: "from-purple-500 to-violet-600" },
    { icon: Camera, title: "Receipt Scanner", description: "Snap a receipt, get roasted. AI extracts merchant, amount, and items — then judges you accordingly.", color: "from-blue-500 to-cyan-500" },
    { icon: MessageCircle, title: "Share Your Roasts", description: "One-tap share to Instagram or WhatsApp. Your friends need to see what Auntie said about your Talabat habit.", color: "from-pink-500 to-rose-500" },
    { icon: Trophy, title: "Streaks & Badges", description: "Like Duolingo, but for your wallet. Miss a day of logging? Auntie notices. Keep your streak alive.", color: "from-yellow-500 to-orange-500" },
    { icon: TrendingDown, title: "Savings Goals", description: "Tell Auntie what you're saving for. She'll remind you every time you waste money on things that aren't your goal.", color: "from-green-500 to-emerald-500" },
    { icon: Shield, title: "No Bank Connection", description: "We never connect to your bank. Your data stays on your device. Auntie judges, but she doesn't spy.", color: "from-red-500 to-pink-500" },
  ],
  ar: [
    { icon: Zap, title: "توبيخ فوري", description: "احصل على توبيخ لحظي. اشتريت قهوة؟ خالتك عندها رأي. الصرف الزايد يجيب ردود قاسية (بحب).", color: "from-purple-500 to-violet-600" },
    { icon: Camera, title: "ماسح الفواتير", description: "صور الفاتورة، واحصل على توبيخ. الذكاء الاصطناعي يستخرج التفاصيل ويحكم عليك.", color: "from-blue-500 to-cyan-500" },
    { icon: MessageCircle, title: "شارك توبيخك", description: "شارك بضغطة واحدة على انستغرام أو واتساب. أصحابك لازم يشوفون شو قالت خالتك!", color: "from-pink-500 to-rose-500" },
    { icon: Trophy, title: "ستريك وشارات", description: "مثل دوولينجو، بس لمحفظتك. فوت يوم؟ خالتك تلاحظ. حافظ على سلسلتك.", color: "from-yellow-500 to-orange-500" },
    { icon: TrendingDown, title: "أهداف التوفير", description: "قول لخالتك على شو توفر. بتذكرك كل ما صرفت على شي مو هدفك.", color: "from-green-500 to-emerald-500" },
    { icon: Shield, title: "بدون ربط بنكي", description: "ما نربط ببنكك أبداً. بياناتك تبقى على جهازك. خالتك تحكم، بس ما تتجسس.", color: "from-red-500 to-pink-500" },
  ],
  fr: [
    { icon: Zap, title: "Critiques Instantanées", description: "Faites-vous gronder en temps réel. Acheté un café? Tante a des opinions. Les dépenses inutiles déclenchent des réponses sauvages.", color: "from-purple-500 to-violet-600" },
    { icon: Camera, title: "Scanner de Reçus", description: "Capturez un reçu, faites-vous gronder. L'IA extrait le marchand et le montant — puis vous juge.", color: "from-blue-500 to-cyan-500" },
    { icon: MessageCircle, title: "Partagez Vos Critiques", description: "Partagez en un clic sur Instagram ou WhatsApp. Vos amis doivent voir ce que Tante a dit!", color: "from-pink-500 to-rose-500" },
    { icon: Trophy, title: "Séries & Badges", description: "Comme Duolingo, mais pour votre portefeuille. Manqué un jour? Tante remarque. Gardez votre série.", color: "from-yellow-500 to-orange-500" },
    { icon: TrendingDown, title: "Objectifs d'Épargne", description: "Dites à Tante pour quoi vous épargnez. Elle vous le rappellera chaque fois que vous gaspillez.", color: "from-green-500 to-emerald-500" },
    { icon: Shield, title: "Pas de Connexion Bancaire", description: "Nous ne nous connectons jamais à votre banque. Vos données restent sur votre appareil.", color: "from-red-500 to-pink-500" },
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
    { name: "Free", price: "0", description: "Get roasted forever", features: ["10 roasts per day", "Basic expense logging", "Standard Auntie mode", "Share roast cards", "Daily streak tracking"], cta: "Get Roasted Free", popular: false },
    { name: "Premium", price: "4.99", period: "/month", description: "Unlimited guilt trips", features: ["Everything in Free", "Unlimited roasts", "Receipt scanning (OCR)", "\"Savage Mode\" roasts 🔥", "Weekly roast summary", "Custom savings goals", "No ads forever"], cta: "Unlock Savage Mode", popular: true },
    { name: "Family", price: "9.99", period: "/month", description: "Gift accountability to your kids", features: ["Everything in Premium", "5 family accounts", "Family leaderboard", "Parent dashboard", "See who's overspending", "Shared savings goals"], cta: "Start Family Plan", popular: false },
  ],
  ar: [
    { name: "مجاني", price: "0", description: "احصل على توبيخ للأبد", features: ["10 توبيخات يومياً", "تسجيل مصاريف أساسي", "وضع خالتك العادي", "مشاركة بطاقات التوبيخ", "تتبع الستريك اليومي"], cta: "ابدأ مجاناً", popular: false },
    { name: "بريميوم", price: "4.99", period: "/شهر", description: "توبيخ غير محدود", features: ["كل مميزات المجاني", "توبيخ غير محدود", "مسح الفواتير (OCR)", "وضع سافج 🔥", "ملخص أسبوعي", "أهداف توفير مخصصة", "بدون إعلانات"], cta: "فعّل وضع سافج", popular: true },
    { name: "عائلي", price: "9.99", period: "/شهر", description: "أهدِ أولادك المسؤولية", features: ["كل مميزات البريميوم", "5 حسابات عائلية", "ترتيب العائلة", "لوحة الوالدين", "شوف مين يصرف زيادة", "أهداف مشتركة"], cta: "ابدأ العائلي", popular: false },
  ],
  fr: [
    { name: "Gratuit", price: "0", description: "Faites-vous gronder pour toujours", features: ["10 critiques par jour", "Suivi des dépenses basique", "Mode Tante standard", "Partage des cartes", "Suivi des séries"], cta: "Commencer Gratuit", popular: false },
    { name: "Premium", price: "4.99", period: "/mois", description: "Culpabilité illimitée", features: ["Tout du Gratuit", "Critiques illimitées", "Scanner de reçus (OCR)", "Mode Savage 🔥", "Résumé hebdomadaire", "Objectifs personnalisés", "Sans pub"], cta: "Débloquer Mode Savage", popular: true },
    { name: "Famille", price: "9.99", period: "/mois", description: "Offrez la responsabilité à vos enfants", features: ["Tout du Premium", "5 comptes famille", "Classement familial", "Tableau de bord parents", "Voir qui dépense trop", "Objectifs partagés"], cta: "Plan Famille", popular: false },
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

  // Translated content - NEW POSITIONING: "Accountability Entertainment" not "Budget App"
  const title = language === "ar" ? "خالتك هدى" : language === "fr" ? "Tante Huda" : "Auntie Huda";
  const heroTitle1 = language === "ar" ? "التطبيق المضاد للميزانية" : language === "fr" ? "L'Anti-App Budget" : "The Anti-Budget App";
  const heroTitle2 = language === "ar" ? "الذنب اللي ينفع فعلاً 🔥" : language === "fr" ? "La Culpabilité Qui Marche 🔥" : "Guilt That Actually Works 🔥";
  const heroSubtitle = language === "ar" 
    ? "بلا رسوم بيانية. بلا تصنيفات. بس خالتك هدى توبخك لما تصرف غلط. التطبيقات المالية مملة — الذنب ينفع."
    : language === "fr"
    ? "Pas de graphiques. Pas de catégories. Juste Tante Huda qui vous gronde quand vous dépensez mal. Les apps budget sont ennuyeuses — la culpabilité marche."
    : "No charts. No categories. Just Auntie Huda roasting you when you mess up. Budget apps are boring — guilt works.";
  const ctaText = language === "ar" ? "احصل على أول توبيخ — مجاناً" : language === "fr" ? "Recevez Votre Première Critique — Gratuit" : "Get Your First Roast — It's Free";
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
  const featuresTitle = language === "ar" ? "ليش الذنب أفضل من الرسوم البيانية" : language === "fr" ? "Pourquoi la Culpabilité Bat les Graphiques" : "Why Guilt Beats Spreadsheets";
  const featuresSubtitle = language === "ar" ? "التطبيقات المالية تفشل لأنها مملة. خالتك هدى تستخدم العاطفة — لأن الذنب يغير السلوك." : language === "fr" ? "Les apps budget échouent parce qu'elles sont ennuyeuses. Tante utilise l'émotion — parce que la culpabilité change le comportement." : "Budget apps fail because they're boring. Auntie uses emotion — because guilt changes behavior.";
  const howItWorksTitle = language === "ar" ? "كيف تعمل" : language === "fr" ? "Comment Ça Marche" : "How It Works";
  const howItWorksSubtitle = language === "ar" ? "ثلاث خطوات بسيطة للحرية المالية" : language === "fr" ? "Trois étapes simples vers la liberté financière" : "Three simple steps to financial freedom";
  const testimonialsTitle = language === "ar" ? "يحبه +50,000 مستخدم" : language === "fr" ? "Aimé par 50,000+ Utilisateurs" : "Loved by 50,000+ Users";
  const testimonialsSubtitle = language === "ar" ? "ناس حقيقيون يوفرون فلوس حقيقية مع خالتك هدى" : language === "fr" ? "De vraies personnes économisant de l'argent réel avec Tante Huda" : "Real people saving real money with Auntie Huda";
  const pricingTitle = language === "ar" ? "أسعار بسيطة وشفافة" : language === "fr" ? "Tarification Simple et Transparente" : "Simple, Transparent Pricing";
  const pricingSubtitle = language === "ar" ? "ابدأ مجاناً، ارتقي لما تكون جاهز" : language === "fr" ? "Commencez gratuit, passez au niveau supérieur quand vous êtes prêt" : "Start free, upgrade when you're ready";
  const faqTitle = language === "ar" ? "الأسئلة الشائعة" : language === "fr" ? "Questions Fréquentes" : "Frequently Asked Questions";
  const ctaTitle = language === "ar" ? "جاهز تتوبخ؟" : language === "fr" ? "Prêt à Vous Faire Gronder?" : "Ready to Get Roasted?";
  const ctaSubtitle = language === "ar" ? "انضم لآلاف اللي وقفوا صرفهم الزايد بسبب ذنب خالتك هدى. أمك ما تقدر تراقب مصاريفك — بس خالتك تقدر." : language === "fr" ? "Rejoignez des milliers qui ont arrêté de trop dépenser grâce à la culpabilité de Tante. Votre mère ne peut pas surveiller vos dépenses — Tante peut." : "Join thousands who stopped overspending because of Auntie's guilt trips. Your mom can't watch your spending — Auntie Huda can.";
  const ctaButton = language === "ar" ? "احصل على أول توبيخ" : language === "fr" ? "Recevez Votre Première Critique" : "Get Your First Roast";
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
