'use client';

import { useMemo, useRef, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine, Container } from 'tsparticles-engine';

export default function ParticlesBackground() {
  const particlesRef = useRef<Container | null>(null);
  const initRef = useRef<boolean>(false); // flag pour éviter init multiple

  const particlesInit = async (engine: Engine) => {
    if (!initRef.current) {
      await loadSlim(engine);
      initRef.current = true;
    }
  };

  const options = useMemo(() => ({
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
  }), []);

  useEffect(() => {
    return () => {
      // cleanup si besoin
      if (particlesRef.current) {
        particlesRef.current.destroy();
      }
    };
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0"
      options={options}
      init={particlesInit}
      loaded={(container) => { particlesRef.current = container; }}
    />
  );
}
