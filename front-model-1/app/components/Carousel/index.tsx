'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import styles from './style.module.scss';

type CarouselProps = {
  images: { url: string }[];
};

export const Carousel = ({ images }: CarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (containerRef.current) {
      if (!isFullScreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen(); // Safari
        } else if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen(); // IE11
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen(); // Safari
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen(); // IE11
        }
      }

      setIsFullScreen(!isFullScreen);
    }
  };

  return (
    <div
      className={`${styles.container} ${isFullScreen ? styles.fullScreen : ''}`}
      ref={containerRef}
    >
      <Swiper
        className={styles.swiper}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
      >
        {images.map((image) => (
          <SwiperSlide key={image.url} className={styles.swiperSlide}>
            <Image
              className={styles.image}
              src={image.url}
              alt='Imagem do imóvel'
              width={1920}
              height={1080}
              style={{ objectFit: isFullScreen ? 'contain' : 'contain' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className={styles.thumbsSwiper}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        modules={[Thumbs]}
      >
        {images.map((image) => (
          <SwiperSlide key={image.url + 'thumb'} className={styles.thumbSlide}>
            <Image
              className={styles.thumbImage}
              src={image.url}
              alt='Miniatura do imóvel'
              width={500}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
