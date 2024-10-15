import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Mesa(props) {
  const { nodes, materials } = useGLTF('./models/mesa.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry}
        material={materials['lambert2SG.001']}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[6, -3, 3, 1]}
        scale={[0.05, 0.05, 0.05]}
      />
    </group>
  );
}

useGLTF.preload('./models/mesa.glb');
