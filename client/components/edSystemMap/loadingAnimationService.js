'use strict';

angular.module('edGalaxyMap')
    .service('loadingAnimationService', function() {
        class LoadingAnimationService {
            constructor() {
                this.isLoading = true;
                this.uniforms = {
                    speed: {
                        type: 'f',
                        value: 0.2
                    },
                    color: {
                        type: 'v3',
                        value: new THREE.Vector3(0.2784313725490196, 0.34509803921568627, 0.8196078431372549)
                    },
                    brightness: {
                        type: 'f',
                        value: 0.4
                    },
                    radius: {
                        type: 'f',
                        value: 0.3
                    },
                    popSize: {
                        type: 'f',
                        value: 0.05
                    },
                    baseSize: {
                        type: 'f',
                        value: 0.9
                    },
                    uvScale: {
                        type: 'v2',
                        value: new THREE.Vector2(1, 1)
                    },
                    time: {
                        type: 'f',
                        value: 1.0
                    }
                };
            }

            toggleLoadingAnimation(isLoading, scene, camera) {
                if (isLoading) {



                    var shaderMaterial = new THREE.ShaderMaterial({
                        uniforms: this.uniforms,
                        vertexShader: document.getElementById('dotVertexShader').textContent,
                        fragmentShader: document.getElementById('dotFragmentShader').textContent
                    });

                    var loadingPlaneGeometry = new THREE.PlaneGeometry(50, 50, 50);
                    //loadingPlaneGeometry.lookAt( camera.position );

                    this.loadingTextMesh = new THREE.Mesh(loadingPlaneGeometry, shaderMaterial);
                    this.loadingTextMesh.position.set(0, 50, 25);
                    this.loadingTextMesh.lookAt(camera.position);
                    scene.add(this.loadingTextMesh);
                } else {
                    scene.remove(this.loadingTextMesh);
                }
            }


        }
        return new LoadingAnimationService();
    });
