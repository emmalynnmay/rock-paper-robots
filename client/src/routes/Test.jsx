import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { View, Preload, OrbitControls, PerspectiveCamera, CameraShake, PivotControls, Environment, Center } from '@react-three/drei'
import { Plane, Apple, Duck, Candy, Flash, Target } from '../components/Models.jsx';

export function Test() {
  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>

        <div className="text">
          Here is text.

          {/*<View className="view scale" style={{height: 300}}>
            <Common color="lightblue"/>
            <Plane scale={6} position={[0, -1.6, 0]}/>
            <OrbitControls makeDefault/>
          </View>*/}

          Here is text.

          <View className="view scale" style={{ height: 300 }}>
            <Common color="lightblue" />
            <Apple position={[0, -1, 0]} scale={14} />
            <OrbitControls makeDefault />
          </View>

          Here is text.

          <View className="view translateY">
            <Common color="lightgreen" />
            <Duck scale={2} position={[0, -1.6, 0]} />
            <CameraShake intensity={2} />
          </View>

          Here is text.

          <View className="view scale">
            <Common color="peachpuff" />
            <Candy scale={3} />
          </View>

          Here is text.

          <View className="view translateX">
            <Common color="orange" />
            <Flash scale={3} />
          </View>

          <View className="view translateX">
            <Common color="orange" />
            <Target scale={2} position={[0, -1.6, 0]} />
          </View>

          Here is text.
        </div>
        <Canvas
          style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden' }}
          eventSource={document.getElementById('root')}>
          <View.Port />
          <Preload all />
        </Canvas>
      </div>
    </>
  )
}

function Common({ color }) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset="dawn" />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </>
  )
}

function Link({ href, text, children }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  return (
    <a
      href={href}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      onPointerMove={(e) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY - e.target.offsetTop - 100
        ref.current.style.transform = `translate3d(${x}px,${y}px,0)`
      }}>
      {text}
      <View
        ref={ref}
        visible={hovered}
        index={Infinity} // Render this view on top of all others
        className="view"
        style={{ position: 'absolute', width: 200, display: 'block', pointerEvents: 'none' }}>
        <group>{children}</group>
      </View>
    </a>
  )
}