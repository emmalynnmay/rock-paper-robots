import { requireLogin } from "../utils/require_login.js";

import * as THREE from 'three';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import {useEffect} from "react";

let container;

let camera, cameraTarget, scene, renderer;

export const RenderModel = () => {
  requireLogin();

  useEffect(() => {
    init();
    animate();
  }, []);

  return <div id="theContainer" className="render-container"></div>;
}

function init() {

  container = document.createElement('div');
  container.id = 'rendering';
  container.classList.add('render-container');
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
  camera.position.set( 3, 0.15, 3 );

  cameraTarget = new THREE.Vector3( 0, - 0.1, 0 );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x72645b );
  scene.fog = new THREE.Fog( 0x72645b, 2, 15 );


  // Ground

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 40, 40 ),
    new THREE.MeshPhongMaterial( { color: 0xcbcbcb, specular: 0x474747 } )
  );
  plane.rotation.x = - Math.PI / 2;
  plane.position.y = - 0.5;
  scene.add( plane );

  plane.receiveShadow = true;


  // PLY file

  const loader = new PLYLoader();

  loader.load( 'models/plane.ply', function ( geometry ) {

    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial( { color: 0x009cff, flatShading: true } );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = - 0.2;
    mesh.position.y = - 0.25;
    mesh.position.z = - 0.2;
    mesh.scale.multiplyScalar( 0.0006 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );

  } );

  // Lights

  scene.add( new THREE.HemisphereLight( 0x8d7c7c, 0x494966, 3 ) );

  addShadowedLight( 1, 1, 1, 0xffffff, 3.5 );
  addShadowedLight( 0.5, 1, - 1, 0xffd500, 3 );

  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( 600, 400 );

  renderer.shadowMap.enabled = true;

  container.appendChild( renderer.domElement );

}

function addShadowedLight( x, y, z, color, intensity ) {

  const directionalLight = new THREE.DirectionalLight( color, intensity );
  directionalLight.position.set( x, y, z );
  scene.add( directionalLight );

  directionalLight.castShadow = true;

  const d = 1;
  directionalLight.shadow.camera.left = - d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = - d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;

  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  directionalLight.shadow.bias = - 0.001;

}

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {

  const timer = Date.now() * 0.0005;

  camera.position.x = Math.sin( timer ) * 2.5;
  camera.position.z = Math.cos( timer ) * 2.5;

  camera.lookAt( cameraTarget );

  renderer.render( scene, camera );

}
