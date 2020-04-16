var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(1, 60, 60);                                                       //Radius, width, height
var texture = new THREE.TextureLoader().load('textures/iris5.png');                                       //Load tekening
var material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});                            //Coloring the cube
var sphere = new THREE.Mesh(geometry, material);                                                           //Apply material to object.
scene.add(sphere);

camera.position.z = 5;



var animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

animate();
let mouseX = 0;
let mouseY = 0;

document.onmousemove = function(evt) {
    evt.preventDefault();

    let deltaX = evt.clientX - mouseX;
    let deltaY = evt.clientY - mouseY;

    mouseX = evt.clientX;
    mouseY = evt.clientY;

    rotateScene(deltaX, deltaY);
};

function rotateScene(deltaX, deltaY) {
    scene.rotation.y += deltaX / 100;
    scene.rotation.x += deltaY / 100;
}