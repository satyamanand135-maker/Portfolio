import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

camera.position.z = 13;

const scene = new THREE.Scene();
let robo;
let mixer;

const loader= new GLTFLoader();
loader.load('./glb/ball.glb',
    function(gltf){
        robo = gltf.scene;

        robo.traverse(n => {
    if (n.isMesh) {
        
        if (n.material.emissive && n.material.emissive.r > 0) {
            n.material.emissive.set(0x00ff00); 
            n.material.color.set(0x000000);   
        } else {

            n.material.color.set(0x0c0c0c);   
        }
    }
});
       
        scene.add(robo);

        mixer= new THREE.AnimationMixer(robo);
        mixer.clipAction(gltf.animations[0]).play();

        // modelMove();

        

    },
    function(xhr){},
    function(error){}
);

const renderer= new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);


const reRender3D = () =>{
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
};

reRender3D();

// let arrPositionModel = [
//     {
//         id:'home',
//         position:{x:-2, y:-2.5 , z:0},
//         rotation:{x:0,y:1.2,z:0},
//     },
//     {
//         id:'about',
//         position:{x:6, y:-2.5 , z:0},
//         rotation:{x:0,y:-1.2,z:0},
//     },
//     {
//         id:'skills',
//         position:{x:-5, y:1.2 , z:-0.57},
//         rotation:{x:0,y:0.5,z:0},
//     },
//     {
//         id:'services',
//         position:{x:0, y:-4 , z:-0.57},
//         rotation:{x:0.5,y:0.5,z:0},
//     },
//     {
//         id:'contact',
//         position:{x:7, y:-4 , z:-0.57},
//         rotation:{x:-0.25,y:-0.5,z:0},
//     },
//     {
//         id:'footer',
//         position:{x:-7, y:-3 , z:-0.57},
//         rotation:{x:0,y:0.5,z:0},
//     },



// ];

// const modelMove = () => {
//     const sections = document.querySelectorAll('.section');
//     let currentSection;
//     sections.forEach((section) => {
//         const rect = section.getBoundingClientRect();
//         if(rect.top <= window.innerHeight/3){
//             currentSection = section.id;
//         }

//     });

//     let position_active = arrPositionModel.findIndex(
//         (val) => val.id == currentSection
//     );

//     if (position_active >=0){
//         let new_coordinates = arrPositionModel[position_active];
//         gsap.to(robo.position,{
//             x: new_coordinates.position.x,
//             y: new_coordinates.position.y,
//             z: new_coordinates.position.z,
//             duration: 3,
//             ease: "power1.out"
//         });

//         gsap.to(robo.rotation, {
//             x: new_coordinates.rotation.x,
//             y: new_coordinates.rotation.y,
//             z: new_coordinates.rotation.z,
//             duration: 3,
//             ease: "power1.out"
            
//         });

//     }


// }

// window.addEventListener('scroll', () => {
//     if(robo){
//         modelMove();

//     }
// })


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
})


