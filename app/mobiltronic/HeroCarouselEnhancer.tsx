'use client';

import { useEffect } from 'react';

export default function HeroCarouselEnhancer({ route }: { route: string }) {
  useEffect(() => {
    const carousel = document.querySelector<HTMLElement>('.mobiltronic-source-copy .index-slider .owl-carousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll<HTMLAnchorElement>(':scope > a'));
    if (slides.length < 2) return;

    carousel.classList.add('mobiltronic-hero-carousel');
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'carousel');
    carousel.setAttribute('aria-label', 'محصولات ویژه');

    const dots = document.createElement('div');
    dots.className = 'mobiltronic-hero-dots';
    dots.setAttribute('aria-label', 'انتخاب اسلاید');
    const buttons = slides.map((slide, index) => {
      slide.classList.add('mobiltronic-hero-slide');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} از ${slides.length}`);
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `نمایش اسلاید ${index + 1}`);
      button.addEventListener('click', () => show(index));
      dots.append(button);
      return button;
    });
    carousel.append(dots);

    let active = 0;
    let paused = false;
    const show = (index: number) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const selected = slideIndex === active;
        slide.classList.toggle('is-active', selected);
        slide.setAttribute('aria-hidden', String(!selected));
        if (selected) slide.removeAttribute('tabindex');
        else slide.setAttribute('tabindex', '-1');
      });
      buttons.forEach((button, buttonIndex) => {
        const selected = buttonIndex === active;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-current', String(selected));
      });
    };
    show(0);

    const onEnter = () => { paused = true; };
    const onLeave = (event: Event) => {
      const focusEvent = event as FocusEvent;
      if (focusEvent.relatedTarget instanceof Node && carousel.contains(focusEvent.relatedTarget)) return;
      paused = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); show(active + 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); show(active - 1); }
    };
    carousel.addEventListener('mouseenter', onEnter);
    carousel.addEventListener('mouseleave', onLeave);
    carousel.addEventListener('focusin', onEnter);
    carousel.addEventListener('focusout', onLeave);
    carousel.addEventListener('keydown', onKeyDown);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timer = window.setInterval(() => {
      if (!paused && !document.hidden && !reducedMotion.matches) show(active + 1);
    }, 5000);

    return () => {
      window.clearInterval(timer);
      carousel.removeEventListener('mouseenter', onEnter);
      carousel.removeEventListener('mouseleave', onLeave);
      carousel.removeEventListener('focusin', onEnter);
      carousel.removeEventListener('focusout', onLeave);
      carousel.removeEventListener('keydown', onKeyDown);
      dots.remove();
      carousel.classList.remove('mobiltronic-hero-carousel');
      slides.forEach((slide) => {
        slide.classList.remove('mobiltronic-hero-slide', 'is-active');
        slide.removeAttribute('aria-roledescription');
        slide.removeAttribute('aria-label');
        slide.removeAttribute('aria-hidden');
        slide.removeAttribute('tabindex');
      });
      carousel.removeAttribute('role');
      carousel.removeAttribute('aria-roledescription');
      carousel.removeAttribute('aria-label');
    };
  }, [route]);

  return null;
}
