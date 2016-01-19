angular.module('edSystemMap', [])
	.directive('edSystemMap',function (systemsService) {
			return {
				restrict: 'E',
				link: function (scope, elem, attr) {
					var camera;
					var scene;
					var renderer;
					var previous;
					var mouse = new THREE.Vector2(0, 0);
					var raycaster = new THREE.Raycaster();
					var selectedNodes = [];
					var systemNodeData = [];
					var INTERSECTED;

					//load galaxy data
					systemsService.init();
					//init the scene
					init();

					//wait for systems data to load, then draw systems and animate
					scope.$watch(function() {
			        return systemsService.systems.length;
			    }, function(newVal, oldVal) {
							if(systemsService.systems.length >= 1){
								loadSystems();
								animate();
							}
			    });

					function loadSystems() {
						var geometry = new THREE.SphereBufferGeometry( .1, 16, 16 );
						console.log('system count: ', systemsService.systems.length + 1);
						for (var i = 0; i < systemsService.systems.length; i++) {
						var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
						  var systemX = systemsService.systems[i].x,
						      systemY = systemsService.systems[i].y,
						      systemZ = systemsService.systems[i].z;

									var sphere = new THREE.Mesh( geometry, material );
									sphere.metaData = {};
									sphere.name = systemsService.systems[i].name;
									sphere.position.set(systemX,systemY,systemZ);
									systemNodeData.push(sphere);
									scene.add( sphere );
						}
					}

					function onMouseMove( event ) {
						event.preventDefault();
						// calculate mouse position in normalized device coordinates
						// (-1 to +1) for both components
						mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
						mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
					}


					function init() {
						camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
						camera.position.set(2, 4, 5);

						camera.lookAt(0,0,0);
						scene = new THREE.Scene();

						// Renderer
						renderer = new THREE.WebGLRenderer();
						renderer.setSize(window.innerWidth, window.innerHeight);
						elem[0].appendChild(renderer.domElement);

						// Events
						window.addEventListener('resize', onWindowResize, false);
						window.addEventListener('mousemove', onMouseMove, false);
					}

					//
					function onWindowResize(event) {
						renderer.setSize(window.innerWidth, window.innerHeight);
						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();
					}

					function animate() {
						requestAnimationFrame(animate);
						render();
					}

					//
					function render() {
						// update the picking ray with the camera and mouse position
						raycaster.setFromCamera( mouse, camera );
						// for(var i = 0; i <= systemNodeData.length; i++){
						// 	var tempData = systemNodeData[i];
						// 	tempData.material.color.set( 0x0000ff)
						// }

						var intersects = raycaster.intersectObjects( scene.children );
						if ( intersects.length > 0 ) {
								if ( INTERSECTED != intersects[ 0 ].object ) {
									if ( INTERSECTED ){
										 INTERSECTED.material.color.set( INTERSECTED.currentHex );
								 	}
									INTERSECTED = intersects[ 0 ].object;
									INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
									INTERSECTED.material.color.set( 0xff0000 );
								}
							}
							else {
								if ( INTERSECTED ){
									INTERSECTED.material.color.set( INTERSECTED.currentHex );
								}
								INTERSECTED = null;
							}
							var timer = Date.now() * 0.0005;
							camera.position.x = Math.cos(timer) * 10;
							camera.position.y = Math.cos(timer) * 10;
							camera.position.z = Math.sin(timer) * 10;
							camera.lookAt(scene.position);
							renderer.render(scene, camera);
					}
				}
			}
		}
	);
