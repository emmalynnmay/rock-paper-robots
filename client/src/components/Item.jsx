
import { View, OrbitControls, PerspectiveCamera, CameraShake, Environment } from '@react-three/drei'
import {Cactus, Apple, Duck, Candy, Flash, Target, Strawberry, Penguin, RubberDuck} from './Models.jsx';

export const Item = ({details}) => {

  let model;

  if (details.name === 'Apple') {
    model = <View className="view" style={{ height: 300 }}>
      <Common color="#824D74" />
      <Apple position={[0, 0, 0]} scale={14} />
      <OrbitControls makeDefault />
      <CameraShake intensity={.5} />
    </View>

  } else if (details.name === 'Cactus') {
    model = <View className="view" style={{height: 300}}>
      <Common color="#e66425"/>
      <Cactus scale={.75} position={[0, -1.0, 0]}/>
      <CameraShake intensity={1.25} />
      <OrbitControls makeDefault/>
    </View>

  } else if (details.name === 'Candy') {
    model = <View className="view" style={{height: 300}}>
      <Common color="#FC819E" />
      <Candy scale={2} />
      <OrbitControls makeDefault />
    </View>

  } else if (details.name === 'Duck') {
    model = <View className="view" style={{height: 300}}>
      <Common color="#4793AF" />
      <Duck scale={2} position={[0, -1.75, 0]} />
      <CameraShake intensity={1.5} />
      <OrbitControls makeDefault/>
    </View>

  } else if (details.name === 'Lightning') {
    model = <View className="view" style={{height: 300}}>
      <Common color="orange" />
      <Flash scale={3} />
    </View>

  } else if (details.name === 'Penguin') {
    model = <View className="view" style={{ height: 300 }}>
      <Common color="#2b4e94" />
      <Penguin position={[0, -6, -15]} scale={10} />
      <OrbitControls makeDefault />
    </View>

  } else if (details.name === 'Rubber Duck') {
    model = <View className="view" style={{ height: 300 }}>
      <Common color="#333A73" />
      <RubberDuck position={[0, -15, -50]} scale={1.75} />
      <OrbitControls makeDefault />
    </View>

  } else if (details.name === 'Strawberry') {
    model = <View className="view" style={{ height: 300 }}>
      <Common color="lightblue" />
      <Strawberry position={[0, -13, -50]} scale={4} />
      <OrbitControls makeDefault />
    </View>

  } else if (details.name === 'Target') {
    model = <View className="view" style={{height: 300}}>
      <Common color="#AD88C6" />
      <Target scale={1.5} position={[0, -1.6, 0]} />
      <OrbitControls makeDefault />
    </View>

  } else {
    model = <></>;
  }

  return (
    <>
      <div className="product">
        {model}
      </div>
    </>
  );
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
  );
}