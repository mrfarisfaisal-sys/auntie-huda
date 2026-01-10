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
  PieChart,
  Star,
  Check,
  ArrowRight,
  Play,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Chat Like Family",
    description: "Talk to Auntie Huda like you're in the family WhatsApp group. She understands Arabizi and local slang.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Camera,
    title: "SMS Screenshot Magic",
    description: "Just snap your bank SMS notification. AI extracts the transaction instantly - no typing needed.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingDown,
    title: "Track Every Fils",
    description: "Daily spending limits, category breakdown, and real-time budget tracking across SAR, AED, EGP & more.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Trophy,
    title: "Gamified Savings",
    description: "Earn badges, maintain streaks, and compete with friends. Make saving money actually fun.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays on your device. No bank connections needed. We never see your actual transactions.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Instant Roasts",
    description: "Get real-time feedback on every purchase. Wasteful spending? Auntie won't hold back!",
    color: "from-indigo-500 to-purple-500",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Dubai, UAE",
    avatar: "👩🏻",
    text: "I've saved 2,000 AED in 2 months just because I didn't want to disappoint Khaltu Huda 😂 This app is genius!",
    saved: "2,000 AED",
  },
  {
    name: "Ahmed K.",
    location: "Riyadh, KSA",
    avatar: "👨🏻",
    text: "Finally an app that understands our culture! The roasts are hilarious and actually make me think twice before buying coffee.",
    saved: "1,500 SAR",
  },
  {
    name: "Fatima A.",
    location: "Cairo, Egypt",
    avatar: "👩🏻‍🦱",
    text: "My mom loves that I'm finally saving money. She thinks Khaltu Huda is her new best friend 💜",
    saved: "3,000 EGP",
  },
  {
    name: "Omar H.",
    location: "Kuwait City",
    avatar: "👨🏻‍🦲",
    text: "The screenshot feature is a game-changer. I just snap my bank SMS and Auntie does the rest. So easy!",
    saved: "500 KWD",
  },
];

const STATS = [
  { value: "50K+", label: "Active Users" },
  { value: "$2.5M", label: "Money Saved" },
  { value: "4.9★", label: "App Rating" },
  { value: "92%", label: "Stick to Budget" },
];

const PRICING = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "Unlimited roasts from Auntie",
      "Basic spending tracking",
      "Daily budget alerts",
      "3 screenshot scans/day",
      "Basic achievements",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Premium",
    price: "9.99",
    period: "/month",
    description: "For serious savers",
    features: [
      "Everything in Free",
      "Unlimited screenshot scans",
      "Advanced insights & charts",
      "Family group challenges",
      "Custom savings goals",
      "Export spending reports",
      "Priority support",
      "No ads forever",
    ],
    cta: "Start 7-Day Trial",
    popular: true,
  },
  {
    name: "Family",
    price: "19.99",
    period: "/month",
    description: "Up to 6 family members",
    features: [
      "Everything in Premium",
      "6 family member accounts",
      "Family leaderboard",
      "Shared savings goals",
      "Parent controls",
      "Family spending insights",
    ],
    cta: "Start Family Trial",
    popular: false,
  },
];

const FAQS = [
  {
    q: "Is my financial data safe?",
    a: "Absolutely! We never connect to your bank. All data stays on your device. We only see what you choose to share through screenshots or text input.",
  },
  {
    q: "Does Auntie Huda speak Arabic?",
    a: "Auntie speaks 'Arabizi' - a mix of English and Arabic that's natural for the MENA region. She understands Arabic numerals, local merchants, and regional currencies.",
  },
  {
    q: "How does the screenshot feature work?",
    a: "Just take a screenshot of your bank SMS notification and upload it. Our AI (GPT-4 Vision) extracts the merchant, amount, and currency automatically.",
  },
  {
    q: "Can I use this outside the Middle East?",
    a: "While Auntie Huda is designed for the MENA region, anyone who appreciates Arab culture and wants a fun way to track spending can use it!",
  },
  {
    q: "Is the roasting actually helpful?",
    a: "Yes! Studies show that emotional engagement increases behavioral change. Auntie's tough love approach makes you actually think twice before wasteful purchases.",
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👩‍🦳</span>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Auntie Huda
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Reviews</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Try Free
              </Link>
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
              <a href="#features" className="block text-gray-300 py-2">Features</a>
              <a href="#testimonials" className="block text-gray-300 py-2">Reviews</a>
              <a href="#pricing" className="block text-gray-300 py-2">Pricing</a>
              <a href="#faq" className="block text-gray-300 py-2">FAQ</a>
              <Link href="/" className="block bg-purple-600 text-white text-center py-3 rounded-xl font-medium">
                Try Free
              </Link>
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
              Your Arab Auntie
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Who Roasts Your Spending
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Meet Khaltu Huda — the AI-powered financial assistant who loves you enough to tell you the truth about your spending habits. 
            <span className="text-purple-400"> Habibi, that coffee habit has to go!</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/"
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center gap-2"
            >
              Start Saving Now — It's Free
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
            {STATS.map((stat, index) => (
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
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Save Like a Pro
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Auntie Huda comes with all the tools to track, analyze, and improve your spending habits — with a healthy dose of tough love.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => {
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
              How It Works
            </h2>
            <p className="text-gray-400">Three simple steps to financial freedom</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Log Your Spending", desc: "Type or screenshot your bank SMS. Auntie extracts it automatically.", emoji: "📱" },
              { step: "2", title: "Get Roasted (With Love)", desc: "Auntie analyzes your purchase and gives you her honest opinion.", emoji: "🔥" },
              { step: "3", title: "Watch Your Savings Grow", desc: "Track your progress, earn badges, and actually save money.", emoji: "💰" },
            ].map((item, index) => (
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
              Loved by{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                50,000+ Users
              </span>
            </h2>
            <p className="text-gray-400">Real people saving real money with Auntie Huda</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
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
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400">Start free, upgrade when you're ready</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan, index) => (
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
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
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
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
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
              Ready to Make Auntie Proud?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join 50,000+ users who are saving money and making their families proud. 
              Start your financial journey today — Khaltu Huda is waiting!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
            >
              Start Free Today
              <ArrowRight size={20} />
            </Link>
            <p className="text-gray-500 text-sm mt-4">No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👩‍🦳</span>
              <span className="font-bold text-xl">Auntie Huda</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Auntie Huda. Made with 💜 in the Middle East.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
