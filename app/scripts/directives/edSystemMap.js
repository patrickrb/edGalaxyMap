angular.module('edSystemMap', [])
	.directive('edSystemMap',function ($q, systemsService, $rootScope, stationsService) {
			return {
				restrict: 'E',
				link: function (scope, elem, attr) {
					var camera;
					var controls;
					var colors = [];
					var particles = [];
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

          scope.$on('selectedSystem:update', function(event,data) {
            scope.selectedSystem = data;
						flyToSystem(scope.selectedSystem);
         });

					//wait for systems data to load, then draw systems and animate
					scope.$watch(function() {
			        return systemsService.systems.length;
			    }, function(newVal, oldVal) {
							if(systemsService.systems.length >= 1){
								loadSystems();
								animate();
								// document.getElementById("searchSystemsInput").focus();
							}
			    });

					//wait for systems data to load, then draw systems and animate
					scope.$watch(function() {
							return stationsService.stations.length;
					}, function(newVal, oldVal) {
							if(stationsService.stations.length >= 1){
								scope.stations = stationsService.stations;
							}
							else{
								scope.stations = []
							}
					});

					function loadSystems() {
						var texture = THREE.ImageUtils.loadTexture('models/particle.png');
						texture.minFilter = THREE.LinearFilter;
						uniforms = {

							color:     { type: "c", value: new THREE.Color( 0xffffff ) },
							texture:   { type: "t", value: texture  },
							scale: {type: "f", value: 2.0},
							size: { type: "f", value: 500}

						};

						var shaderMaterial = new THREE.ShaderMaterial( {

							uniforms:       uniforms,
							vertexShader:   document.getElementById( 'vertexshader' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

							blending:       THREE.AdditiveBlending,
							depthTest:      false,
							transparent:    true

						});



						geometry = new THREE.BufferGeometry();

						var positions = new Float32Array( systemsService.systems.length * 3 );
						var colors = new Float32Array( systemsService.systems.length * 3 );
						var sizes = new Float32Array( systemsService.systems.length );

						var color = new THREE.Color();

						for ( var i = 0, i3 = 0; i < systemsService.systems.length; i ++, i3 += 3 ) {

							positions[ i3 + 0 ] = systemsService.systems[i].x;
							positions[ i3 + 1 ] = systemsService.systems[i].y;
							positions[ i3 + 2 ] = systemsService.systems[i].z;


							color.setHSL( i / systemsService.systems.length, 1.0, 0.5 );

							colors[ i3 + 0 ] = color.r;
							colors[ i3 + 1 ] = color.g;
							colors[ i3 + 2 ] = color.b;

							sizes[ i ] = 20;

						}


						geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
						geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
						geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

						particleSystem = new THREE.Points( geometry, shaderMaterial );


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
						camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 999000);
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
						raycaster.params.PointCloud.threshold = .3;
						// raycaster.near = 5;
						// Renderer
						renderer = new THREE.WebGLRenderer();
						renderer.setSize(window.innerWidth, window.innerHeight);
						renderer.sortObjects = true;

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

					function getLightYears(sourceVector, targetVector){
							var sourceVector = new THREE.Vector3(0,0,0);
							var targetVector = new THREE.Vector3(3.03125, -0.09375, 3.15625);

							return sourceVector.distanceTo(targetVector);
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
                var location = systemsService.systems[intersect.index];
								stationsService.findStationsBySystemId(location.systemId);
								$rootScope.$broadcast('selectedSystem:update', location);
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
									targetCircle.lookAt( camera.position );
                  return resolve(targetCircle.position.set(location.x, location.y, location.z))
              }.bind(this));
          }

					function findIntersect(event) {
							raycaster.setFromCamera(mouse, camera);
							var intersects = raycaster.intersectObjects(scene.children);
							if (Array.isArray(intersects) && intersects[0]) {
									var intersect = intersects[0];
									var location = systemsService.systems[intersect.index];
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
