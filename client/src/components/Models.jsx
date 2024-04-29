import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { plane } from "../utils/plane.js";

export function Duck(props) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf')
  return <primitive object={scene} {...props} />
}

export function Plane(props) {
  const { scene } = plane();
  return <primitive object={scene} {...props} />
}

export function Candy(props) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/candy-bucket/model.gltf')
  useFrame((state, delta) => (scene.rotation.z = scene.rotation.y += delta))
  return <primitive object={scene} {...props} />
}

export function Flash(props) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lightning/model.gltf')
  useFrame((state, delta) => (scene.rotation.y += delta))
  return <primitive object={scene} {...props} />
}

export function Apple(props) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/apple-half/model.gltf')
  useFrame((state, delta) => (scene.rotation.y += delta))
  return <primitive object={scene} {...props} />
}

export function Target(props) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf')
  useFrame((state, delta) => (scene.rotation.y += delta))
  return <primitive object={scene} {...props} />
}
