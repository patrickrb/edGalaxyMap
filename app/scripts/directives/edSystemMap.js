angular.module('edSystemMap', [])
	.directive('edSystemMap',function ($q, systemsService, $rootScope) {
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
					var raycaster;
					var backgroundScene;
					var backgroundCamera;
					var mouse = new THREE.Vector2(0, 0);
					var selectedNodes = [];
					var systemNodeData = [];
					var targetCircle = new THREE.Object3D();
					var targetCircleGeo = new THREE.CircleGeometry(50, 64);
					var targetLineMaterial = new THREE.LineBasicMaterial({
              color: '0xffffff'
          });
					var label = $("#pointer");
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
                    transparent: false,
                    opacity: .95,
                    sizeAttenuation: true,
                    map: texture,
                    blending: THREE.AdditiveBlending,
                    fog: true,
                    alphaTest: .01
						});

						for (var i = 0; i < systemsService.systems.length; i++) {
							    particle = new THREE.Vector3();
									particle.x = systemsService.systems[i].x;
									particle.y = systemsService.systems[i].y;
									particle.z = systemsService.systems[i].z;
									particle.name = systemsService.systems[i].name;
									particle.metaData = systemsService.systems[i];
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

            var $target = $(event.target);
						// calculate mouse position in normalized device coordinates
						// (-1 to +1) for both components
						mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
						mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
						var intersect = findIntersect(event);
						if (!intersect) {
								label.css({
										visibility: 'hidden',
										display: 'none'
								});
								targetCircle.visible = false;
						}
						else {
						$target.focus();
						}
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
						targetCircleGeo = new THREE.CircleGeometry(1, 64);
            targetCircleGeo.vertices.shift();
            targetCircle.add(new THREE.Line(targetCircleGeo, targetLineMaterial));
            targetCircle.visible = false;
            targetCircle.name = 'targetCircle';
						scene.add(targetCircle);

						raycaster = new THREE.Raycaster();
						raycaster.params.PointCloud.threshold = .1;
						// raycaster.near = 5;
						// Renderer
						renderer = new THREE.WebGLRenderer();
						renderer.setSize(window.innerWidth, window.innerHeight);

						// var texture = THREE.ImageUtils.loadTexture( 'models/background.jpg' );
						// var backgroundMesh = new THREE.Mesh(
            // new THREE.PlaneGeometry(2, 2, 0),
            // new THREE.MeshBasicMaterial({
            //     map: texture
            // }));
						//
						// backgroundMesh .material.depthTest = false;
        		// backgroundMesh .material.depthWrite = false;
						//
						// backgroundScene = new THREE.Scene();
		      	// backgroundCamera = new THREE.Camera();
		        // backgroundScene.add(backgroundCamera );
		        // backgroundScene.add(backgroundMesh );

						elem[0].appendChild(renderer.domElement);

						// Events
						window.addEventListener('resize', onWindowResize, false);
						window.addEventListener('mousemove', onMouseMove, false);
						elem[0].addEventListener('click', function (event) {
							checkClickForIntersect(event);
						});
					}

					//
					function onWindowResize(event) {
						renderer.setSize(window.innerWidth, window.innerHeight);
						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();
					}

					function checkClickForIntersect(event){
								var intersect = findIntersect(event);
                if (!intersect) return;
                var location = intersect.object.geometry.vertices[intersect.index];
              	flyToSystem(location);
								$rootScope.$broadcast('selectedSystem:update', location.metaData);
					}

					function flyToSystem(location){
                    var whichZ = () => {
                        return camera.position.z > 0 ? 10 : -10;
                    };
                    var tween = new TWEEN.Tween(camera.position).to({
                        x: location.x + 10,
                        y: location.y + 10,
                        z: location.z + whichZ()
                    })
										.easing(TWEEN.Easing.Linear.None)
										.start();
                    var tween = new TWEEN.Tween(controls.target).to({
                        x: location.x,
                        y: location.y,
                        z: location.z
                    }).easing(TWEEN.Easing.Linear.None)
                    .start();

					}

					function setTargetPosition(location) {
              return $q(function (resolve, reject) {
                  targetCircle.visible = true;
                  return resolve(targetCircle.position.set(location.x, location.y, location.z))
              }.bind(this));
          }

					function findIntersect(event) {
							raycaster.setFromCamera(mouse, camera);
							var intersects = raycaster.intersectObjects(scene.children);
							if (Array.isArray(intersects) && intersects[0]) {
									var intersect = intersects[0];
									var location = intersect.object.geometry.vertices[intersect.index];
									addLabel(event, location.name);
									setTargetPosition(location);
									return intersect;
							} else {
									return false;
							}
					}

					function addLabel(event, name){
              return $q(function (resolve, reject) {
                  label.css({
                      top: (event.offsetY - 1) - 30,
                      left: (event.offsetX + 1) - 40,
                      visibility: 'visible',
                      display: 'block'
                  });
                  return resolve(label.html(name));
              }.bind(this));
					}

					function animate(time) {
						requestAnimationFrame(animate);
						controls.update();
            TWEEN.update(time);
						render();
					}

					//
					function render() {
	            renderer.autoClear = false;
	            renderer.clear();
	            // renderer.render(backgroundScene , backgroundCamera )
							renderer.render(scene, camera);
					}
				}
			}
		}
	);
