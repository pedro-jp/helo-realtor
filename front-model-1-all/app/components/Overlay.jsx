import { Scroll, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

export const Overlay = () => {
  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState();
  const [opacitySecondSection, setOpacitySecondSection] = useState();
  const [opacityThirdSection, setOpacityThirdSection] = useState();

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityThirdSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll style={{ width: '100%' }} html>
      <h1 style={{ width: '100%', textAlign: 'center', marginTop: '40px' }}>
        Encontre aqui o seu novo lar
      </h1>
      <main style={styles.main}>
        <Section opacity={opacityFirstSection}>
          <h2>Sua linda casa</h2>
          <p>grande</p>
          <ul>
            <li>espacosa</li>
            <li>aconchegante</li>
            <li>bonita</li>
            <li>espacosa</li>
            <li>aconchegante</li>
            <li>bonita</li>
          </ul>
        </Section>
        <Section right opacity={opacitySecondSection}>
          <h2>Sua linda casa</h2>
          <p>grande</p>
          <ul>
            <li>espacosa</li>
            <li>aconchegante</li>
            <li>bonita</li>
            <li>espacosa</li>
            <li>aconchegante</li>
            <li>bonita</li>
          </ul>
        </Section>
        <Section opacity={opacityThirdSection}>
          <h2>Sua linda casa</h2>
          <p>grande</p>
          <ul>
            <li>espacosa</li>
            <li>aconchegante</li>
            <li>bonita</li>
            <li>espacosa</li>
            <li>aconchegante</li>
            <li>bonita</li>
          </ul>
        </Section>
      </main>
    </Scroll>
  );
};

const Section = (props) => {
  return (
    <section
      style={{
        alignSelf: props.right ? 'end' : 'inherit',
        background: '#fff',
        width: 'max-content',
        padding: 20,
        borderRadius: 8,
        opacity: props.opacity,
      }}
    >
      {props.children}
    </section>
  );
};

const styles = {
  main: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '1440px',
    display: 'flex',
    height: '300vh',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  section: {
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    width: 'max-content',
  },
};
