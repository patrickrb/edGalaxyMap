'use strict';

angular.module('edGalaxyMap')
  .service('labelService', function ($q) {
    class LabelService {
            constructor() {
                LabelService.currentLabel = null;
            }

            addLabel(location, scene, camera) {
              scene.remove(LabelService.currentLabel);
              var loader = new THREE.FontLoader();
              loader.load( 'assets/fonts/helvetiker_bold.typeface.js', function ( font ) {
                  var labelGeometry = new THREE.TextGeometry( location.name, {
                      font: font,
                      size: 0.2,
                      height: 0.01
                  });

                  LabelService.currentLabel = new THREE.Mesh(labelGeometry, new THREE.MeshBasicMaterial({
                    color: 0xffffff
                  }));

                  LabelService.currentLabel.geometry = labelGeometry;
                  LabelService.currentLabel.geometry.needsUpdate = true;

                  LabelService.currentLabel.position.set(location.x + 0.3, location.y, location.z);

                  scene.add(LabelService.currentLabel);
                });
            }
        }
        return new LabelService;
  });
