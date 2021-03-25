function patternHourGlass() {

  // Trigger artwork generation on page load
  document.addEventListener("DOMContentLoaded", initializeArtwork())

  function initializeArtwork() {

    // Clear Artwork
    document.getElementById('svg').innerHTML = ""

    // Setting basic variables
    var svg = document.getElementById('svg');
    var rowCount = localStorage.getItem('rowCount');
    var columnCount = localStorage.getItem('columnCount');
    var artworkWidth = columnCount *120;
    var artworkHeight = rowCount * 120;
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
          var shapeSelection = getRandomInt(0, 2);

          // IF 0 draw a vertical hour glass
          if (shapeSelection === 0) {
            document.getElementById('svg').innerHTML += verticalHourGlass(x, y, chosenPalette, paddingOffset);
          } 

          // If 1 draw horizontal hour glass
          else if (shapeSelection === 1) {
            document.getElementById('svg').innerHTML += horizontalHourGlass(x, y, chosenPalette, paddingOffset);
          }

          // If 2 draw circle
          else if (shapeSelection === 2) {
            document.getElementById('svg').innerHTML += circle(x, y, chosenPalette, paddingOffset);
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
    const path = '<rect transform="'+transform+'" width="'+(columnCount*120)+'" height="'+(rowCount*120)+'" fill="white" />'
    return  '<mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">' + 
                path + 
              '</mask>'
  }

  function verticalHourGlass(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 120) + paddingOffset) + ', ' + ((y * 120) + paddingOffset) + ')';
    const path = '<path transform="' + transform + '" d="M59.985 60C26.855 59.992 0 33.132 0 0h120c0 33.132-26.855 59.992-59.985 60C93.145 60.008 120 86.868 120 120H0c0-33.132 26.855-59.992 59.985-60z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function horizontalHourGlass(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 120) + paddingOffset) + ', ' + ((y * 120) + paddingOffset) + ')';
    const path = '<path transform="' + transform + '" d="M60 59.985C60.008 26.855 86.868 0 120 0v120c-33.132 0-59.992-26.855-60-59.985C59.992 93.145 33.132 120 0 120V0c33.132 0 59.992 26.855 60 59.985z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function circle(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 120) + paddingOffset) + ', ' + ((y * 120) + paddingOffset) + ')';
    const path = '<circle transform="' + transform + '" cx="60" cy="60" r="60" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

}