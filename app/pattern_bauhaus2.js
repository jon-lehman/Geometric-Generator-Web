function patternBauhaus2() {

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

    // Setting consistent grid color
    var gridColor = sample(chosenPalette.colors);
    var gridColorIndex = chosenPalette.colors.indexOf(gridColor);
    chosenPalette.colors.splice(gridColorIndex, 1);

    // Initialization complete, now build actual artwork
    buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density, gridColor);
  }

  // Build each grid item (artwork)
  function buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density, gridColor) {

    // Create Mask
    document.getElementById('svg').innerHTML += mask(columnCount, rowCount, paddingOffset)

    // For each column
    for (let x = 0; x < columnCount; x++) {
      // For each row
      for (let y = 0; y < rowCount; y++) {
        // Check density
        if (Math.random() < density) {

          // Randomly select artwork type
          var shapeSelection = getRandomInt(0, 10);

          // IF 0 draw a slash
          if (shapeSelection === 0) {
            document.getElementById('svg').innerHTML += slash(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 1 draw a circle outline
          if (shapeSelection === 1) {
            document.getElementById('svg').innerHTML += circleOutline(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 2 draw a circle filled
          if (shapeSelection === 2) {
            document.getElementById('svg').innerHTML += circleFilled(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 3 draw a empty square
          if (shapeSelection === 3) {
            document.getElementById('svg').innerHTML += emptySquare(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 4 draw a Semi Circle Outline
          if (shapeSelection === 4) {
            document.getElementById('svg').innerHTML += semiCircleOutline(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 5 draw a Semi Circle filled
          if (shapeSelection === 5) {
            document.getElementById('svg').innerHTML += semiCircleFilled(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 6 draw a Semi Circle filled
          if (shapeSelection === 6) {
            document.getElementById('svg').innerHTML += semiCircleRectFilled(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 7 draw two semi circles outlined
          if (shapeSelection === 7) {
            document.getElementById('svg').innerHTML += twoSemiCirclesOutline(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 8 draw two semi circles filled
          if (shapeSelection === 8) {
            document.getElementById('svg').innerHTML += twoSemiCirclesFilled(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 9 draw split circle outline
          if (shapeSelection === 9) {
            document.getElementById('svg').innerHTML += splitCircleOutline(x, y, chosenPalette, paddingOffset, gridColor);
          }

          // IF 10 draw split circle filled
          if (shapeSelection === 10) {
            document.getElementById('svg').innerHTML += splitCircleFilled(x, y, chosenPalette, paddingOffset, gridColor);
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
    const transform = 'translate('+(paddingOffset-1)+', '+(paddingOffset-1)+')'
    const path = '<rect transform="'+transform+'" width="'+((columnCount*60)+2)+'" height="'+((rowCount*60)+2)+'" fill="white" />'
    return  '<mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">' + 
                path + 
              '</mask>'
  }

  function slash(x, y, chosenPalette, paddingOffset, gridColor) {
    const rotate = 90 * getRandomInt(0,1);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<rect transform="'+transform+'" fill="none" x="0" y="0" width="60" height="60" stroke="'+gridColor+'" stroke-width="2"/><path transform="'+transform+'" fill="none" d="M0 0L60 60" stroke="'+gridColor+'" stroke-width="2"/>'
    return '<svg>' + path + '</svg>'
  }

  function circleOutline(x, y, chosenPalette, paddingOffset, gridColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/><circle transform="'+transform+'" cx="30" cy="30" r="30" fill="none" stroke="'+gridColor+'" stroke-width="2"/>'
    return '<svg>' + path + '</svg>'
  }

  function circleFilled(x, y, chosenPalette, paddingOffset, gridColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/><circle transform="'+transform+'" cx="30" cy="30" r="30" fill="'+sample(chosenPalette.colors)+'" stroke="'+gridColor+'" stroke-width="2"/>'
    return '<svg>' + path + '</svg>'
  }

  function emptySquare(x, y, chosenPalette, paddingOffset, gridColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/>'
    return '<svg>' + path + '</svg>'
  }

  function semiCircleOutline(x, y, chosenPalette, paddingOffset, gridColor) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/><path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 30c0 16.569 13.432 30 30 30v-60c-16.568 0-30 13.432-30 30z"/>'
    return '<svg>' + path + '</svg>'
  }

  function semiCircleFilled(x, y, chosenPalette, paddingOffset, gridColor) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/><path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" stroke="'+gridColor+'" stroke-width="2" d="M0 30c0 16.569 13.432 30 30 30v-60c-16.568 0-30 13.432-30 30z"/>'
    return '<svg>' + path + '</svg>'
  }

  function semiCircleRectFilled(x, y, chosenPalette, paddingOffset, gridColor) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/><path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" stroke="'+gridColor+'" stroke-width="2" d="M30 0h30v60h-30z"/><path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 30c0 16.569 13.432 30 30 30v-60c-16.568 0-30 13.432-30 30z"/>'
    return '<svg>' + path + '</svg>'
  }

  function twoSemiCirclesOutline(x, y, chosenPalette, paddingOffset, gridColor) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/><path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M30 30c0 16.569 13.432 30 30 30v-60c-16.568 0-30 13.432-30 30z"/><path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M30 30c0-16.57-13.431-30-30-30v60c16.569 0 30-13.432 30-30z"/>'
    return '<svg>' + path + '</svg>'
  }

  function twoSemiCirclesFilled(x, y, chosenPalette, paddingOffset, gridColor) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/><path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M30 30c0 16.569 13.432 30 30 30v-60c-16.568 0-30 13.432-30 30z"/><path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" stroke="'+gridColor+'" stroke-width="2" d="M30 30c0-16.57-13.431-30-30-30v60c16.569 0 30-13.432 30-30z"/>'
    return '<svg>' + path + '</svg>'
  }

  function splitCircleOutline(x, y, chosenPalette, paddingOffset, gridColor) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/><path transform="'+transform+'" d="M0 30C0 48.05 15.3348 60 30 60V0C15.3348 0 0 14.9129 0 30Z" stroke="'+gridColor+'" stroke-width="2" fill="none"/><path transform="'+transform+'" d="M60 30C60 14.9129 48.4719 0 30 0L30 60C48.4719 60 60 48.05 60 30Z" stroke="'+gridColor+'" stroke-width="2" fill="none"/>'
    return '<svg>' + path + '</svg>'
  }

  function splitCircleFilled(x, y, chosenPalette, paddingOffset, gridColor) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="none" stroke="'+gridColor+'" stroke-width="2" d="M0 0h60v60h-60z"/><path transform="'+transform+'" d="M0 30C0 48.05 15.3348 60 30 60V0C15.3348 0 0 14.9129 0 30Z" stroke="'+gridColor+'" stroke-width="2" fill="'+sample(chosenPalette.colors)+'"/><path transform="'+transform+'" d="M60 30C60 14.9129 48.4719 0 30 0L30 60C48.4719 60 60 48.05 60 30Z" stroke="'+gridColor+'" stroke-width="2" fill="none"/>'
    return '<svg>' + path + '</svg>'
  }
}