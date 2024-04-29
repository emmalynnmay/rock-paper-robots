import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Duck(props) {
  const { scene } = useGLTF('public/models/duck.gltf');
  return <primitive object={scene} {...props} />
}

export function RubberDuck(props) {
  const { scene } = useGLTF('public/models/rubber-duck.glb');
  return <primitive object={scene} {...props} />
}

export function Cactus(props) {
  const { scene } = useGLTF('public/models/cactus.gltf');
  return <primitive object={scene} {...props} />
}

export function Penguin(props) {
  const { scene } = useGLTF('public/models/penguin.gltf');
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />
}

export function Strawberry(props) {
  const { scene } = useGLTF('public/models/strawberry.gltf');
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />
}

export function Candy(props) {
  const { scene } = useGLTF('public/models/candy.gltf');
  useFrame((state, delta) => (scene.rotation.z = scene.rotation.y += delta));
  return <primitive object={scene} {...props} />
}

export function Flash(props) {
  const { scene } = useGLTF('public/models/lightning.gltf');
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />
}

export function Apple(props) {
  const { scene } = useGLTF('public/models/apple.gltf');
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />
}

export function Target(props) {
  const { scene } = useGLTF('public/models/target.gltf');
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />
}
