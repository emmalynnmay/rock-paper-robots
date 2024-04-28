import { requireLogin } from "../utils/require_login.js";

import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';

let container, stats;

let camera, cameraTarget, scene, renderer;

init();
animate();

export const RenderTest = () => {
  requireLogin();
  return <div id="theContainer" className="render-container"></div>;
}

function init() {

  container = document.createElement( 'div' );
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
  /*loader.load( './models/ply/ascii/dolphins.ply', function ( geometry ) {

    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial( { color: 0x009cff, flatShading: true } );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.y = - 0.2;
    mesh.position.z = 0.3;
    mesh.rotation.x = - Math.PI / 2;
    mesh.scale.multiplyScalar( 0.001 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );

  } );*/

  loader.load( 'models/plane.ply', function ( geometry ) {

    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial( { color: 0x009cff, flatShading: true } );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.x = - 0.2;
    mesh.position.y = - 0.02;
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
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.shadowMap.enabled = true;

  container.appendChild( renderer.domElement );

  // stats

  stats = new Stats();
  container.appendChild( stats.dom );

  // resize

  window.addEventListener( 'resize', onWindowResize );

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

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

function render() {

  const timer = Date.now() * 0.0005;

  camera.position.x = Math.sin( timer ) * 2.5;
  camera.position.z = Math.cos( timer ) * 2.5;

  camera.lookAt( cameraTarget );

  renderer.render( scene, camera );

}

/*import React from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var container;
var camera, scene, renderer, controls, loader;

export const RenderTest = () => {
  requireLogin();
  return <div id="theContainer" className="render-container"></div>;
}

init();
animate();

function init() {
  //Creating the container for the ply
  container = document.createElement("div");
  container.classList.add("render-container");
  document.body.appendChild(container);

  //initializing the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 2000);
  camera.position.z = 2;
  camera.position.set(0, 9, 1500);

  //initializing the scene
  scene = new THREE.Scene();
  scene.add(new THREE.AxesHelper(30));

  //initializing renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  //adding renderer to DOM
  container.appendChild(renderer.domElement);

  //initializing interactive controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  //rendering ply file
  const plyLoader = new PLYLoader();

  plyLoader.load(
    "plane.ply",
    function (geometry) {
      const mesh = new THREE.Points(geometry);
      mesh.rotateX(-Math.PI / 2);
      scene.add(mesh);
    },
    // called when loading is in progress
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
      console.log(error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}*/