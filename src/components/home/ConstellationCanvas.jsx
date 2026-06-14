/* eslint-disable react/no-unknown-property -- react-three-fiber maps three.js
   props (args, attach, wireframe, …) onto custom JSX elements; these are valid
   for R3F, not DOM, so the DOM-oriented rule does not apply here. */
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const FIELD_RADIUS = 6;
const PARALLAX_STRENGTH = 0.25;

/**
 * Builds a stable set of points scattered inside a sphere.
 * Memoized so the geometry is not regenerated on every render.
 *
 * @param {number} count Number of points to generate.
 */
function useParticlePositions(count) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Rejection-free spherical distribution using cube-root radius scaling.
      const radius = FIELD_RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);
}

/**
 * The rotating "knowledge core": a wireframe icosahedron wrapped in a sparse
 * particle field. Slow constant rotation plus a subtle pointer parallax.
 */
function KnowledgeCore({ color, count, coreOpacity, pointOpacity, pointSize }) {
  const groupRef = useRef(null);
  const positions = useParticlePositions(count);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    group.rotation.y += delta * 0.08;
    group.rotation.x += delta * 0.02;

    // Pointer parallax — pointer is normalized to [-1, 1].
    const targetX = state.pointer.x * PARALLAX_STRENGTH;
    const targetY = state.pointer.y * PARALLAX_STRENGTH;
    group.position.x = THREE.MathUtils.lerp(
      group.position.x,
      targetX * viewport.width * 0.02,
      0.05,
    );
    group.position.y = THREE.MathUtils.lerp(
      group.position.y,
      targetY * viewport.height * 0.02,
      0.05,
    );
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[2.6, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={coreOpacity}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={pointSize}
          sizeAttenuation
          transparent
          opacity={pointOpacity}
        />
      </points>
    </group>
  );
}

/**
 * Reusable, themeable 3D backdrop scene. Lives in its own lazy-loaded chunk so
 * three.js never enters the initial bundle. Tune density/opacity per section so
 * a content-heavy section stays subtle and a hero can be richer.
 *
 * @param {string}  [color="#ffffff"]   Material color (theme to the section bg).
 * @param {number}  [count=220]         Particle count (lower = subtler/faster).
 * @param {number}  [coreOpacity=0.18]  Wireframe icosahedron opacity.
 * @param {number}  [pointOpacity=0.7]  Particle opacity.
 * @param {number}  [pointSize=0.035]   Particle size.
 */
export default function ConstellationCanvas({
  color = "#ffffff",
  count = 220,
  coreOpacity = 0.18,
  pointOpacity = 0.7,
  pointSize = 0.035,
}) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <KnowledgeCore
        color={color}
        count={count}
        coreOpacity={coreOpacity}
        pointOpacity={pointOpacity}
        pointSize={pointSize}
      />
    </Canvas>
  );
}
