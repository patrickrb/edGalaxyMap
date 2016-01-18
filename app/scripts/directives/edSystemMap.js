angular.module('edSystemMap', [])
	.directive('edSystemMap',function (systemsService) {
			return {
				restrict: 'E',
				link: function (scope, elem, attr) {
					var camera;
					var scene;
					var renderer;
					var previous;

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
						var geometry = new THREE.SphereBufferGeometry( .1, 8, 8 );
						var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
						console.log('system count: ', systemsService.systems.length + 1);
						for (var i = 0; i < systemsService.systems.length; i++) {
						  var systemX = systemsService.systems[i].x,
						      systemY = systemsService.systems[i].y,
						      systemZ = systemsService.systems[i].z;

									var sphere = new THREE.Mesh( geometry, material );
									sphere.position.set(systemX,systemY,systemZ);
									scene.add( sphere );
						}
					}


					function init() {
						camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
						camera.position.set(2, 4, 5);
						scene = new THREE.Scene();

						// Renderer
						renderer = new THREE.WebGLRenderer();
						renderer.setSize(window.innerWidth, window.innerHeight);
						elem[0].appendChild(renderer.domElement);

						// Events
						window.addEventListener('resize', onWindowResize, false);
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
