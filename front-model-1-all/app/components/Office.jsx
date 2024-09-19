import { useGLTF, Html, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import MapWithCircle from '../components/mapOffices'; // Importa o componente do mapa

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

export function Office({ officeLocations, ...props }) {
  const { nodes, materials } = useGLTF('./models/WawaOffice.glb');
  const ref = useRef();
  const tl = useRef();
  const libraryRef = useRef();
  const atticRef = useRef();
  const mapRef = useRef();

  const scroll = useScroll();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // Animação vertical
    tl.current.to(
      ref.current.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0
    );

    // Animação da biblioteca
    tl.current.from(
      libraryRef.current.position,
      {
        duration: 2,
        x: -2,
      },
      0.5
    );

    tl.current.from(
      libraryRef.current.rotation,
      {
        duration: 0.5,
        y: -Math.PI / 2,
      },
      1
    );

    // Animação do sótão
    tl.current.from(
      atticRef.current.position,
      {
        duration: 1.5,
        y: 4.4,
      },
      0
    );

    tl.current.from(
      atticRef.current.rotation,
      {
        duration: 0.5,
        y: Math.PI / 2,
      },
      1
    );

    tl.current.from(
      atticRef.current.position,
      {
        duration: 1.5,
        x: -4,
      },
      0
    );

    tl.current.from(
      atticRef.current.position,
      {
        duration: 0.5,
        z: -4,
      },
      1.5
    );

    // Office
    tl.current.to(
      ref.current.position,
      {
        duration: 1,
        x: -1,
        z: 2,
      },
      0
    );

    tl.current.to(
      ref.current.position,
      {
        duration: 1,
        x: -1,
        z: 2,
      },
      0
    );

    tl.current.from(
      mapRef.current.position,
      {
        duration: 2,
        x: -1,
        y: 3,
        z: -2.5,
      },
      0.5
    );

    // Animações para o mapa
    tl.current.from(
      mapRef.current.position,
      {
        duration: 2,
        x: -2,
      },
      0.5
    );

    tl.current.from(
      mapRef.current.rotation,
      {
        duration: 0.5,
        y: -Math.PI / 2,
      },
      1
    );

    return () => {
      tl.current.kill(); // Limpeza da animação
    };
  }, []);

  return (
    <group
      {...props}
      dispose={null}
      ref={ref}
      position={[0.5, -1, -1]}
      rotation={[0, -Math.PI / 3, 0]}
    >
      <group>
        <mesh
          geometry={nodes['01_office'].geometry}
          material={materials['01']}
        />
      </group>

      {/* Biblioteca com o mapa como um HTML no 3D */}
      <group ref={libraryRef} position={[0, 2.114, -2.23]}>
        <mesh
          geometry={nodes['02_library'].geometry}
          material={materials['02']}
        />
      </group>

      {/* Mapa HTML independente com animações */}
      <group
        ref={mapRef}
        position={[0, 3.114, -2.23]}
        rotation={[0, -3, 0]}
        renderOrder={0}
      >
        <Html transform>
          <div style={{ width: '100px', height: '50px', overflow: 'hidden' }}>
            <MapWithCircle locations={officeLocations} />
          </div>
        </Html>
      </group>

      {/* Sótão */}
      <group ref={atticRef} position={[-1.97, 4.227, -2.199]}>
        <mesh
          geometry={nodes['03_attic'].geometry}
          material={materials['03']}
        />
      </group>
    </group>
  );
}

useGLTF.preload('./models/WawaOffice.glb');
