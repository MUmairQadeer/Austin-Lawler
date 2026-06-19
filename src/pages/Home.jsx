import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HardHat, ShieldCheck, TrendingUp, ChevronRight, Shield, Award, Users, Zap } from 'lucide-react';
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';

/* ──────────────── Animated Counter Hook ──────────────── */
const useCounter = (end, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [end, duration, delay]);
  return count;
};

/* ──────────────── Rotating Words Hook ──────────────── */
const ROTATING_WORDS = ['Safety', 'Rescue', 'Training', 'Gear'];
const useRotatingWord = (interval = 2800) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);
  return ROTATING_WORDS[index];
};

/* ──────────────── Golden Ember Particles ──────────────── */
const EmberParticles = () => {
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 80,
    }))
  ).current;

  return (
    <div className="absolute inset-0 pointer-events-none z-[6] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(250,204,21,${p.opacity + 0.3}) 0%, rgba(234,179,8,${p.opacity}) 60%, transparent 100%)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(234,179,8,${p.opacity * 0.6})`,
          }}
          animate={{
            y: [0, -(typeof window !== 'undefined' ? window.innerHeight : 900) * 1.2],
            x: [0, p.drift],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

/* ──────────────── Cursor-Tracking Spotlight ──────────────── */
const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = useCallback((e) => {
    setPos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
    if (!visible) setVisible(true);
  }, [visible]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[5] transition-opacity duration-700"
      style={{
        opacity: visible ? 1 : 0,
        background: `radial-gradient(600px circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(234,179,8,0.05) 0%, transparent 60%)`,
      }}
    />
  );
};

/* ══════════════════════════════════════════════════════════════════ */
/*                          HOME PAGE                                */
/* ══════════════════════════════════════════════════════════════════ */

const Home = () => {
  const trainedCount = useCounter(5000, 2200, 1200);
  const certCount = useCounter(120, 2000, 1400);
  const rotatingWord = useRotatingWord();
  const heroRef = useRef(null);

  /* Scroll-driven parallax */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -80]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  /* Stagger animation config */
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div className="flex flex-col min-h-screen">

      {/* ═══════════ HERO — Premium Cinematic ═══════════ */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-slate-950"
      >
        {/* ── BG Image with scroll parallax + scale ── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: bgY, scale: bgScale }}
        >
          <img
            src="/hero-section.jpg"
            alt=""
            width="1920"
            height="1080"
            fetchpriority="high"
            decoding="sync"
            className="w-full h-[85%] object-cover object-center"
          />
        </motion.div>

        {/* ── Cinematic Overlays ── */}
        <div className="absolute inset-0 z-[1] bg-slate-950/65" />
        <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.6) 40%, rgba(2,6,23,0.6) 60%, rgba(2,6,23,0.97) 100%)' }} />
        <div className="absolute inset-0 z-[3]" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.5) 100%)' }} />

        {/* Spotlight glow behind heading */}
        <motion.div
          className="absolute z-[4] pointer-events-none"
          style={{
            width: '700px',
            height: '400px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            background: 'radial-gradient(ellipse, rgba(250,204,21,0.07) 0%, rgba(234,179,8,0.03) 40%, transparent 70%)',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none z-[5] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />

        <EmberParticles />
        <CursorSpotlight />

        {/* Top edge light */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/25 to-transparent z-10" />

        {/* ── Main Content ── */}
        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2.5 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-full px-5 py-2 mb-10"
            {...fadeUp(0.15)}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
            </span>
            <span className="text-yellow-400/90 text-[11px] font-semibold uppercase tracking-[0.18em]">
              Now Enrolling — Limited Seats
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <h1 className="mb-3">
            <motion.span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white uppercase leading-[0.92] tracking-tight"
              {...fadeUp(0.3)}
            >
              Climb Higher.
            </motion.span>
            <motion.span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase leading-[0.92] tracking-tight mt-1"
              style={{
                background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 35%, #ea580c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              {...fadeUp(0.45)}
            >
              Work Safer.
            </motion.span>
          </h1>

          {/* ── Divider ── */}
          <motion.div
            className="flex items-center justify-center gap-5 my-8"
            {...fadeUp(0.6)}
          >
            <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-yellow-500/50" />
            <span className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-[0.3em]">
              Construction Safety Guild
            </span>
            <div className="h-[1px] w-14 bg-gradient-to-r from-yellow-500/50 to-transparent" />
          </motion.div>

          {/* ── Tagline with rotating word ── */}
          <motion.div className="mb-12 max-w-xl mx-auto" {...fadeUp(0.75)}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-yellow-400 text-base md:text-lg font-semibold tracking-wide">
                Safety, Rescue, Training and Gear
              </span>
            </div>
            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
              We are the solutions-based partner you need to successfully navigate your safety compliance problem.
            </p>

            {/* Rotating word showcase */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-slate-700" />
              <div className="relative h-8 w-28 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWord}
                    className="absolute inset-0 flex items-center justify-center text-yellow-500 text-sm font-bold uppercase tracking-[0.2em]"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {rotatingWord}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="h-[1px] w-8 bg-slate-700" />
            </div>
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
            {...fadeUp(0.9)}
          >
            <Link
              to="/training/onsite"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-sm font-bold rounded-xl text-slate-900 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] transition-all duration-500 uppercase tracking-[0.14em] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                View Courses
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center px-10 py-4 text-sm font-bold rounded-xl text-white bg-white/[0.05] hover:bg-white/[0.10] border border-white/[0.10] hover:border-yellow-500/30 backdrop-blur-md transition-all duration-500 uppercase tracking-[0.14em]"
            >
              Contact Now
              <Zap className="w-4 h-4 ml-2 text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Bottom Stats Bar (frosted glass, docked) ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20"
          style={{ opacity: statsOpacity }}
        >
          <div className="bg-slate-950/60 backdrop-blur-xl border-t border-white/[0.06]">
            <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {[
                { icon: Users, value: `${trainedCount.toLocaleString()}+`, label: 'Workers Trained' },
                { icon: Award, value: `${certCount}+`, label: 'Courses Certified' },
                { icon: Shield, value: 'OSHA', label: 'Compliant' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-3 group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors duration-300">
                    <stat.icon className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base leading-none">{stat.value}</p>
                    <p className="text-slate-500 text-[10px] mt-0.5 uppercase tracking-wider font-medium">{stat.label}</p>
                  </div>
                  {i < 2 && <div className="hidden sm:block w-[1px] h-8 bg-white/[0.06] ml-7" />}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-[90px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-transparent to-yellow-500/40"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>


      {/* ═══════════ SERVICES OVERVIEW ═══════════ */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Image Mixed cleanly */}
        <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
          <img src="/services.jpg" alt="" width="1920" height="1080" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale mix-blend-screen" />
          <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-4">Why Safety Guild?</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mb-10"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck, title: "Quality Standards", desc: "Our training program meets or exceeds OSHA and applicable industry standards that are recognized and accepted nationwide."
              },
              {
                icon: HardHat, title: "Hands-on Experience", desc: "Learn from Austin Lawler and his team with real - world scenarios and comprehensive field techniques."
              },
              { icon: TrendingUp, title: "Career Advancement", desc: "Empower your crew. Our training increases site efficiency and confidence." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-yellow-500/50 transition-colors group cursor-default shadow-lg"
              >
                <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/10 transition-colors">
                  <feature.icon className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROMOTIONAL BANNER ═══════════ */}
      <section className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 bg-slate-900/50"
          >
            <div className="absolute inset-0 bg-yellow-500/5 blur-[100px]"></div>
            <img
              src="/home.jpg"
              alt="Safety Guild Promotions"
              width="800"
              height="400"
              loading="lazy"
              className="relative z-10 w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;