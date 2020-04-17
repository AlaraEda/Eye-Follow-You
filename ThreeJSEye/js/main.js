//Creating a scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcc0ff);
scene.fog = new THREE.Fog(0xfc0398, 0.2, 100);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );            //Er zijn verschillende soorten camera's.
/*
                                          FOV,              aspect ratio,           near, far
FOV:          Field of vieuw, the value is in degrees. The extend of the seen that is on display.
Aspect Ratio: Width of the element devided by the Height.
Near & far:   Objecten die verder staan van de camera dan de waarde "far" en objecten die dichter
              bij de camera staan dan de waarde "near" zullen niet gerenderd worden. 
*/

var renderer = new THREE.WebGLRenderer({antialias: true});                                                 //Er zijn browsors die dit niet supporten. Antialias zorgt ervoor dat de globe shaper eruit ziet.
renderer.setSize( window.innerWidth, window.innerHeight );                                                 //Grootte van renderen.
document.body.appendChild( renderer.domElement );                                                          //Canvas Eelement the renderer uses to display the scene to us.

//Voor als je het venster vergroot/verkleint
window.addEventListener('resize', () =>{
    renderer.setSize(window.innerWidth, window.innerHeight);                                                //Zet de size om naar de current grootte.
    camera.aspect = window.innerWidth / window.innerHeight;                                                 //Stel de camera aspect opnieuw in met e nieuwe gegevens van het venster.

    //camera.updateProjectMatrix();                                                                           //Update camera everytime an adjustment is made.
})


//The globe
var geometry = new THREE.SphereGeometry( 1, 60, 60 );                                                       //Radius, width, height
var texture = new THREE.TextureLoader().load( 'textures/iris5.png' );                                       //Load tekening
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } );                            //Coloring the cube
var globe = new THREE.Mesh( geometry, material );                                                           //Apply material to object.
var globe2 = new THREE.Mesh( geometry, material );                                                           //Apply material to object.
// globe.rotation.x = 0;
// globe.rotation.y = -1;
scene.add( globe );                                                                                         //Add to coordination (0,0,0), camera en cube zitten in elkaar.  
scene.add( globe2 );                                                                                         //Add to coordination (0,0,0), camera en cube zitten in elkaar.  

globe.position.x = -1.5;
globe2.position.x = 1.5;

camera.position.z = 5;                                                                                      //Hoe ver de camera is ingezoemd                                                                                    //Move camera zodat die niet in de cube vast zit.

//Eventlistener
const domEvents = new THREEx.DomEvents(camera, renderer.domElement)

//Globe Big/Small
domEvents.addEventListener(globe, 'mouseover', event =>{
    // globe.scale.set(1.2,1.2,1.2)
})

domEvents.addEventListener(globe, 'mouseout', event =>{
    // globe.scale.set(1,1,1)
})

let lookMaxX = 0.01;
let lookMaxY = 0.01;

document.onmousemove = function(event) {
    const fromCenterpointX = (window.innerWidth / 2) - (event.clientX);
    const fromCenterpointY = (window.innerHeight / 2) - (event.clientY);

    const x = (fromCenterpointX / 2) / (window.innerWidth / 2) * 100;
    const y = (fromCenterpointY / 2) / (window.innerHeight / 2) * 100;

    console.log(y, x);

    rotateScene(globe, -y, -x);
    rotateScene(globe2, -y, -x);

    
}

function rotateScene(globe_, deltaX, deltaY) {
    globe_.rotation.y = -1 + deltaY * lookMaxY;
    globe_.rotation.x = 0.15 + deltaX * lookMaxX;
}


//Rendering the scene, render/animate loop
function animate() {
    requestAnimationFrame( animate );                                                                       //RequestAnimationFrame zorgt ervoor dat de animatie pauzeert wanneer je naar een andere browser pagina gaat. Miss is SetInterval handiger?
    //Rotate Eye
    // globe.rotation.x += 0.01;
    // globe.rotation.y += 0.01;

    // globe.rotation.x == 0
    // globe.rotation.y += 0.01;
    // if(globe.rotation.y == 0.05){
    //     globe.rotation.y = 0
    // }

    //console.log(globe.rotation.y)

    renderer.render( scene, camera );
};
animate();
