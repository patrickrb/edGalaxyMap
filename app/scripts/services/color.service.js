'use strict';

angular.module('edGalaxyMap')
  .service('colorService', function ($q, colorsFactory) {
    class ColorService {
            constructor() {
				this.colorPalette = ["#666666","#fe0000", "#ff7f00", "#ffff00", "#bfff00", "#7fff00", "#00ff15", "#009901", "#00ff80", "#01ffff", "#337eff", "#6601e5", "#e600e6"];
                this.map_colorTypes = ["economy", "allegiance", "government"];
				// The positions of these things need to match their color according to the palette in models/system_color_palette.png
				this.map_economy = ["None", "Extraction", "Refinery", "Industrial", "UNUSED", "Agriculture", "UNUSED", "Terraforming", "UNUSED", "High Tech", "Colony", "Service", "Tourism", "Military"];
				this.map_government = ["None", "Confederacy", "Prison Colony", "Anarchy", "Colony", "Democracy", "Imperial", "Corporate", "Communism", "Feudal", "Dictatorship", "Theocracy", "Cooperative", "Patronage"];
				this.map_allegiance = ["None", "Federation", "UNUSED", "Independent", "UNUSED", "UNUSED", "Alliance", "UNUSED", "UNUSED", "Empire", "UNUSED", "UNUSED", "UNUSED", "UNUSED"];
				this.activeColors = [true, true, true, true, true, true, true, true, true, true, true, true, true, true];
				
				this.activeColorType = "economy";
            }

            setColoringType(colorType){
              this.activeColorType = colorType;
			  var colorMap = this.getColorNames();
			  for (var i=0; i < this.activeColors.length; i++) {
				this.activeColors[i] = colorMap[i] !== "UNUSED";
			  }
            }
			
			setColorActive(index, value) {
				if (this.activeColors[index] !== undefined) {
					this.activeColors[index] = value;
				}
			}
			
			getColorNames() {
				return this["map_"+this.activeColorType];
			}
			
			getActiveColors() {
				return this.activeColors;
			}
			
			getColorPaletteImage() {
				var canvas = document.createElement("canvas");
				canvas.width = 16;
				canvas.height = 2;
				var ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, 16, 2);
				for (var i = 0; i < this.activeColors.length; i++) {
					if (this.activeColors[i]) {
						ctx.fillStyle = this.colorPalette[i];
						ctx.fillRect(i, 1, 1, 1);
					}
				}
				return canvas;
			}
        }
        return new ColorService;
  });
