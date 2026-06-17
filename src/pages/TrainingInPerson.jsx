import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Shield,
  Award,
  Clock,
  Users,
  CheckCircle,
  Phone,
  Mail,
  Star,
  Zap,
  HardHat,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */

const featuredCourses = [
  {
    id: 1,
    title: 'Authorized Tower Climbing & Rescue',
    badge: 'NATE Compliant',
    gradient: 'from-blue-600/30 via-slate-800 to-slate-900',
    iconBg: 'from-blue-500 to-blue-700',
    icon: <HardHat className="w-10 h-10 text-white" />,
    description:
      'Comprehensive tower climbing and rescue certification meeting NATE industry standards for authorized personnel.',
    highlights: ['NATE Compliant Certification', 'Climbing & Rescue Techniques', 'Safety Standards'],
    comingSoon: false,
  },
  {
    id: 2,
    title: 'Competent Tower Climbing & Rescue',
    badge: 'NATE Compliant',
    gradient: 'from-green-600/30 via-slate-800 to-slate-900',
    iconBg: 'from-green-500 to-green-700',
    icon: <Shield className="w-10 h-10 text-white" />,
    description:
      'Advanced tower climbing and rescue training for Competent Person designation under NATE requirements.',
    highlights: ['Competent Person Designation', 'Advanced Rescue Ops', 'NATE Standards'],
    comingSoon: false,
  },
  {
    id: 3,
    title: 'Competent Rigger',
    badge: 'OSHA & Standards Compliant',
    gradient: 'from-orange-600/30 via-slate-800 to-slate-900',
    iconBg: 'from-orange-500 to-orange-700',
    icon: <Award className="w-10 h-10 text-white" />,
    description:
      'Rigging certification including Capstand & Spotter Signal Person training, meeting OSHA and applicable industry standards.',
    highlights: ['Includes Capstand Training', 'Spotter Signal Person', 'OSHA Compliant'],
    comingSoon: false,
  },
  {
    id: 4,
    title: 'SPRAT Rope Access Certification',
    badge: 'COMING SOON',
    gradient: 'from-purple-600/30 via-slate-800 to-slate-900',
    iconBg: 'from-purple-500 to-purple-700',
    icon: <Star className="w-10 h-10 text-white" />,
    description:
      'Society of Professional Rope Access Technicians (SPRAT) certification program. Stay tuned for the launch!',
    highlights: ['SPRAT Certification', 'Industrial Rope Access', 'Advanced Techniques'],
    comingSoon: true,
  },
  {
    id: 5,
    title: 'Permit Required Confined Space Training',
    badge: 'Safety Critical',
    gradient: 'from-red-600/30 via-slate-800 to-slate-900',
    iconBg: 'from-red-500 to-red-700',
    icon: <AlertTriangle className="w-10 h-10 text-white" />,
    description:
      'Essential confined space entry training for entrants, attendants, and supervisors in permit-required environments.',
    highlights: ['Entrant Training', 'Attendant Certification', 'Supervisor Designation'],
    comingSoon: false,
  },
  {
    id: 6,
    title: 'Excavation Safety Training',
    badge: 'OSHA Compliant',
    gradient: 'from-yellow-600/30 via-slate-800 to-slate-900',
    iconBg: 'from-yellow-500 to-yellow-700',
    icon: <Zap className="w-10 h-10 text-white" />,
    description:
      'Excavation and trenching safety covering hazard recognition, protective systems, and full OSHA compliance.',
    highlights: ['Trenching & Excavation', 'Hazard Recognition', 'Protective Systems'],
    comingSoon: false,
  },
  {
    id: 7,
    title: 'Industrial Grade Equipment Training',
    badge: 'Multi-Equipment',
    gradient: 'from-teal-600/30 via-slate-800 to-slate-900',
    iconBg: 'from-teal-500 to-teal-700',
    icon: <HardHat className="w-10 h-10 text-white" />,
    description: 'Comprehensive operator training for a full range of industrial equipment:',
    bulletList: [
      'Aerial Lift',
      'Bucket Truck',
      'Scissor Lift',
      'Rough Terrain Fork Lift',
      'Fork Lift',
      'Back Hoe',
      'Mini Excavator',
      'Skid Steer',
    ],
    comingSoon: false,
  },
  {
    id: 8,
    title: 'RF Radiation Safety',
    badge: 'Telecom Focused',
    gradient: 'from-cyan-600/30 via-slate-800 to-slate-900',
    iconBg: 'from-cyan-500 to-cyan-700',
    icon: <Zap className="w-10 h-10 text-white" />,
    description:
      'Radio Frequency (RF) radiation safety awareness and protection training for telecom and tower workers.',
    highlights: ['RF Hazard Awareness', 'Protection Measures', 'Telecom Standards'],
    comingSoon: false,
  },
  {
    id: 9,
    title: 'First Aid, CPR, AED & Bloodborne Pathogens',
    badge: 'Life Safety',
    gradient: 'from-rose-600/30 via-slate-800 to-slate-900',
    iconBg: 'from-rose-500 to-rose-700',
    icon: <Shield className="w-10 h-10 text-white" />,
    description:
      'Combined life safety training covering emergency response, CPR, AED use, and bloodborne pathogen exposure control.',
    highlights: ['First Aid Certification', 'CPR & AED Training', 'Bloodborne Pathogens'],
    comingSoon: false,
  },
];

const serviceCategories = [
  {
    category: 'Tower Training',
    color: 'yellow',
    badgeClass: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    dotClass: 'bg-yellow-500',
    services: [
      {
        name: 'Tower Training Bundle',
        isBundle: true,
        description:
          'Includes Climbing, Rescue, Rigging, Capstan, Spotter, Signal Person, RF, HAZCOM, Heat Stress, First Aid, CPR, AED & Bloodborne Pathogens.',
      },
      { name: 'Tower Climbing & Rescue', description: 'Core tower climbing and rescue skills for field personnel.' },
      { name: 'Competent Rigger', description: 'Includes Capstand & Spotter Signal Person training.' },
      { name: 'RECERT Climbing & Rescue', description: 'Recertification course for Tower Climbing & Rescue.' },
      { name: 'Capstan Hoist', description: 'Training on the safe operation of capstan hoist equipment.' },
      { name: 'Spotter / Signal Person', description: 'Proper signaling and spotting techniques for safe lift operations.' },
      { name: 'RF Awareness', description: 'Awareness-level training on Radio Frequency radiation hazards.' },
      { name: 'Hazardous Communications', description: 'HazCom/GHS training for tower and telecom environments.' },
      { name: 'Heat Stress', description: 'Prevention and recognition of heat-related illness in field work.' },
      { name: 'OSHA 10', description: '10-Hour OSHA training course. 3 Person Minimum required.' },
      { name: 'OSHA 30', description: '30-Hour OSHA training course. 3 Person Minimum required.' },
      { name: 'Qualified Flagger & Traffic Control Plans', description: 'Flagger certification and traffic control planning for work zones.' },
      {
        name: 'Civil Training Bundle',
        isBundle: true,
        description: 'Includes: Electrical Safety, LOTO, Battery, HAZCOM, First Aid, CPR, AED & Bloodborne Pathogens.',
      },
      { name: 'First Aid, CPR, AED', description: 'Emergency response and life-saving techniques for the workplace.' },
      { name: 'Bloodborne Pathogens', description: 'Exposure control and safety for bloodborne pathogen risks.' },
      { name: 'RF Radiation', description: 'RF radiation safety training for telecom personnel.' },
      { name: 'Electrical Safety', description: 'Electrical hazard recognition and safe work practices.' },
      { name: 'Lockout Tagout (LOTO)', description: 'Hazardous energy control procedures and LOTO compliance.' },
      { name: 'Battery Safety & Handling', description: 'Safe handling, storage, and disposal of industrial batteries.' },
      { name: 'Hazardous Communications (Civil)', description: 'GHS/HazCom standards for civil and construction environments.' },
    ],
  },
  {
    category: 'Other Services',
    color: 'cyan',
    badgeClass: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    dotClass: 'bg-cyan-500',
    services: [
      { name: 'Excavation and Trenching', description: 'Safe excavation and trenching practices per OSHA standards.' },
      { name: 'Confined Spaces', description: 'Confined space entry, monitoring, and rescue for permit-required spaces.' },
      { name: 'Site Audit', description: 'Comprehensive on-site safety audit to identify hazards and compliance gaps.' },
      { name: 'Company Safety Presentations', description: 'Custom safety presentations delivered to your team on-site.' },
    ],
  },
  {
    category: 'Coming Soon',
    color: 'purple',
    badgeClass: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    dotClass: 'bg-purple-500',
    comingSoon: true,
    services: [
      { name: 'Intro to Rope Access Training', description: 'An introductory course to rope access fundamentals. Launching soon — stay tuned!' },
    ],
  },
];

/* ─────────────────────────── SUB-COMPONENTS ─────────────────────────── */

// Animated accordion item for the services list
const ServiceItem = ({ service, dotClass, isLast }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${!isLast ? 'border-b border-slate-800' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 px-2 text-left group hover:bg-slate-800/40 transition-colors rounded-lg"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`flex-shrink-0 w-2 h-2 rounded-full ${dotClass}`} />
          <span className="text-slate-200 font-medium text-sm sm:text-base group-hover:text-white transition-colors truncate">
            {service.name}
          </span>
          {service.isBundle && (
            <span className="flex-shrink-0 text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Bundle
            </span>
          )}
        </div>
        <ChevronDown
          className={`flex-shrink-0 w-4 h-4 text-slate-500 group-hover:text-yellow-400 transition-all duration-300 ${open ? 'rotate-180 text-yellow-400' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-5 ml-5">
              <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-yellow-500/40 pl-4">
                {service.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3 h-3" /> Duration: Contact for details
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users className="w-3 h-3" /> Group sizes available
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Featured course card
const CourseCard = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.3 }}
      className={`relative flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden border ${
        course.comingSoon ? 'border-purple-500/40' : 'border-slate-700/60'
      } bg-gradient-to-br ${course.gradient} shadow-xl group`}
    >
      {/* Coming Soon corner ribbon */}
      {course.comingSoon && (
        <div className="absolute top-0 right-0 z-20 overflow-hidden w-28 h-28 pointer-events-none">
          <div className="absolute top-5 right-[-28px] w-36 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest text-center rotate-45 shadow-lg">
            Coming Soon
          </div>
        </div>
      )}

      {/* Top icon banner */}
      <div className={`relative h-44 flex items-center justify-center bg-gradient-to-br ${course.gradient} overflow-hidden`}>
        {/* Glow shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        {/* Icon circle */}
        <div
          className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${course.iconBg} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 ${
            course.comingSoon ? 'opacity-70' : ''
          }`}
        >
          {course.icon}
        </div>

        {/* Badge (non-coming-soon only) */}
        {!course.comingSoon && (
          <div className="absolute top-3 right-3 text-xs font-bold bg-slate-900/80 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-full backdrop-blur-sm">
            {course.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className={`font-bold text-base leading-snug mb-2 transition-colors ${
            course.comingSoon
              ? 'text-purple-200 group-hover:text-purple-300'
              : 'text-white group-hover:text-yellow-400'
          }`}
        >
          {course.title}
        </h3>

        <p className="text-slate-400 text-xs leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Bullet list for equipment training */}
        {course.bulletList && (
          <ul className="mb-4 space-y-1">
            {course.bulletList.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Highlights */}
        {course.highlights && !course.bulletList && (
          <div className="flex flex-col gap-1 mb-4">
            {course.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle
                  className={`w-3 h-3 flex-shrink-0 ${
                    course.comingSoon ? 'text-purple-400' : 'text-yellow-500'
                  }`}
                />
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}

        {course.comingSoon ? (
          <div className="w-full py-2.5 rounded-xl bg-purple-900/60 border border-purple-500/40 text-purple-300 font-bold text-xs uppercase tracking-wider text-center">
            Notify Me When Available
          </div>
        ) : (
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-yellow-500/30"
          >
            Request a Quote <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

const TrainingInPerson = () => {
  const scrollRef = useRef(null);
  const isLockedRef = useRef(false);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  // Intercept wheel on carousel only while it can still scroll horizontally
  // and lock the scroll statefully to prevent page scrolling during horizontal scroll.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const isCentered = Math.abs(elementCenter - viewportCenter) < 150;

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      const scrollingRight = e.deltaY > 0;
      const scrollingLeft = e.deltaY < 0;

      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 40; // Normalize line scrolling to pixel scrolling
      }

      if (isLockedRef.current) {
        // If we are currently locked, check if we should unlock
        if ((scrollingRight && atEnd) || (scrollingLeft && atStart)) {
          isLockedRef.current = false;
        } else {
          // Keep scrolling horizontally and prevent page scroll
          e.preventDefault();
          el.scrollLeft += delta;
        }
      } else {
        // If not locked, check if we should lock
        if (isCentered) {
          if ((scrollingRight && !atEnd) || (scrollingLeft && !atStart)) {
            isLockedRef.current = true;
            e.preventDefault();
            el.scrollLeft += delta;

            // Smoothly align the carousel exactly to the vertical center of the screen
            window.scrollTo({
              top: window.scrollY + (elementCenter - viewportCenter),
              behavior: 'smooth'
            });
          }
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[url('/heroSection.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90" />

        {/* Animated glow orbs */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase tracking-widest"
          >
            <Shield className="w-3.5 h-3.5" /> Compliance Starts Here
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-none mb-6"
          >
            In-Person
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Safety Training
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4"
          >
            OSHA standards require employees to be trained in the safety and health aspects of their jobs.
            Studies consistently show that well-trained workers are significantly less likely to be injured on the job.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            CSG delivers practical, hands-on instruction that builds real compliance confidence — right in the field.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl text-slate-900 bg-yellow-500 hover:bg-yellow-400 hover:shadow-[0_0_40px_rgba(234,179,8,0.35)] transition-all uppercase tracking-wide group"
            >
              Request a Quote
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#all-programs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-yellow-500/50 transition-all uppercase tracking-wide"
            >
              View All Programs
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-slate-600 text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 text-slate-600 animate-bounce" />
        </motion.div>
      </section>

      {/* ── TRUST STATS BAR ── */}
      <section className="bg-slate-800/50 border-y border-slate-700/50 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 'NATE', label: 'Compliant Courses', icon: <Award className="w-5 h-5" /> },
              { value: 'OSHA', label: 'Standards Met', icon: <Shield className="w-5 h-5" /> },
              { value: 'On-Site', label: 'Training Available', icon: <Users className="w-5 h-5" /> },
              { value: '24+', label: 'Courses Offered', icon: <Star className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="text-yellow-500 mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED / SIGNATURE COURSES ── */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Signature Programs</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-2 mb-3">
              Our Flagship Courses
            </h2>
            <div className="w-16 h-1 bg-yellow-500 rounded-full mb-4" />
            <p className="text-slate-400 max-w-2xl leading-relaxed">
              Industry-leading certifications built for telecom crews, tower climbers, riggers, and safety professionals.
              Each course is designed to meet or exceed OSHA and applicable industry standards.
            </p>
          </motion.div>

          {/* Carousel controls */}
          <div className="flex items-center justify-end gap-2 mb-4">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-slate-800 hover:bg-yellow-500 hover:text-slate-900 text-slate-400 border border-slate-700 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-slate-800 hover:bg-yellow-500 hover:text-slate-900 text-slate-400 border border-slate-700 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal scroll carousel */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>

          <p className="text-slate-600 text-xs text-center mt-4">
            Scroll or use arrows to browse all courses →
          </p>
        </div>
      </section>

      {/* ── ALL TRAINING PROGRAMS ── */}
      <section id="all-programs" className="py-20 bg-slate-900 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Full Catalog</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-2 mb-3">
              All Training Programs
            </h2>
            <div className="w-16 h-1 bg-yellow-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Click any course to expand details. No prices listed — contact us for a custom quote tailored to your team's needs.
            </p>
          </motion.div>

          {/* Category blocks */}
          <div className="space-y-10">
            {serviceCategories.map((cat, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
                className="bg-slate-800/50 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 px-6 py-4 bg-slate-800/80 border-b border-slate-700/60">
                  <span className={`w-3 h-3 rounded-full ${cat.dotClass}`} />
                  <h3 className="text-white font-bold text-lg uppercase tracking-wider">
                    {cat.category}
                  </h3>
                  {cat.comingSoon && (
                    <span className="ml-auto text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-0.5 rounded-full uppercase tracking-wide">
                      Coming Soon
                    </span>
                  )}
                  <span className="ml-auto text-slate-500 text-xs">
                    {cat.services.length} {cat.services.length === 1 ? 'course' : 'courses'}
                  </span>
                </div>

                {/* Services list */}
                <div className="px-4 py-2">
                  {cat.services.map((service, si) => (
                    <ServiceItem
                      key={si}
                      service={service}
                      dotClass={cat.dotClass}
                      isLast={si === cat.services.length - 1}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Looking for something specific */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5"
          >
            <p className="text-slate-300 font-medium mb-1">Looking for something specific?</p>
            <p className="text-slate-500 text-sm mb-4">Don't see what you need? We may still be able to help.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-sm uppercase tracking-wide transition-all hover:shadow-lg hover:shadow-yellow-500/20"
            >
              Contact Us to Discuss <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── REQUEST A QUOTE / CTA SECTION ── */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-yellow-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900/80 border border-slate-700/60 rounded-3xl p-10 sm:p-14 shadow-2xl backdrop-blur-sm"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/20">
              <HardHat className="w-8 h-8 text-slate-900" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
              Ready to Train Your Team?
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Requesting a quote is simple. Reach out via phone or email and our team will work with you
              to schedule the right training for your crew — on your timeline.
            </p>

            {/* Contact options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold rounded-xl text-slate-900 bg-yellow-500 hover:bg-yellow-400 hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] transition-all uppercase tracking-wide group"
              >
                <Phone className="w-5 h-5" />
                Request a Quote
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-yellow-500/50 transition-all uppercase tracking-wide"
              >
                <Mail className="w-5 h-5" />
                Send an Email
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 uppercase tracking-wide">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No Commitment Required</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Custom Scheduling</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> On-Site Available</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default TrainingInPerson;
