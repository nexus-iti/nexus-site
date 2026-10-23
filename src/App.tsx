import { LazyMotion, domAnimation } from 'motion/react';
import { Header } from './sections/Header.tsx';
import { Hero } from './sections/Hero.tsx';
import { Pillars } from './sections/Pillars.tsx';
import { Projects } from './sections/Projects.tsx';
import { System } from './sections/System.tsx';
import { Principles } from './sections/Principles.tsx';
import { CallToAction, Footer } from './sections/Closing.tsx';

export function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <a href="#contenido" className="nx-btn nx-btn-primary nx-btn-md fixed left-4 top-3 z-50 -translate-y-20 focus:translate-y-0">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Pillars />
        <Projects />
        <System />
        <Principles />
        <CallToAction />
      </main>
      <Footer />
    </LazyMotion>
  );
}
