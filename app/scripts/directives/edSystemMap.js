angular.module('edSystemMap', [])
	.directive('edSystemMap',function (systemsService) {
			return {
				restrict: 'E',
				link: function (scope, elem, attr) {
					var camera;
					var controls;
					var colors = [];
					var scene;
					var renderer;
					var previous;
					var particleSystem;
					var mouse = new THREE.Vector2(0, 0);
					var raycaster = new THREE.Raycaster();
					raycaster.params.PointCloud.threshold = 30;
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
						var texture = THREE.ImageUtils.loadTexture('models/circle.png');
						texture.minFilter = THREE.LinearFilter;
						var particles = new THREE.Geometry();
						var pMaterial = new THREE.ParticleBasicMaterial({
										size: 1,
										transparent: true,
										opacity: 1,
										map: texture,
										sizeAttenuation: true,
										blending: THREE.Normal,
										fog: false,
										alphaTest: .99
						});

						for (var i = 0; i < systemsService.systems.length; i++) {
							    particle = new THREE.Vector3();
									particle.x = systemsService.systems[i].x;
									particle.y = systemsService.systems[i].y;
									particle.z = systemsService.systems[i].z;

									particle.name = systemsService.systems[i].name;
									particles.vertices.push(particle);
									colors[i] = '0x0000ff';

						}
						particleSystem = new THREE.PointCloud(particles, pMaterial);
						particleSystem.colors = colors;
						particleSystem.frustrumCulled = true;
						particleSystem.sortParticles = true;

						scene.add(particleSystem);
					}

					function onMouseMove( event ) {
						event.preventDefault();
						// calculate mouse position in normalized device coordinates
						// (-1 to +1) for both components
						mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
						mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
						findIntersect(event);
					}


					function init() {
						camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
						camera.position.set(2, 4, 5);

						camera.lookAt(0,0,0);
						controls = new THREE.TrackballControls( camera );
						controls.rotateSpeed = 2.0;
						controls.zoomSpeed = 2.2;
						controls.panSpeed = 2;

						controls.noZoom = false;
						controls.noPan = false;

						controls.staticMoving = true;
						controls.dynamicDampingFactor = 0.3;

						controls.keys = [ 65, 83, 68 ];

						controls.addEventListener( 'change', render );


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

					function findIntersect(event) {
							raycaster.setFromCamera(mouse, camera);
							var intersects = raycaster.intersectObjects(scene.children);
							if (Array.isArray(intersects) && intersects[0]) {
									var intersect = intersects[0];
									var location = intersect.object.geometry.vertices[intersect.index];
									// this.addLabel(event, location.name);
									// this.setTargetPosition(location);
									// this.setPreviewPosition(location);
									console.log('intersected: ', location.name)
									return intersect;
							} else {
									return false;
							}
					}

					function animate() {
						requestAnimationFrame(animate);
						controls.update();
						render();
					}

					//
					function render() {
							renderer.render(scene, camera);
					}
				}
			}
		}
	);
