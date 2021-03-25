function patternCollage() {
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
          var shapeSelection = getRandomInt(0, 4);

          // IF 0 draw a quarter Circle
          if (shapeSelection === 0) {
            document.getElementById('svg').innerHTML += quarCir(x, y, chosenPalette, paddingOffset);
          } 
          
          // If 1 draw square
          else if (shapeSelection === 1) {
            document.getElementById('svg').innerHTML += square(x, y, chosenPalette, paddingOffset);
          }
          
          // If 2 draw circle
          else if (shapeSelection === 2) {
            document.getElementById('svg').innerHTML += circle(x, y, chosenPalette, paddingOffset);
          }
          
          // If 3 draw Quarter Circle inside of a Square
          else if (shapeSelection === 3) {
            document.getElementById('svg').innerHTML += quarCirInSqu(x, y, chosenPalette, paddingOffset);
          }
          
          // If 4 draw a Circle inside of a Square
          else if (shapeSelection === 4) {
            document.getElementById('svg').innerHTML += cirInSqu(x, y, chosenPalette, paddingOffset);
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

  function quarCir(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * Math.floor(Math.random() * 4);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" d="M0 60C33.1371 60 60 33.1371 60 5.24537e-06L5.24537e-06 0L0 60Z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }

  function square(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="' + transform + '" d="M0 0h60v60H0z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>';
  }

  function circle(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const circle = '<circle cx="30" cy="30" r="30" transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + circle + '</svg>';
  }

  function quarCirInSqu(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * Math.floor(Math.random() * 4);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M60 0v60H0V0z"/><path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M60 0v60H0C0 26.863 26.863 0 60 0z"/>'
    return '<svg>' + path + '</svg>'
  }

  function cirInSqu(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * Math.floor(Math.random() * 4);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '" d="M0 0h60v60H0z"/><circle cx="30" cy="30" r="30" transform="' + transform + '" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg>' + path + '</svg>'
  }
}