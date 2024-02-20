// Import the necessary types from 'react' and 'mantine'
import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import type { EmblaCarouselType } from '@mantine/carousel/esm/index';
import Header from './Header';
import CloseIcon from '@/icons/CloseIcon';
import styles from './BentoCarousel.module.css';
import cn from '@/lib/cn';

// Define the type for your slide objects
interface Slide {
  img: string;
  name: string;
  content: React.ReactNode;
}

// Define the props type for the component
interface BentoCarouselProps {
  onClick: () => void;
  onClose: () => void;
  disableSwitching: boolean;
}

// Component definition
export default function BentoCarousel({ onClick, onClose, disableSwitching }: BentoCarouselProps) {
  // Use 'Slide' type for the 'slides' state
  const [slides, setSlides] = useState<Slide[]>([]);
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);

  const ref = useRef(null);

  // TODO: Rework for SPARK integration
  useEffect(() => {
    setSlides([
      { img: '/images/at_sign.png', name: "Global Games Sales", content: <p>A modified version of the AsciiEffect from the <a className='highlighted' href="https://unpkg.com/browse/three@0.160.0/examples/jsm/effects/AsciiEffect.js">three.js examples</a>. This version is way more performant when using colors and also supports colors based on the brightness of pixels. Licensed under the MIT License, anyone is free to use and modify this effect to their liking. A demo is available <a className='highlighted' href="/portfolio/ascii-effect">here</a>.</p> },
      { img: '/images/valtracker-logo.webp', name: "VALTracker", content: <p>VALTracker is a statistics tracker for the video game <a className='highlighted' href="https://playvalorant.com">VALORANT</a> by Riot Games. It ships with features like a customizable Discord Rich Presence, which replaces the game's own implementation, a shop checker that enables the user to view their daily store without opening the game itself, and an inventory manager including presets. <br /> The desktop app was built using <a className='highlighted' href="https://github.com/saltyshiomix/nextron">Nextron</a>, a framework which combines NextJS and Electron. Additionally, VALTracker has a public API which provides developers with information about the game's collectable bundles. It is also the only public API providing the prices of these bundles.</p> },
    ]);
  }, []);

  useEffect(() => {
    if (disableSwitching === true) {
      setTimeout(() => {
        setShowContent(true);
      }, 300);
      setTimeout(() => {
        setAnimateContent(true);
      }, 400);
    } else {
      setAnimateContent(false);
      setTimeout(() => {
        setShowContent(false);
      }, 400);
    }
  }, [disableSwitching]);

  useEffect(() => {
    if (!ref.current || !embla) return;

    function outputSize() {
      embla.reInit();
    }

    // Use ResizeObserver from window to handle resizing
    new window.ResizeObserver(outputSize).observe(ref.current);

    // Clean up the observer on component unmount
    return () => {
      window.removeEventListener('resize', outputSize);
    };
  }, [embla, ref.current]);

  return (
    <>
      <div
        className={cn(styles.carousel__close__button, disableSwitching ? "absolute" : "hidden")}
        onClick={() => {
          setAnimateContent(false);
          setTimeout(() => {
            setShowContent(false);
            onClose();
          }, 400);
        }}
      >
        <CloseIcon className={`cursor-pointer`} />
      </div>
      <Carousel
        withControls={!disableSwitching}
        draggable={false}
        controlsOffset={4}
        className=''
        ref={ref}
        getEmblaApi={setEmbla}
        // Use styles instead of style for the property
        style={{
          '& [data-inactive]': {
            opacity: 0,
            cursor: 'default',
          },
        }as any}
      >
        {slides.map((slide: Slide, index: number) => (
          <Carousel.Slide key={index} className={`carousel-slide ${disableSwitching && "enlarged"}`} onClick={() => onClick()}>
            <img src={slide.img} className='h-full absolute mx-auto z-10 opacity-10 scale-[0.6] object-cover max-w-fit select-none' />
            <span className={`z-20 text-xl transition-all duration-300 ease-in-out ${disableSwitching ? "opacity-0" : "opacity-100"} ${showContent && "hidden"}`}>
              {slide.name}
            </span>
            <div className={`w-full z-20 block h-full transition-all duration-300 p-2 ease-in-out ${showContent ? "relative" : "hidden"} ${animateContent ? "opacity-100" : "opacity-0"}`}>
              <Header type={'h2'} mt={false}>{slide.name}</Header>
              {slide.content}
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
