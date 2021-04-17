function patternDeco() {

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

      //If column is odd
      if (x & 1) {

        // For each row
        for (let y = 0; y < rowCount; y++) {

          // Check density
          if (Math.random() < density) {

            // If row is odd
            if (y & 1) {
              document.getElementById('svg').innerHTML += closed(x, y, chosenPalette, paddingOffset);
            }
            // If row is even
            else {
              document.getElementById('svg').innerHTML += open(x, y, chosenPalette, paddingOffset);
            }

          }
        }

      }
      // If column is even
      else {

        // For each row
        for (let y = 0; y < rowCount; y++) {

          // Check density
          if (Math.random() < density) {

            // If row is odd
            if (y & 1) {
              document.getElementById('svg').innerHTML += open(x, y, chosenPalette, paddingOffset);
            }
            // If row is even
            else {
              document.getElementById('svg').innerHTML += closed(x, y, chosenPalette, paddingOffset);
            }
          }
          
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

  function closed(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M.87 31.883l-.003-.052a30.504 30.504 0 01.003-2.948C1.627 13.508 13.958 1.177 29.333.419a30.266 30.266 0 013 0c15.375.758 27.706 13.089 28.463 28.463l.003.053a30.499 30.499 0 01-.003 2.948c-.757 15.374-13.088 27.706-28.463 28.463l-.052.002a30.501 30.501 0 01-2.948-.002C13.958 59.589 1.627 47.257.87 31.883zm28.302 25.45c-1.416-13.304-11.985-23.874-25.289-25.29.825 13.59 11.7 24.465 25.289 25.29zm3.322 0c13.589-.825 24.464-11.7 25.289-25.29C44.479 33.46 33.91 44.03 32.494 57.334zM57.783 28.72c-.825-13.588-11.7-24.463-25.289-25.288C33.91 16.736 44.48 27.306 57.783 28.72zM29.172 3.433c-13.589.825-24.464 11.7-25.289 25.288 13.304-1.415 23.873-11.985 25.289-25.288zm1.661 6.582a31.577 31.577 0 01-20.367 20.368A31.577 31.577 0 0130.832 50.75 31.577 31.577 0 0151.2 30.383a31.577 31.577 0 01-20.367-20.368z" clip-rule="evenodd"/>'
    return '<svg name="plus">' + path + '</svg>'
  }

  function open(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" transform="'+transform+'" fill-rule="evenodd" clip-rule="evenodd" d="M60.763.383l.002.035.035.002v3.004l-.039-.002c-.637 12.613-9.065 23.172-20.568 26.96 11.503 3.79 19.93 14.348 20.568 26.962l.04-.002v3.004l-.036.001-.002.036h-3.004l.002-.04c-12.613-.637-23.172-9.064-26.96-20.567-3.79 11.503-14.349 19.93-26.962 20.567l.002.04H.837l-.002-.036-.035-.002v-3.004l.04.002c.636-12.613 9.064-23.171 20.567-26.96C9.904 26.593 1.477 16.035.839 3.422L.8 3.424V.42L.835.418.837.383h3.004L3.84.42C16.453 1.06 27.011 9.486 30.8 20.99 34.59 9.487 45.148 1.06 57.761.422l-.002-.04h3.004zm-3.006 3.043c-13.683.772-24.642 11.73-25.413 25.413 13.682-.771 24.641-11.73 25.413-25.413zm-25.413 28.5c.77 13.683 11.73 24.642 25.413 25.413-.772-13.682-11.73-24.642-25.413-25.413zm-28.5-28.5c.77 13.683 11.73 24.642 25.413 25.413-.771-13.683-11.73-24.642-25.413-25.413zm0 53.913c13.682-.771 24.642-11.73 25.413-25.413-13.683.771-24.642 11.73-25.413 25.413z"/>'
    return '<svg name="cross">' + path + '</svg>'
  }
}