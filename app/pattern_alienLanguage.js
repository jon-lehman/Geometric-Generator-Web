function patternAlienLanguage() {

  // Trigger artwork generation on page load
  document.addEventListener("DOMContentLoaded", initializeArtwork())

  function initializeArtwork() {

    // Clear Artwork
    document.getElementById('svg').innerHTML = ""

    // Setting basic variables
    var svg = document.getElementById('svg');
    var rowCount = localStorage.getItem('rowCount');
    var columnCount = localStorage.getItem('columnCount');
    var artworkWidth = columnCount * 60;
    var artworkHeight = rowCount * 60;
    var background = localStorage.getItem('canvasColor');
    var density = localStorage.getItem('density') / 100;
    var colorPalette = localStorage.getItem('colorPalette');

    // Choose single palette
    var palettesClone = JSON.parse(JSON.stringify(palettes))
    var chosenPalette = sample(palettesClone);
    for(var i = 0; i < palettes.length; i++) {
      if(palettes[i].value == colorPalette) {
        var chosenPalette = palettesClone[i];
      }
    }

    // Controlling padding
    var padding = localStorage.getItem('padding')
    if (padding === "none") {
      svg.setAttribute('width', artworkWidth);
      svg.setAttribute('height', artworkHeight);
      svg.innerHTML += '<rect id="rectBackground" width="' + artworkWidth + '" height="' + artworkHeight + '"/>'
    } else if (padding === "small") {
      svg.setAttribute('width', artworkWidth + 32);
      svg.setAttribute('height', artworkHeight + 32);
      svg.innerHTML += '<rect id="rectBackground" width="' + (artworkWidth + 32) + '" height="' + (artworkHeight + 32) + '"/>'
    } else if (padding === "large") {
      svg.setAttribute('width', artworkWidth + 64);
      svg.setAttribute('height', artworkHeight + 64);
      svg.innerHTML += '<rect id="rectBackground" width="' + (artworkWidth + 64) + '" height="' + (artworkHeight + 64) + '"/>'
    }

    // Collecting background as variable now that padding made it
    var rectBackground = document.getElementById('rectBackground');

    // Creating padding offset to center artwork based on padding control
    var paddingOffset = 0;
    if (padding === "small") {
      var paddingOffset = 16;
    } else if (padding === "large") {
      var paddingOffset = 32;
    }

    // Controlling background color
    var backgroundColor = '#FFFFFF';
    if (background === "white") {
      rectBackground.setAttribute('fill', 'white');
      rectBackground.style.backgroundColor = 'white';
      var backgroundColor = '#FFFFFF';
    } else if (background === "paletteColor") {
      var backgroundColor = sample(chosenPalette.colors)
      rectBackground.setAttribute('fill', backgroundColor);
      rectBackground.style.backgroundColor = backgroundColor;
    } else if (background === "transparent") {
      rectBackground.setAttribute('fill', 'none');
      rectBackground.style.backgroundColor = 'transparent';
      var backgroundColor = 'none';
    }

    // remove background color from circulation (array)
    if (chosenPalette.colors.includes(backgroundColor)) {
      var backgroundColorIndex = chosenPalette.colors.indexOf(backgroundColor);
      chosenPalette.colors.splice(backgroundColorIndex, 1);
    }

    // Initialization complete, now build actual artwork
    buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density);
  }

  // Build each grid item (artwork)
  function buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density) {

    // Create Mask
    document.getElementById('svg').innerHTML += mask(columnCount, rowCount, paddingOffset)

    // Limiting Colors
    var color1 = sample(chosenPalette.colors);
    var color2 = sample(chosenPalette.colors);
    while (color1 === color2) {
      var color2 = sample(chosenPalette.colors);
    }

    // For each column
    for (let x = 0; x < columnCount; x++) {
      // For each row
      for (let y = 0; y < rowCount; y++) {
        // Check density
        if (Math.random() < density) {

          // Randomly select artwork type
          var shapeSelection = getRandomInt(1, 6);

          // If 1 draw a cross
          if (shapeSelection === 1) {
            document.getElementById('svg').innerHTML += cross(x, y, chosenPalette, paddingOffset, color1, color2);
          }

          // If 2 draw a crossair
          if (shapeSelection === 2) {
            document.getElementById('svg').innerHTML += crossair(x, y, chosenPalette, paddingOffset, color1, color2);
          }

          // If 3 draw a diagonal
          if (shapeSelection === 3) {
            document.getElementById('svg').innerHTML += diagonal(x, y, chosenPalette, paddingOffset, color1, color2);
          }

          // If 4 draw a stairs
          if (shapeSelection === 4) {
            document.getElementById('svg').innerHTML += stairs(x, y, chosenPalette, paddingOffset, color1, color2);
          } 
          
          // If 5 draw a stairs
          if (shapeSelection === 5) {
            document.getElementById('svg').innerHTML += corners(x, y, chosenPalette, paddingOffset, color1, color2);
          }

          // If 6 draw a stairs
          if (shapeSelection === 6) {
            document.getElementById('svg').innerHTML += smallSquare(x, y, chosenPalette, paddingOffset, color1, color2);
          } 
        }
        
        // If density doesn't clear
        else {
          // do nothing
        }
      }
    }
  }

  function mask(columnCount, rowCount, paddingOffset) {
    const transform = 'translate('+paddingOffset+', '+paddingOffset+')'
    const path = '<rect transform="'+transform+'" width="'+(columnCount*60)+'" height="'+(rowCount*60)+'" fill="white" />'
    return  '<mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">' + 
                path + 
              '</mask>'
  }

  function cross(x, y, chosenPalette, paddingOffset, color1, color2) {
    var mixColor = getRandomInt(1,2);
    var colorA = color1;
    var colorB = color2;
    if (mixColor === 1) {
      var colorA = color1;
      var colorB = color2;
    } else {
      var colorA = color2;
      var colorB = color1;
    }
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path fill="'+colorA+'" transform="' + transform + '" d="M0 0h60v60H0z"/>'+
                  '<path fill="'+colorB+'" transform="' + transform + '" d="M0 0h20v20H0zM0 40h20v20H0zM40 0h20v20H40zM40 40h20v20H40z"/>'
    return '<svg>' + path + '</svg>'
  }

  function crossair(x, y, chosenPalette, paddingOffset, color1, color2) {
    var mixColor = getRandomInt(1,2);
    var colorA = color1;
    var colorB = color2;
    if (mixColor === 1) {
      var colorA = color1;
      var colorB = color2;
    } else {
      var colorA = color2;
      var colorB = color1;
    }
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path fill="'+colorA+'" transform="' + transform + '" d="M0 0h60v60H0z"/>'+
                  '<path fill="'+colorB+'" transform="' + transform + '" d="M0 0h20v20H0zM20 20h20v20H20zM40 0h20v20H40zM0 40h20v20H0zM40 40h20v20H40z"/>'
    return '<svg>' + path + '</svg>'
  }

  function diagonal(x, y, chosenPalette, paddingOffset, color1, color2) {
    var mixColor = getRandomInt(1,2);
    var colorA = color1;
    var colorB = color2;
    if (mixColor === 1) {
      var colorA = color1;
      var colorB = color2;
    } else {
      var colorA = color2;
      var colorB = color1;
    }
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path fill="'+colorA+'" transform="' + transform + '" d="M0 0h60v60H0z"/>'+
                  '<path fill="'+colorB+'" transform="' + transform + '" d="M0 20h20v20H0zM20 0h20v20H20zM40 20h20v20H40zM40 0h20v20H40zM0 40h20v20H0zM20 40h20v20H20z"/>'
    return '<svg>' + path + '</svg>'
  }

  function stairs(x, y, chosenPalette, paddingOffset, color1, color2) {
    var mixColor = getRandomInt(1,2);
    var colorA = color1;
    var colorB = color2;
    if (mixColor === 1) {
      var colorA = color1;
      var colorB = color2;
    } else {
      var colorA = color2;
      var colorB = color1;
    }
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path fill="'+colorA+'" transform="' + transform + '" d="M0 0h60v60H0z"/>'+
                  '<path fill="'+colorB+'" transform="' + transform + '" d="M0 0h20v20H0zM0 20h20v20H0zM0 40h20v20H0zM20 20h20v20H20zM20 40h20v20H20zM40 40h20v20H40z"/>'
    return '<svg>' + path + '</svg>'
  }

  function corners(x, y, chosenPalette, paddingOffset, color1, color2) {
    var mixColor = getRandomInt(1,2);
    var colorA = color1;
    var colorB = color2;
    if (mixColor === 1) {
      var colorA = color1;
      var colorB = color2;
    } else {
      var colorA = color2;
      var colorB = color1;
    }
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path fill="'+colorA+'" transform="' + transform + '" d="M0 0h60v60H0z"/>'+
                  '<path fill="'+colorB+'" transform="' + transform + '" d="M40 20h20v20H40zM20 20h20v20H20zM40 40h20v20H40zM20 40h20v20H20z"/>'
    return '<svg>' + path + '</svg>'
  }

  function smallSquare(x, y, chosenPalette, paddingOffset, color1, color2) {
    var mixColor = getRandomInt(1,2);
    var colorA = color1;
    var colorB = color2;
    if (mixColor === 1) {
      var colorA = color1;
      var colorB = color2;
    } else {
      var colorA = color2;
      var colorB = color1;
    }
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path fill="'+colorA+'" transform="' + transform + '" d="M0 0h60v60H0z"/>'+
                  '<path fill="'+colorB+'" transform="' + transform + '" d="M20 20h20v20H20z"/>'
    return '<svg>' + path + '</svg>'
  }
}