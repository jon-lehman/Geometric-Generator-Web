function patternBeacon() {

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

    // Make background transparent
    document.getElementById('svg').setAttribute('style', 'fill:none')

    //Create Outside Border
    document.getElementById('svg').innerHTML += '<svg><rect x="'+(paddingOffset-.75)+'" y="'+(paddingOffset-.75)+'" width="'+((columnCount*60)+1.5)+'" height="'+((rowCount*60)+1.5)+'" stroke="'+gridColor+'" stroke-width="1.5"/></svg>'

    // For each column
    for (let x = 0; x < columnCount; x++) {
      // For each row
      for (let y = 0; y < rowCount; y++) {
        // Check density
        if (Math.random() < density) {

          // Randomly select artwork type
          var shapeSelection = getRandomInt(0, 4);

          // IF 0 draw a Semi Circle
          if (shapeSelection === 0) {
            document.getElementById('svg').innerHTML += semiCircle(x, y, chosenPalette, paddingOffset);
          }

          // IF 1 draw a straight bars
          if (shapeSelection === 1) {
            document.getElementById('svg').innerHTML += straightBars(x, y, chosenPalette, paddingOffset);
          }

          // IF 2 drasw diagnal bars
          if (shapeSelection === 2) {
            document.getElementById('svg').innerHTML += diagnalBars(x, y, chosenPalette, paddingOffset);
          }

          // IF 3 draw quarter circle
          if (shapeSelection === 3) {
            document.getElementById('svg').innerHTML += quarterCircle(x, y, chosenPalette, paddingOffset);
          }

          // IF 4 draw filled square
          if (shapeSelection === 4) {
            document.getElementById('svg').innerHTML += filled(x, y, chosenPalette, paddingOffset);
          }
        }
        
        // If density doesn't clear
        else {
          // do nothing
        }

        // Draw border around each grid square
        document.getElementById('svg').innerHTML += border(x, y, paddingOffset, gridColor);

      }
    }
  }

  function mask(columnCount, rowCount, paddingOffset) {
    const transform = 'translate('+(paddingOffset-2)+', '+(paddingOffset-2)+')'
    const path = '<rect transform="'+transform+'" width="'+((columnCount*60)+4)+'" height="'+((rowCount*60)+4)+'" fill="white" />'
    return  '<mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">' + 
                path + 
              '</mask>'
  }

  function border(x, y, paddingOffset, gridColor) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" stroke="'+gridColor+'" fill="none" stroke-width="1.5" d="M.753.752H59.25v58.5H.753z"/>'
    return '<svg>' + path + '</svg>'
  }

  function semiCircle(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M59.5 11.218V7.74A59.602 59.602 0 0037.782.5H22.218A59.602 59.602 0 00.5 7.74v3.478C9.106 6.002 19.202 3 30 3c10.798 0 20.894 3.002 29.5 8.218zm0 8.408A49.775 49.775 0 0030 10 49.775 49.775 0 00.5 19.626v3.783A46.803 46.803 0 0130 13a46.803 46.803 0 0129.5 10.409v-3.783zm0 13.36C52.187 25.004 41.678 20 30 20S7.813 25.004.5 32.986v4.678C7.256 28.754 17.956 23 30 23s22.744 5.755 29.5 14.664v-4.678zm0 21.53C56.923 40.567 44.696 30 30 30S3.077 40.566.5 54.517V59.5h2.505C3.27 44.819 15.255 33 30 33c14.745 0 26.729 11.819 26.995 26.5H59.5v-4.983zM49.994 59.5C49.728 48.685 40.879 40 30 40c-10.878 0-19.729 8.685-19.994 19.5h3.001C13.272 50.342 20.778 43 30 43c9.222 0 16.728 7.342 16.993 16.5h3zm-10.006 0C39.728 54.21 35.355 50 30 50c-5.355 0-9.727 4.21-9.988 9.5h3.006a7 7 0 0113.964 0h3.006z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function straightBars(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M8.5.5h3v59h-3V.5zM18.5.5h3v59h-3V.5zM31.5.5h-3v59h3V.5zM38.5.5h3v59h-3V.5zM51.5.5h-3v59h3V.5z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function diagnalBars(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M5.072.5H.83L.5.83v4.242L5.072.5zM.5 19.214v-4.242L14.972.5h4.242L.5 19.214zm0 14.142v-4.242L29.114.5h4.242L.5 33.356zM.5 47.5v-4.243L43.256.5H47.5L.5 47.499zM2.64 59.5H.5v-2.102L57.398.5H59.5v2.14L2.64 59.5zm14.143 0H12.54L59.5 12.54v4.243L16.783 59.5zm14.142 0h-4.242L59.5 26.683v4.242L30.925 59.5zm14.142 0h-4.242L59.5 40.825v4.242L45.067 59.5zm14.143 0h-4.243l4.533-4.533v4.243l-.29.29z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function quarterCircle(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length)
    var color1 = chosenPalette.colors[colorPicks[0]]
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M11.122.5h-4.6A80.499 80.499 0 00.5 6.522v4.6A77.464 77.464 0 0111.122.5zM.5 29.168v-6.061A70.364 70.364 0 0123.107.5h6.06A67.297 67.297 0 00.5 29.168z"/>'+
                '<path transform="'+transform+'" fill="'+color1+'" d="M3.002 59.5H.5v-7.282C3.985 25.305 25.305 3.985 52.218.5H59.5v2.502C28.416 3.27 3.27 28.417 3.002 59.5z"/>'+
                '<path transform="'+transform+'" fill="'+color1+'" d="M13.003 59.5h-3c.266-27.218 22.28-49.23 49.497-49.498v3C33.94 13.27 13.269 33.94 13.003 59.5z"/>'+
                '<path transform="'+transform+'" fill="'+color1+'" d="M23.003 59.5h-3C20.27 37.805 37.805 20.269 59.5 20.003v3c-20.038.266-36.231 16.46-36.497 36.497z"/>'+
                '<path transform="'+transform+'" fill="'+color1+'" d="M33.005 59.5h-3c.263-16.172 13.323-29.232 29.495-29.496v3c-14.515.264-26.232 11.981-26.495 26.496z"/>'+
                '<path transform="'+transform+'" fill="'+color1+'" d="M43.007 59.5h-3c.26-10.648 8.845-19.233 19.493-19.494v3.001c-8.992.26-16.233 7.502-16.493 16.493zM53.018 59.5h-3.006a10 10 0 019.488-9.488v3.006a7.001 7.001 0 00-6.482 6.482z"/>'
    return '<svg>' + path + '</svg>'
  }

  function filled(x, y, chosenPalette, paddingOffset) {
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"d="M.5.5h59v59H.5z"/>'
    return '<svg>' + path + '</svg>'
  }
}