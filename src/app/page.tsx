'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';


export default function Home() {
  useEffect(() => {
  // AOS
  AOS.init({ once: true, duration: 800 });

  // Animation du fil conducteur
  const sections = document.querySelectorAll('[data-step-index]');
  const line = document.getElementById('scroll-line');
  let maxHeightReached = 0;

  const observerStep = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          if (line) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step-index') || '0');
            const stepHeight = 135;
            const newHeight = (stepIndex + 1) * stepHeight;
            if (newHeight > maxHeightReached) {
              maxHeightReached = newHeight;
              line.style.height = `${maxHeightReached}px`;
            }
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((el) => observerStep.observe(el));

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && line) {
        line.style.height = `${maxHeightReached}px`;
      }
    },
    { threshold: 0.3 }
  );

  const target = document.getElementById('how-it-works');
  if (target) observer.observe(target);

  // CountUp on scroll
  const countUpObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const increment = target / 80;

        const updateCount = () => {
          current += increment;
          if (current < target) {
            el.innerText = Math.floor(current).toLocaleString() + suffix;
            requestAnimationFrame(updateCount);
          } else {
            el.innerText = target.toLocaleString() + suffix;
          }
        };

        updateCount();
        countUpObserver.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.countup').forEach(el => countUpObserver.observe(el));
}, []);


  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950 to-purple-950 text-gray-200">
      <header className="flex items-center justify-between px-6 py-4 border-b border-indigo-900 bg-indigo-900/30 backdrop-blur-sm">
        <h1 className="text-lg font-bold text-indigo-200">CS2 Trader Companion</h1>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-indigo-200">
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link href="/items" className="hover:text-white">My Items</Link>
          <span className="text-indigo-400">[Placeholder]</span>
        </nav>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full border border-indigo-800 flex items-center justify-center text-indigo-200">
            🌓
          </button>
          <Link href="/login" className="px-4 py-2 border rounded border-indigo-800 text-indigo-200 hover:bg-indigo-900">Sign In</Link>
          <Link href="/register" className="px-4 py-2 border rounded bg-indigo-700 text-white hover:bg-indigo-800">Sign Up</Link>
        </div>  
      </header>

      <section className="relative flex items-center justify-center text-center px-6 py-32 min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles"
            className="absolute inset-0"
            options={{
              background: { color: 'transparent' },
              fullScreen: false,
              particles: {
                number: { value: 60 },
                color: { value: '#8ab4f8' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 2 },
                move: { enable: true, speed: 0.6 },
                links: { enable: true, color: '#8ab4f8', distance: 150, opacity: 0.2 }
              },
              detectRetina: true,
            }}
            init={async (engine) => {
              await loadSlim(engine);
            }}
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl font-extrabold mb-6 text-white drop-shadow-xl">Your CS2 Trading Powerhouse</h2>
          <p className="text-lg text-indigo-300 mb-8">Track, optimize and profit from your skins like never before.</p>
          <Link href="/register" className="px-8 py-4 bg-indigo-700 text-white rounded-lg text-lg font-semibold hover:bg-indigo-800 transition">
            Get Started
          </Link>
        </div>
      </section>

      <div className="border-t border-indigo-900 mx-6" />

      <section className="px-6 py-24" data-aos="fade-up" id="our-impact">
  <h2 className="text-4xl font-bold text-center text-indigo-100 mb-16">Our Impact</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto text-center">
    {[
      { value: 2500, label: 'Active Users' },
      { value: 150000, label: 'Skins Tracked' },
      { value: 1200000, label: 'Trades Analyzed' },
      { value: 38, label: 'Average ROI', suffix: '%' }
    ].map((stat, i) => (
      <div key={i} className="text-white">
        <div className="text-3xl font-extrabold">
          <span className="countup" data-target={stat.value} data-suffix={stat.suffix || ''}>0</span>
        </div>
        <div className="text-indigo-400 mt-2">{stat.label}</div>
      </div>
    ))}
  </div>
</section>


<div className="border-t border-indigo-900 mx-6" />

      <section className="relative px-6 py-24" data-aos="fade-up" id="how-it-works">
        <h2 className="text-4xl font-bold text-center text-indigo-100 mb-16">How it works</h2>
        <div className="relative flex flex-col space-y-24 max-w-6xl mx-auto px-4 sm:px-8">
          <div className="absolute w-1 left-1/2 top-[130px] transform -translate-x-1/2 bg-indigo-700 transition-all duration-1000 ease-in-out" id="scroll-line" style={{ height: '0px' }}>
  <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-1.5 top-[0px] shadow-md" />
  <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-1.5 top-[180px] shadow-md" />
  <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-1.5 top-[360px] shadow-md" />
  <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-1.5 top-[540px] shadow-md" />
</div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-12 opacity-0 translate-y-12 transition-all duration-700 ease-out" data-step-index="0">
            <div className="w-14 h-14 rounded-full bg-indigo-700 text-white flex items-center justify-center text-2xl">📝</div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200">Sign Up</h3>
              <p className="text-indigo-400 max-w-sm">Create your free account in seconds and access all features instantly.</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row-reverse items-center md:items-start text-center md:text-right gap-6 md:gap-12 opacity-0 translate-y-12 transition-all duration-700 ease-out" data-step-index="1">
            <div className="w-14 h-14 rounded-full bg-indigo-700 text-white flex items-center justify-center text-2xl">🎒</div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200">Add Your Skins</h3>
              <p className="text-indigo-400 max-w-sm">Import your CS2 inventory and start tracking your assets automatically.</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-12 opacity-0 translate-y-12 transition-all duration-700 ease-out" data-step-index="2">
            <div className="w-14 h-14 rounded-full bg-indigo-700 text-white flex items-center justify-center text-2xl">💼</div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200">Manage Your Trades</h3>
              <p className="text-indigo-400 max-w-sm">Keep full control over your purchases, sales, and market activity.</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row-reverse items-center md:items-start text-center md:text-right gap-6 md:gap-12 opacity-0 translate-y-12 transition-all duration-700 ease-out" data-step-index="3">
            <div className="w-14 h-14 rounded-full bg-indigo-700 text-white flex items-center justify-center text-2xl">📈</div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-200">Track Your Profits</h3>
              <p className="text-indigo-400 max-w-sm">Visualize your results and boost your performance with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-indigo-900 mx-6" />

      <section className="px-6 py-12 flex justify-center" data-aos="zoom-in">
        <div className="w-full max-w-3xl h-64 bg-indigo-950 rounded flex items-center justify-center">
          <span className="text-indigo-300">📈 Profitability chart placeholder</span>
        </div>
      </section>

      <section className="px-6 py-24" data-aos="fade-up">
  <h2 className="text-4xl font-bold text-center text-indigo-100 mb-16">What our users say</h2>
  <div className="overflow-x-auto">
    <div className="flex gap-6 w-max px-4">
      <div className="min-w-[280px] bg-indigo-900 rounded-xl p-6 shadow-md">
        <p className="text-indigo-300 italic mb-4">"The profit tracking system is insanely helpful. I actually make smarter trades now."</p>
        <div className="text-sm text-indigo-400">— Alex, skin trader</div>
      </div>
      <div className="min-w-[280px] bg-indigo-900 rounded-xl p-6 shadow-md">
        <p className="text-indigo-300 italic mb-4">"Everything is so smooth. From price alerts to managing my inventory, it's all top-notch."</p>
        <div className="text-sm text-indigo-400">— Jordan, marketplace flipper</div>
      </div>
      <div className="min-w-[280px] bg-indigo-900 rounded-xl p-6 shadow-md">
        <p className="text-indigo-300 italic mb-4">"I’ve increased my ROI just by using the player profile analytics. Amazing insights!"</p>
        <div className="text-sm text-indigo-400">— Casey, pro trader</div>
      </div>
    </div>
  </div>
</section>

<div className="border-t border-indigo-900 mx-6" />

      <footer className="px-6 py-6 border-t border-indigo-900 flex flex-col md:flex-row justify-between items-center text-indigo-400" data-aos="fade-up">
        <Link href="#" className="hover:underline hover:text-indigo-200">Discord</Link>
        <p className="text-sm">© 2025 CS2 Trader Companion</p>
      </footer>
    </main>
  )
}
