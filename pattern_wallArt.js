function patternWallArt() {

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

    // For each column
    for (let x = 0; x < columnCount; x++) {
      // For each row
      for (let y = 0; y < rowCount; y++) {
        // Check density
        if (Math.random() < density) {

          // Randomly select artwork type
          var shapeSelection = getRandomInt(0, 8);

          // IF 0 draw a Circle
          if (shapeSelection === 0) {
            document.getElementById('svg').innerHTML += circle(x, y, chosenPalette, paddingOffset);
          }

          // IF 1 draw rect small small big
          if (shapeSelection === 1) {
            document.getElementById('svg').innerHTML += rectSmallSmallBig(x, y, chosenPalette, paddingOffset);
          }

          // IF 2 draw masonry
          if (shapeSelection === 2) {
            document.getElementById('svg').innerHTML += masonry(x, y, chosenPalette, paddingOffset);
          }

          // If 3 draw Two Rectangles and One Triangle
          if (shapeSelection === 3) {
            document.getElementById('svg').innerHTML += twoRectOneTriangle(x, y, chosenPalette, paddingOffset);
          }

          // If 4 draw Rectangles Small Big Small
          if (shapeSelection === 4) {
            document.getElementById('svg').innerHTML += rectSmallBigSmall(x, y, chosenPalette, paddingOffset);
          }

          // If 5 draw sunsets
          if (shapeSelection === 5) {
            document.getElementById('svg').innerHTML += sunsets(x, y, chosenPalette, paddingOffset);
          }

          // If 6 draw four circles
          if (shapeSelection === 6) {
            document.getElementById('svg').innerHTML += fourCircles(x, y, chosenPalette, paddingOffset);
          }

          // If 7 draw one circle and three rectangles
          if (shapeSelection === 7) {
            document.getElementById('svg').innerHTML += oneCircleThreeRectangles(x, y, chosenPalette, paddingOffset);
          }

          // If 8 draw one circle and three rectangles
          if (shapeSelection === 8) {
            document.getElementById('svg').innerHTML += twoTriangles(x, y, chosenPalette, paddingOffset);
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

  function circle(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<circle transform="' + transform + '" cx="30" cy="30" r="26" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function rectSmallSmallBig(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '"  d="M4 29h52v27H4z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '"  d="M4 4h52v8.5H4z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '"  d="M4 16.5h52V25H4z"/>'
    return '<svg>' + path + '</svg>'
  }

  function masonry(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M30 4h26v32H30z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M4 4h22v21H4z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M4 29h22v27H4z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M30 40h26v16H30z"/>'
    return '<svg>' + path + '</svg>'
  }

  function twoRectOneTriangle(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M16 4h40v41H16z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M56 56l-20-7-20 7h40z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M4 4h8v52H4z"/>'
    return '<svg>' + path + '</svg>'
  }

  function rectSmallBigSmall(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M4 4h52v11H4z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M4 45h52v11H4z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M4 19h52v22H4z"/>'
    return '<svg>' + path + '</svg>'
  }

  function sunsets(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M17 43C9.82 43 4 48.82 4 56h26c0-7.18-5.82-13-13-13z"/>'+
                '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M43 43c-7.18 0-13 5.82-13 13h26c0-7.18-5.82-13-13-13z"/>'+
                '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M43 30c-7.18 0-13 5.82-13 13h26c0-7.18-5.82-13-13-13z"/>'+
                '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M17 30C9.82 30 4 35.82 4 43h26c0-7.18-5.82-13-13-13z"/>'+
                '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M43 17c-7.18 0-13 5.82-13 13h26c0-7.18-5.82-13-13-13z"/>'+
                '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M17 17C9.82 17 4 22.82 4 30h26c0-7.18-5.82-13-13-13z"/>'+
                '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M43 4c-7.18 0-13 5.82-13 13h26c0-7.18-5.82-13-13-13z"/>'+
                '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M17 4C9.82 4 4 9.82 4 17h26c0-7.18-5.82-13-13-13z"/>'
    return '<svg>' + path + '</svg>'
  }

  function fourCircles(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<circle transform="' + transform + '" cx="16" cy="16" r="12" fill="' + sample(chosenPalette.colors) + '"/><circle transform="' + transform + '" cx="44" cy="16" r="12" fill="' + sample(chosenPalette.colors) + '"/><circle transform="' + transform + '" cx="16" cy="44" r="12" fill="' + sample(chosenPalette.colors) + '"/><circle transform="' + transform + '" cx="44" cy="44" r="12" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function oneCircleThreeRectangles(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<circle transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" cx="16" cy="16" r="12"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M32 4h24v8H32z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M5 48h51v8H5z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M32 16h24v28H32z"/>'
    return '<svg>' + path + '</svg>'
  }

  function twoTriangles(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M56 4H4l26 24L56 4z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M56 32H4l26 24 26-24z"/>'
    return '<svg>' + path + '</svg>'
  }

}