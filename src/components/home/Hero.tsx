"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";

type HeroSlide = {
  badge: string;
  title: string;
  highlightedText: string;
  description: string;
  image: string;
  imagePosition: string;
};

const AUTO_SLIDE_DELAY = 5000;

const slides: HeroSlide[] = [
  {
    badge: "Trusted Home Service Marketplace",
    title: "Book Trusted Professionals for",
    highlightedText: "Every Home Need",
    description:
      "Find verified electricians, plumbers, cleaners, caregivers, technicians, and other skilled professionals near you.",
    image: "/images/fixmate-hero1.png",
    imagePosition: "center",
  },
  {
    badge: "Fast, Verified and Reliable",
    title: "Expert Home Services",
    highlightedText: "Right When You Need Them",
    description:
      "Compare services, select the right professional, and manage your home-service bookings from one reliable platform.",
    image: "/images/fixmate-hero2.png",
    imagePosition: "center",
  },
  {
    badge: "Built for Service Professionals",
    title: "Grow Your Skills Into a",
    highlightedText: "Successful Service Business",
    description:
      "Create your provider profile, publish your services, reach more customers, and grow your business with FixMate.",
    image: "/images/fixmate-hero3.png",
    imagePosition: "center",
  },
];

const textContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const fromTop: Variants = {
  hidden: {
    opacity: 0,
    y: -22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const buttonVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  const goToNextSlide = useCallback(() => {
    setActiveSlide((previousSlide) => {
      return (previousSlide + 1) % slides.length;
    });
  }, []);

  const goToPreviousSlide = useCallback(() => {
    setActiveSlide((previousSlide) => {
      return previousSlide === 0
        ? slides.length - 1
        : previousSlide - 1;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById("services");

    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    window.scrollBy({
      top: window.innerHeight * 0.7,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    slides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  useEffect(() => {
    if (isSliderPaused) {
      return;
    }

    const autoSlideTimer = window.setTimeout(() => {
      goToNextSlide();
    }, AUTO_SLIDE_DELAY);

    return () => {
      window.clearTimeout(autoSlideTimer);
    };
  }, [activeSlide, goToNextSlide, isSliderPaused]);

  const currentSlide = slides[activeSlide];

  return (
    <section
      id="home"
      aria-label="FixMate home service marketplace"
      className="bg-[#F7F9FC] px-3 pb-6 pt-3 sm:px-4 md:px-8 md:pb-8 md:pt-4"
    >
      <div className="mx-auto max-w-7xl">
        <div
          onMouseEnter={() => setIsSliderPaused(true)}
          onMouseLeave={() => setIsSliderPaused(false)}
          className="group relative h-[68svh] min-h-[580px] max-h-[720px] overflow-hidden rounded-[1.5rem] border border-[#14213D]/10 bg-[#14213D] shadow-2xl shadow-[#14213D]/20"
        >
          {/* Background slider images */}
          <div className="absolute inset-0 overflow-hidden">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.image}
                initial={false}
                animate={{
                  opacity: activeSlide === index ? 1 : 0,
                  scale: activeSlide === index ? 1 : 1.04,
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025]"
                style={{
                  backgroundImage: `url("${slide.image}")`,
                  backgroundPosition: slide.imagePosition,
                }}
              />
            ))}
          </div>

          {/* Background overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/95 via-[#14213D]/78 to-[#14213D]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/65 via-transparent to-[#14213D]/15" />

          {/* Animated decorative glow */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.22, 0.38, 0.22],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#2563EB]/30 blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.18, 0.32, 0.18],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-24 left-[35%] h-72 w-72 rounded-full bg-[#F4B400]/20 blur-3xl"
          />

          {/* Slider arrow controls */}
          <div className="absolute right-4 top-4 z-30 flex items-center gap-2 sm:right-6 sm:top-6">
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Show previous hero slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#14213D]/55 text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-[#2563EB]"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Show next hero slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#14213D]/55 text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-[#2563EB]"
            >
              <ChevronRight size={19} />
            </button>
          </div>

          {/* Main content */}
          <div className="relative z-20 grid h-full items-center gap-6 px-6 pb-16 pt-16 sm:px-8 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-14">
            {/* Left side content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                variants={textContainer}
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  x: -20,
                  transition: {
                    duration: 0.25,
                  },
                }}
                className="flex h-full max-w-3xl flex-col justify-center"
                aria-live="polite"
              >
                <motion.div
                  variants={fromTop}
                  className="mb-4 inline-flex w-max max-w-full items-center gap-2 rounded-full border border-[#F4B400]/40 bg-[#F4B400]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#F4B400] shadow-inner shadow-black/10 backdrop-blur-md sm:text-xs"
                >
                  <Sparkles size={13} className="shrink-0" />

                  <span className="truncate">{currentSlide.badge}</span>
                </motion.div>

                <motion.h1
                  variants={fromLeft}
                  className="max-w-3xl text-3xl font-black leading-[1.08] tracking-tight text-white drop-shadow-xl sm:text-4xl md:text-5xl lg:text-[3.4rem]"
                >
                  {currentSlide.title}{" "}
                  <span className="text-[#F4B400]">
                    {currentSlide.highlightedText}
                  </span>
                </motion.h1>

                <motion.p
                  variants={fromLeft}
                  className="mt-4 max-w-2xl text-sm leading-6 text-white/80 drop-shadow-sm sm:text-base sm:leading-7"
                >
                  {currentSlide.description}
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  variants={textContainer}
                  className="mt-6 flex flex-col gap-3 sm:flex-row"
                >
                  <motion.div variants={buttonVariant}>
                    <button
                      type="button"
                      onClick={scrollToServices}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-[#2563EB]/25 transition hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-2xl sm:w-auto"
                    >
                      <Search size={18} />

                      Explore Services

                      <ArrowRight size={17} />
                    </button>
                  </motion.div>

                  <motion.div variants={buttonVariant}>
                    <Link
                      href="/register"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white shadow-inner shadow-black/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-[#14213D] sm:w-auto"
                    >
                      <BriefcaseBusiness size={18} />

                      Join as a Provider
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Trust cards */}
                <motion.div
                  variants={textContainer}
                  className="mt-6 grid max-w-[760px] grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  <motion.div variants={buttonVariant}>
                    <InfoCard
                      icon={<ShieldCheck size={17} />}
                      title="Verified Experts"
                      text="Trusted professionals"
                    />
                  </motion.div>

                  <motion.div variants={buttonVariant}>
                    <InfoCard
                      icon={<Wrench size={17} />}
                      title="Multiple Services"
                      text="All home needs"
                    />
                  </motion.div>

                  <motion.div variants={buttonVariant}>
                    <InfoCard
                      icon={<CheckCircle2 size={17} />}
                      title="Easy Booking"
                      text="Simple and secure"
                    />
                  </motion.div>
                </motion.div>

                {/* Slider indicators */}
                <div className="mt-5 flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Show hero slide ${index + 1}`}
                      aria-current={activeSlide === index ? "true" : undefined}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeSlide === index
                          ? "w-8 bg-[#F4B400]"
                          : "w-2 bg-white/35 hover:bg-white/70"
                      }`}
                    />
                  ))}

                  <span className="ml-2 text-xs font-semibold text-white/60">
                    {String(activeSlide + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Mobile next section button */}
                <button
                  type="button"
                  onClick={scrollToServices}
                  className="mt-4 inline-flex w-max items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/70 transition hover:text-[#F4B400] md:hidden"
                >
                  Next Section
                  <ChevronDown size={18} />
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Right side floating cards */}
            <div className="relative hidden h-full items-center justify-center lg:flex">
              <motion.div
                initial={{
                  opacity: 0,
                  x: 45,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  y: [0, -7, 0],
                }}
                transition={{
                  opacity: {
                    delay: 0.35,
                    duration: 0.6,
                  },
                  x: {
                    delay: 0.35,
                    duration: 0.6,
                  },
                  scale: {
                    delay: 0.35,
                    duration: 0.6,
                  },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute bottom-[28%] right-2 rounded-2xl border border-white/25 bg-white/90 p-4 shadow-2xl shadow-[#14213D]/30 backdrop-blur-xl xl:right-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                    <CheckCircle2 size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#14213D]/60">
                      Booking Status
                    </p>

                    <p className="mt-0.5 text-sm font-black text-[#14213D]">
                      Service Confirmed
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: 40,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  y: [0, 6, 0],
                }}
                transition={{
                  opacity: {
                    delay: 0.5,
                    duration: 0.6,
                  },
                  x: {
                    delay: 0.5,
                    duration: 0.6,
                  },
                  scale: {
                    delay: 0.5,
                    duration: 0.6,
                  },
                  y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute right-[9%] top-[22%] rounded-2xl border border-white/25 bg-[#14213D]/75 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4B400] text-[#14213D]">
                    <Star size={21} fill="currentColor" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white/65">
                      Customer Rating
                    </p>

                    <p className="mt-0.5 text-base font-black text-white">
                      4.9 out of 5
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Desktop next-section Explore button */}
          <div className="absolute bottom-4 right-5 z-30 hidden md:block lg:right-7">
            <motion.button
              type="button"
              onClick={scrollToServices}
              aria-label="Scroll to the services section"
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex min-w-[110px] flex-col items-center justify-center gap-0.5 rounded-xl border border-white/15 bg-[#14213D]/70 px-4 py-2 text-white/75 shadow-xl backdrop-blur-md transition hover:border-[#F4B400]/50 hover:bg-[#14213D]/90 hover:text-[#F4B400]"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Explore
              </span>

              <ChevronDown size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

function InfoCard({ icon, title, text }: InfoCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className="flex min-h-[82px] items-center gap-3 rounded-xl border border-white/15 bg-[#14213D]/45 p-3 shadow-inner shadow-black/10 backdrop-blur-md transition-colors duration-300 hover:border-[#F4B400]/45 hover:bg-[#2563EB]/25"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#F4B400]">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-xs font-black text-white sm:text-sm">
          {title}
        </h3>

        <p className="mt-1 truncate text-[10px] font-medium text-white/60 sm:text-xs">
          {text}
        </p>
      </div>
    </motion.div>
  );
}