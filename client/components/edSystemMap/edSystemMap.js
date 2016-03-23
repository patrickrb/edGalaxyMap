'use strict';

angular.module('edGalaxyMap')
	.directive('edSystemMap',function ($q, systemsService, $rootScope, stationsService, colorService, labelService, loadingAnimationService) {
			return {
				restrict: 'E',
				link: function (scope, elem) {
					var camera;
					var controls;
					var cameraBoundObjects = {};
					var uniforms;
					var renderer;
					var clock = new THREE.Clock();
					var particleSystem;
					var raycaster;
					var geometry;
					var mouse = new THREE.Vector2(0, 0);
					var selectedSystemIcon;
					var targetCircle = new THREE.Object3D();
					var targetCircleGeo = new THREE.CircleGeometry(50, 64);
					var BASE_POINT_SIZE = 100;
					var POP_SIZE_THRESHOLD = 1000000000; //population > than this will start scaling point size up
					var pickingEnabled = true;
					var mouseDownPos = new THREE.Vector2();
					var targetLineMaterial = new THREE.LineBasicMaterial({color: '0xffffff'});
					var colorPaletteTexture;
					var label = $('#pointer');

					//load galaxy data
					systemsService.init();
					//init the window.scene
					init();
					animate();

				scope.$on('selectedSystem:update', function(event,data) {
					scope.selectedSystem = data;
					selectedSystemIcon.visible = false;
					flyToSystem(scope.selectedSystem);
				});

				scope.$on('systemColoring:update', function(event, newColorKey) {
					var colorIndex = colorService.mapColorTypes.indexOf(newColorKey);
					if (colorIndex < 0) {
						console.error('Unknown system coloring type: '+newColorKey);
						colorIndex = 0;
					}
					uniforms.activeColoring.value = colorIndex;
					updateColorPaletteTexture();
				});

				scope.$on('systemColoring:updateActives', updateColorPaletteTexture);

				function updateColorPaletteTexture() {
					var canvas = colorService.getColorPaletteImage();
					colorPaletteTexture = new THREE.Texture(canvas);
					colorPaletteTexture.needsUpdate = true;
					colorPaletteTexture.minFilter = THREE.NearestFilter;
					colorPaletteTexture.magFilter = THREE.NearestFilter;
					uniforms.colorPalette.value = colorPaletteTexture;
				}

					//wait for systems data to load, then draw systems and animate
					scope.$watch(function() {
			        return systemsService.systems.length;
			    }, function() {
							if(systemsService.systems.length >= 1){
								loadSystems();
								// document.getElementById("searchSystemsInput").focus();
							}
			    });

					//wait for systems data to load, then draw systems and animate
					scope.$watch(function() {
							return stationsService.stations.length;
					}, function() {
							if(stationsService.stations.length >= 1){
								scope.stations = stationsService.stations;
							}
							else{
								scope.stations = [];
							}
					});

					function loadSystems() {
						loadingAnimationService.toggleLoadingAnimation(false, scene, camera);
						var texture = THREE.ImageUtils.loadTexture('assets/textures/circle.png');
						texture.minFilter = THREE.LinearFilter;
						uniforms = {

							activeColoring: { type: 'i', value: 0 },
							colorPalette: { type: 't', value: null },
							texture: { type: 't', value: texture },
							scale: {type: 'f', value: 1.0}

						};
						updateColorPaletteTexture();
						var shaderMaterial = new THREE.ShaderMaterial( {

							uniforms:       uniforms,
							vertexShader:   document.getElementById( 'vertexshader' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							depthTest:      true,
							depthWrite:     true,
							transparent:    false,
							shading:        THREE.FlatShading
						});

						geometry = new THREE.BufferGeometry();

						/*
						* This maps the property to a color index that will be used in the shader to read the right color from a texture palette
						* colorIndex (vec4)
						*   [0] = mapEconomy
						*   [1] = mapAllegiance
						*   [2] = mapGovernment
						*   [3] = unused (star type?)
						*/
						var colorIndex = new Float32Array( systemsService.systems.length * 4 );
						var positions = new Float32Array( systemsService.systems.length * 3 );
						var sizes = new Float32Array( systemsService.systems.length );

						for ( var i = 0, i3 = 0; i < systemsService.systems.length; i ++, i3 += 3 ) {

							var system = systemsService.systems[i];
							positions[ i3 + 0 ] = system.x;
							positions[ i3 + 1 ] = system.y;
							positions[ i3 + 2 ] = system.z;

							colorIndex[ i*4 + 0 ] = colorService.mapEconomy.indexOf(systemsService.systems[i].primary_economy);
							colorIndex[ i*4 + 1 ] = colorService.mapAllegiance.indexOf(systemsService.systems[i].allegiance);
							colorIndex[ i*4 + 2 ] = colorService.mapGovernment.indexOf(systemsService.systems[i].government);
							colorIndex[ i*4 + 3 ] = 0;

							sizes[ i ] = getPopulationScaleForSystem(system);

						}


						geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
						geometry.addAttribute( 'aColorIndex', new THREE.BufferAttribute( colorIndex, 4 ) );
						geometry.addAttribute( 'aSize', new THREE.BufferAttribute( sizes, 1 ) );
						geometry.attributes.aSize.needsUpdate = true;
						geometry.attributes.aColorIndex.needsUpdate = true;

						particleSystem = new THREE.Points( geometry, shaderMaterial );

						particleSystem.sortParticles = true;
						particleSystem.dynamic = true;
						window.scene.add(particleSystem);
						loadingAnimationService.isLoading = false;
						addControls();
					}

					function getPopulationScaleForSystem(system) {
						if (system.population) {
							return 50 * Math.max(system.population / POP_SIZE_THRESHOLD, 1.0);
						}
						return BASE_POINT_SIZE;
					}

					function onMouseMove( event ) {
            var $target = $(event.target);
						mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
						mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
						if(!loadingAnimationService.isLoading && pickingEnabled){
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

						if (window.isPanning) {

						}
					}

					function addCameraBoundGeometry() {
						cameraBoundObjects.gridPlane = {
							geometry : (function() {
								var geometry = new THREE.PlaneGeometry(10000,10000);
								var shaderMaterial = new THREE.ShaderMaterial( {
									uniforms:		{ uPanDelta : {type: 'v3', value: new THREE.Vector3()} },
									vertexShader:   document.getElementById( 'v-gridshader' ).textContent,
									fragmentShader: document.getElementById( 'f-gridshader' ).textContent,
									depthTest:      true,
									depthWrite:     true,
									transparent:    true,
									side: 			THREE.DoubleSide,
									shading:        THREE.FlatShading
								});
								return new THREE.Mesh(geometry, shaderMaterial);
							})(),
							updatePosition : (function() {
								var tmp = new THREE.Vector3();
								var delta = new THREE.Vector3();
								return function(pos) {
									// Add the panning delta between this frame and the last, then fade it so it reduces back to 0 eventually
									tmp.sub(pos);
									delta.add(tmp);
									delta.multiplyScalar(0.85);
									this.geometry.position.copy(pos); // Move center point of grid plane to camera's target point
									this.geometry.material.uniforms.uPanDelta.value.copy(delta);
									tmp.copy(pos);
								};
							})()
						};

						window.scene.add(cameraBoundObjects.gridPlane.geometry);
						cameraBoundObjects.gridPlane.geometry.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2);


						cameraBoundObjects.updateCameraPos = function(pos) {
							for (var i in this) {
								this[i].updatePosition && this[i].updatePosition(pos.clone());
							}
						};
					}

					function addControls(){
						controls = new THREE.OrbitControls( camera, elem[0].childNodes[0] );
						controls.rotateSpeed = 0.3;
						controls.zoomSpeed = 2.2;
						controls.panSpeed = 2;

						controls.enableDamping = true;
						controls.dampingFactor = 0.3;

						controls.keys = [ 65, 83, 68 ];
						controls.minDistance = 5;
						controls.addEventListener('end', enablePicking);
					}

					function disablePicking() {
						pickingEnabled = false;
					}

					function enablePicking() {
						pickingEnabled = true;
					}

					function addTargetCircle(){
						targetCircleGeo = new THREE.CircleGeometry(0.004, 64);
            targetCircleGeo.vertices.shift();
            targetCircle.add(new THREE.Line(targetCircleGeo, targetLineMaterial));
            targetCircle.visible = false;
            targetCircle.name = 'targetCircle';
						window.scene.add(targetCircle);
					}

					function addSelectedSystemIcon(){
						var selectedSystemIconTexture = THREE.ImageUtils.loadTexture('assets/textures/Marker-galaxy-map-green.png');
						var selectedSystemIconMaterial = new THREE.SpriteMaterial({
							map: selectedSystemIconTexture,
							color: 0xffffff,
							transparent: true
						});
						selectedSystemIcon = new THREE.Sprite( selectedSystemIconMaterial );
						selectedSystemIcon.name = 'selectedSystemIcon';
						selectedSystemIcon.visible = false;
						selectedSystemIcon.scale.set(0.33,0.66,0.33);
						window.scene.add( selectedSystemIcon );
					}

					function init() {
						camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 999000);
						camera.position.set(0, 50, 50);

						//camera.lookAt(-25,0, 0);

						window.scene = new THREE.Scene();
						loadingAnimationService.toggleLoadingAnimation(true, scene, camera);

						addTargetCircle();
						addSelectedSystemIcon();
						addCameraBoundGeometry();

						raycaster = new THREE.Raycaster();
						raycaster.params.PointCloud.threshold = 0.5;
						renderer = new THREE.WebGLRenderer();
						renderer.setSize(window.innerWidth, window.innerHeight);
						renderer.sortObjects = true;

						elem[0].appendChild(renderer.domElement);


						// Events
						window.addEventListener('resize', onWindowResize, false);
						elem[0].addEventListener('mousemove', onMouseMove, false);
						elem[0].addEventListener('mousedown', function(event) {
							mouseDownPos = new THREE.Vector2(event.pageX, event.pageY);
							disablePicking();
						});
						elem[0].addEventListener('mouseup', function (event) {
							if (new THREE.Vector2(event.pageX, event.pageY).distanceToSquared(mouseDownPos) < 1) {
								checkClickForIntersect(event);
							}
							enablePicking();
						});
					}

					//
					function onWindowResize(event) {
						renderer.setSize(window.innerWidth, window.innerHeight);
						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();
					}

					function checkClickForIntersect(event){
								if(!loadingAnimationService.isLoading){
									var intersect = findIntersect(event);
	                if (!intersect) { return; }
	                var location = systemsService.systems[intersect.index];
									$rootScope.$broadcast('selectedSystem:update', location);
								}
					}

					function flyToSystem(location){
						disablePicking();
						selectedSystemIcon.position.set(location.x, location.y + 0.75, location.z);
						stationsService.findStationsBySystemId(location.id);
                    var tween = new TWEEN.Tween(camera.position).to({
                        x: location.x,
                        y: location.y,
                        z: location.z + 5
                    })
										.easing(TWEEN.Easing.Linear.None)
										.onComplete(function(){
												selectedSystemIcon.visible = true;
												labelService.addLabel(location, scene, camera);
												enablePicking();
										})
										.start();
                    tween = new TWEEN.Tween(controls.target).to({
                        x: location.x,
                        y: location.y,
                        z: location.z
                    }).easing(TWEEN.Easing.Linear.None)
                    .start();

					}

					function setTargetPosition(location) {
              return $q(function (resolve) {
                  targetCircle.visible = true;
									targetCircle.lookAt( camera.position );
									var popScale = getPopulationScaleForSystem( location );
									targetCircle.scale.set( popScale, popScale, popScale );
                  return resolve(targetCircle.position.set(location.x, location.y, location.z));
              }.bind(this));
          }


					function findIntersect() {
							raycaster.setFromCamera(mouse, camera);
							var intersects = raycaster.intersectObjects([particleSystem]);
							if (Array.isArray(intersects) && intersects[0]) {
									var intersect = intersects[0];
									if(intersect.object.name === 'selectedSystemIcon'){
										if(intersects[1]){
											intersect = intersects[1];
										}
										else{
											return false;
										}
									}
									else{
										var location = systemsService.systems[intersect.index];
										if (!colorService.isSystemActive(location)) {
											return false;
										}
										setTargetPosition(location);
										return intersect;
									}
							} else {
									return false;
							}
					}

					function animate(time) {
						if(!loadingAnimationService.isLoading){
							controls.update();
							var distToCamera = selectedSystemIcon.position.distanceTo(camera.position) * 0.1;
							var scaleFactor = Math.max(Math.min(distToCamera, 10.0), 1.0);
							selectedSystemIcon.scale.set(0.33 * scaleFactor, 0.66 * scaleFactor, 0.33 * scaleFactor);
						}
						requestAnimationFrame(animate);
						TWEEN.update(time);
						render();
					}

					function render() {
						var delta = clock.getDelta();
						if(loadingAnimationService.isLoading){
							//animate loading texture while systems load
							loadingAnimationService.uniforms.time.value += delta * 5;
						} else {
							cameraBoundObjects.updateCameraPos(controls.target);
						}
						renderer.autoClear = false;
						renderer.clear();

						// renderer.render(backgroundScene , backgroundCamera )
						renderer.render(window.scene, camera);
					}
				}
			};
		}
	);
