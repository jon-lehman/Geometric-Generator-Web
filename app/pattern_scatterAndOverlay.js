function patternScatterAndOverlay() {

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
    
    // Set grid stroke
    var gridColor = sample(chosenPalette.colors);

    // Set frequency based on artwork size and density
    var frequency = (rowCount * columnCount)*density;

    // Building full circles, generating arrays first to reduce duplicate coordinates.
    var fullCircleFrequency = frequency/10
    var fullCircleXList = [];
    for (var i = 0; i <= (columnCount-1); i++) {
      fullCircleXList.push(i)
    }
    var fullCircleYList = [];
    for (var i = 0; i <= (rowCount-1); i++) {
      fullCircleYList.push(i)
    }
    for (let i = 1; i < fullCircleFrequency; i++) {
      var x = sample(fullCircleXList);
      fullCircleXList.splice(x,1);
      var y = sample(fullCircleYList);
      fullCircleYList.splice(y,1);
      document.getElementById('svg').innerHTML += fullCircle(x, y, chosenPalette, paddingOffset);
    };

    // Building squares with multiply color mode
    var squareFrequency = frequency/6
    var squareXList = [];
    for (var i = 0; i <= (columnCount-1); i++) {
      squareXList.push(i)
    }
    var squareYList = [];
    for (var i = 0; i <= (rowCount-1); i++) {
      squareYList.push(i)
    }
    for (let i = 1; i < squareFrequency; i++) {
      var x = sample(squareXList);
      squareXList.splice(x,1);
      var y = sample(squareYList);
      squareYList.splice(y,1);
      document.getElementById('svg').innerHTML += square(x, y, chosenPalette, paddingOffset);
    };

    // Building quarter circles with multiply color mode
    var quarCirFrequency = frequency/6
    var quarCirXList = [];
    for (var i = 0; i <= (columnCount); i++) {
      quarCirXList.push(i)
    }
    var quarCirYList = [];
    for (var i = 0; i <= (rowCount); i++) {
      quarCirYList.push(i)
    }
    for (let i = 1; i < quarCirFrequency; i++) {
      var x = sample(quarCirXList);
      quarCirXList.splice(x,1);
      var y = sample(quarCirYList);
      quarCirYList.splice(y,1);
      document.getElementById('svg').innerHTML += quarCir(x, y, chosenPalette, paddingOffset);
    };

    // For each column
    for (let x = 0; x < columnCount; x++) {
      // For each row
      for (let y = 0; y < rowCount; y++) {
        // Build grid stroke
        document.getElementById('svg').innerHTML += grid(x, y, gridColor, paddingOffset); 
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

  function gridBackground(columnCount, rowCount, gridBackgroundColor, paddingOffset) {
    const transform = 'translate('+paddingOffset+', '+paddingOffset+')'
    const path = '<rect transform="'+transform+'" width="'+(columnCount*60)+'" height="'+(rowCount*60)+'" fill="'+gridBackgroundColor+'" />'
    return '<svg mask="url(#mask)">' + path + '</svg>'
  }

  function grid(x, y, gridColor, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset - 1) + ', ' + ((y * 60) + paddingOffset - 1) + ')';
    const path = '<path transform="' + transform + '" d="M.874.52h3.25v.5h-2.75v2.75h-.5V.52zm9.25 0h6v.5h-6v-.5zm12 0h6v.5h-6v-.5zm12 0h6v.5h-6v-.5zm12 0h6v.5h-6v-.5zm12 0h3.25v3.25h-.5V1.02h-2.75v-.5zm3.25 9.25v6h-.5v-6h.5zm-60.5 6v-6h.5v6h-.5zm0 12v-6h.5v6h-.5zm60.5-6v6h-.5v-6h.5zm-60.5 18v-6h.5v6h-.5zm60.5-6v6h-.5v-6h.5zm-60.5 18v-6h.5v6h-.5zm60.5-6v6h-.5v-6h.5zm-60.5 12h.5v2.75h2.75v.5H.874v-3.25zm60.5 0v3.25h-3.25v-.5h2.75v-2.75h.5zm-45.25 3.25h-6v-.5h6v.5zm12 0h-6v-.5h6v.5zm12 0h-6v-.5h6v.5zm12 0h-6v-.5h6v.5z" fill="' + gridColor + '" opacity="0.75"/>'
    return '<svg mask="url(#mask)">' + path + '</svg>'
  }

  function fullCircle(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<circle transform="' + transform + '"cx="60" cy="60" r="60" fill="'+sample(chosenPalette.colors)+'"/>'
    return '<svg mask="url(#mask)">' + path + '</svg>'
  }

  function square(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<rect transform="' + transform + '"width="60" height="60" fill="'+sample(chosenPalette.colors)+'"/>'
    return '<svg style="mix-blend-mode: multiply" fill-opacity=".5" mask="url(#mask)">' + path + '</svg>'
  }

  function quarCir(x, y, chosenPalette, paddingOffset) {
    const rotate = (90*getRandomInt(1,4))
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '"d="M60 60H0V0c33.137 0 60 26.863 60 60z" fill="' + sample(chosenPalette.colors) + '"/>'
    return '<svg style="mix-blend-mode: multiply" fill-opacity=".5" mask="url(#mask)">' + path + '</svg>'
  }
}