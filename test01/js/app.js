// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

var showAxes = true;

var camera, scene, renderer;

var planemesh;

var mouseX = 0, mouseY = 0;

init();
animate();

document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    // console.log(mouseX / window.innerWidth);

    planemesh.geometry.vertices.map(
      (i)=>i.set( i.x, i.y, 0+(mouseX/window.innerWidth*10) )
    );
    planemesh.geometry.verticesNeedUpdate = true;

}

function init() {

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 300 );
	// camera.position.set(-0.00009,99.99999999994976,0.00005503579377065416);
	// camera.rotation.set(-1.5707957764369591, -8.349288234677925e-7, -0.9880034450136234);
	// camera.rotation.y =  10 * Math.PI / 180;
	// camera.position.set(-36.665227159009625, 35.79729217410124, 86.807656304975);
  camera.position.set(0, 0, 30);

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.setClearColor( 0x000000, 1 );

	// set up controls
	// controls = new THREE.OrbitControls( camera, renderer.domElement );
	// controls.enableZoom = true;
	// controls.enablePan = true;
	// controls.minDistance = 30;
	// controls.maxDistance = 100;


	var light, object;

	var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
	scene.add( ambientLight );

	var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	pointLight.lookAt( 0,0,0 );
	camera.add( pointLight );
	scene.add( camera );

  // define planemesh
  planemesh = new THREE.Mesh(
    new THREE.PlaneGeometry( 20, 20, 20, 20 ),
    new THREE.MeshBasicMaterial( { color: 0x00CC55, wireframe: true })
  );

  planemesh.position.set( 0, 0, 0);

  scene.add( planemesh );

	if( showAxes ){
 		var axes = new THREE.AxesHelper(100);
 		scene.add(axes);
	}

	window.addEventListener( 'resize', onWindowResize, false );

  // camera.lookAt(0, 0, 0);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}

function render() {

	var timer = Date.now() * 0.001;

	renderer.render( scene, camera );

}
