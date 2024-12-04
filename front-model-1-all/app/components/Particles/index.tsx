import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

import style from './style.module.scss';

function TsParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div className={style.particles}>
      {init && (
        <Particles
          options={{
            background: {
              color: 'transparent',
            },
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: 'push',
                },
                onHover: {
                  enable: true,
                  mode: ['attract', 'bubble'],
                  parallax: {
                    enable: true,
                    force: 100,
                    smooth: 10,
                  },
                },

                resize: {
                  delay: 0.5,
                  enable: true,
                },
              },
              modes: {
                bubble: {
                  distance: 200,
                  duration: 2,
                  opacity: 0.8,
                  size: 50,
                },
                push: {
                  quantity: 1,
                },
                attract: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'],
              },
              links: {
                color: '#00000020',
                distance: 350,
                enable: false,
                opacity: 0,
                width: 0.3,
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: 'bottom',
                enable: true,
                outModes: {
                  default: 'bounce',
                },
                random: false,
                speed: 5,
                straight: false,
                gravity: {
                  enable: false,
                  acceleration: 30,
                },
              },
              number: {
                density: {
                  enable: true,
                },
                value: 50,
              },
              opacity: {
                value: 0.8,
              },
              shape: {
                type: 'image',
                options: {
                  image: [
                    { src: '/h1.svg', width: 50, height: 50 },
                    { src: '/h2.svg', width: 50, height: 50 },
                    { src: '/h3.svg', width: 50, height: 50 },
                    { src: '/h4.svg', width: 50, height: 50 },
                    { src: '/h5.svg', width: 50, height: 50 },
                    { src: '/h6.svg', width: 50, height: 50 },
                    { src: '/h7.svg', width: 50, height: 50 },
                    { src: '/h8.svg', width: 50, height: 50 },
                    { src: '/h9.svg', width: 50, height: 50 },
                    { src: '/h10.svg', width: 50, height: 50 },
                    { src: '/h11.svg', width: 50, height: 50 },
                  ],
                },
              },
              size: {
                value: { min: 1, max: 2 },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default TsParticles;
