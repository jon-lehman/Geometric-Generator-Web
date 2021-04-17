function patternKnickKnacks() {

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

          // IF 0 draw a dense sunburst
          if (shapeSelection === 0) {
            document.getElementById('svg').innerHTML += sunBurstDense(x, y, chosenPalette, paddingOffset);
          }

          // IF 1 draw an open eye
          if (shapeSelection === 1) {
            document.getElementById('svg').innerHTML += eyeOpen(x, y, chosenPalette, paddingOffset);
          }

          // IF 2 draw four triangles
          if (shapeSelection === 2) {
            document.getElementById('svg').innerHTML += fourTriangles(x, y, chosenPalette, paddingOffset);
          }

          // IF 3 draw four triangles
          if (shapeSelection === 3) {
            document.getElementById('svg').innerHTML += rainDrop(x, y, chosenPalette, paddingOffset);
          }

          // IF 4 draw a half circle and a full circle
          if (shapeSelection === 4) {
            document.getElementById('svg').innerHTML += halfAndFullCircle(x, y, chosenPalette, paddingOffset);
          }

          // IF 5 draw circle behind bars
          if (shapeSelection === 5) {
            document.getElementById('svg').innerHTML += circleBehindBars(x, y, chosenPalette, paddingOffset);
          }

          // IF 6 draw checkered triangles
          if (shapeSelection === 6) {
            document.getElementById('svg').innerHTML += checkeredTriangles(x, y, chosenPalette, paddingOffset);
          }

          // IF 7 draw sunburst light
          if (shapeSelection === 7) {
            document.getElementById('svg').innerHTML += sunburstLight(x, y, chosenPalette, paddingOffset);
          }

          // IF 8 draw two triangles
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

  function sunBurstDense(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length)
    var color1 = chosenPalette.colors[colorPicks[0]]
    var color2 = chosenPalette.colors[colorPicks[1]]
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="' + transform + '" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="' + transform + '" fill="'+color2+'" d="M30.867 4h-1.734v19.415L24.108 4.662l-1.674.448 5.026 18.757L17.75 7.05l-1.5.867 9.708 16.815-13.73-13.73-1.226 1.226 13.73 13.73L7.917 16.25l-.867 1.5 16.816 9.709L5.11 22.433l-.448 1.675 18.755 5.025H4v1.734h19.417L4.662 35.892l.449 1.674 18.755-5.025L7.05 42.25l.867 1.5 16.815-9.708-13.73 13.73 1.226 1.226 13.73-13.73-9.708 16.815 1.5.867 9.71-16.815-5.026 18.755 1.674.448 5.025-18.755V56h1.734V36.581l5.026 18.757 1.674-.448-5.025-18.754 9.707 16.814 1.502-.867-9.709-16.815 13.73 13.73 1.226-1.226-13.73-13.73 16.816 9.709.866-1.502-16.816-9.708 18.756 5.025.448-1.674-18.755-5.025H56v-1.734H36.583l18.756-5.025-.449-1.674-18.756 5.025 16.816-9.708-.867-1.502-16.815 9.709 13.73-13.73-1.226-1.226-13.73 13.73 9.709-16.815-1.501-.867-9.71 16.816L37.567 5.11l-1.674-.448-5.025 18.755V4z"/>'
    return '<svg>' + path + '</svg>'
  }

  function eyeOpen(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length)
    var color1 = chosenPalette.colors[colorPicks[0]]
    var color2 = chosenPalette.colors[colorPicks[1]]
    var color3 = chosenPalette.colors[colorPicks[2]]
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = ' <path transform="' + transform + '" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="' + transform + '" fill="'+color2+'" d="M49 29.5C49 32.74 43.439 42 30 42s-19-9.26-19-12.5S16.561 17 30 17s19 9.26 19 12.5z"/><circle transform="' + transform + '" cx="30" cy="30" r="7" fill="'+color3+'"/>'
    return '<svg>' + path + '</svg>'
  }

  function fourTriangles(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    var colorArray = [color2, color3, color4];
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M4 30h26L4 4v26z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M4 56h26L4 30v26zM30 30h26L30 4v26z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M30 56h26L30 30v26z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M30 56h26L30 30v26z"/>'
    return '<svg>' + path + '</svg>'
  }

  function rainDrop(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length)
    var color1 = chosenPalette.colors[colorPicks[0]]
    var color2 = chosenPalette.colors[colorPicks[1]]
    const rotate = 180 * getRandomInt(0,1);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="'+transform+'" fill="'+color2+'" d="M40 36c0 5.523-4.477 10-10 10s-10-4.477-10-10 9-22 10-22 10 16.477 10 22z"/>'
    return '<svg>' + path + '</svg>'
  }

  function halfAndFullCircle(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length)
    var color1 = chosenPalette.colors[colorPicks[0]]
    var color2 = chosenPalette.colors[colorPicks[1]]
    var color3 = chosenPalette.colors[colorPicks[2]]
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="'+transform+'" fill="'+color2+'" d="M30 49c8.284 0 15-6.716 15-15H15c0 8.284 6.716 15 15 15z"/><circle transform="'+transform+'" cx="30" cy="21" r="9" fill="'+color3+'"/>'
    return '<svg>' + path + '</svg>'
  }

  function circleBehindBars(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length)
    var color1 = chosenPalette.colors[colorPicks[0]]
    var color2 = chosenPalette.colors[colorPicks[1]]
    var color3 = chosenPalette.colors[colorPicks[2]]
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/><circle transform="'+transform+'" cx="30" cy="30" r="13" fill="'+color2+'"/><path transform="'+transform+'" fill="'+color3+'" d="M20 10h2v40h-2zM29 10h2v40h-2zM38 10h2v40h-2z"/>'
    return '<svg>' + path + '</svg>'
  }

  function doubleSunSet(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length)
    var color1 = chosenPalette.colors[colorPicks[0]]
    var color2 = chosenPalette.colors[colorPicks[1]]
    var color3 = chosenPalette.colors[colorPicks[2]]
    var color4 = chosenPalette.colors[colorPicks[3]]
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="'+transform+'" fill="'+color2+'" d="M0 0h60v30H0z"/><path transform="'+transform+'" fill="'+color3+'" d="M30 45c8.284 0 15-6.716 15-15H15c0 8.284 6.716 15 15 15z"/><path transform="'+transform+'" fill="'+color4+'" d="M30 15c-8.284 0-15 6.716-15 15h30c0-8.284-6.716-15-15-15z"/>'
    return '<svg>' + path + '</svg>'
  }

  function eyeClosed(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length)
    var color1 = chosenPalette.colors[colorPicks[0]]
    var color2 = chosenPalette.colors[colorPicks[1]]
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="'+transform+'" fill="'+color2+'" d="M30 41c-6.473 0-10.988-2.224-13.877-4.783-1.45-1.285-2.493-2.657-3.169-3.88-.69-1.248-.954-2.263-.954-2.837h-2c0 1.046.43 2.404 1.204 3.804.073.133.15.268.231.403L5.5 37.134l1 1.732 6.073-3.506c.622.793 1.362 1.59 2.224 2.354a19.622 19.622 0 003.634 2.54l-3.297 5.71 1.732 1 3.37-5.837c2.444 1.04 5.354 1.741 8.764 1.856V50h2v-7.017c3.41-.115 6.32-.816 8.764-1.856l3.37 5.837 1.732-1-3.297-5.71a19.621 19.621 0 003.634-2.54 17.98 17.98 0 002.201-2.326l6.024 3.478 1-1.732-5.882-3.396c.088-.146.171-.29.25-.434C49.57 31.904 50 30.546 50 29.5h-2c0 .574-.265 1.589-.954 2.837-.676 1.223-1.719 2.595-3.17 3.88C40.989 38.777 36.474 41 30 41z"/>'
    return '<svg>' + path + '</svg>'
  }

  function checkeredTriangles(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    var colorArray = [color2, color3, color4];
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M15 0L0 15h30L15 0z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M45 0L30 15h30L45 0z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M15 30L0 45h30L15 30z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M45 30L30 45h30L45 30z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M30 15L15 30h30L30 15z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M30 45L15 60h30L30 45z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M60 45L45 60h15V45z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M60 15L45 30h15V15z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M0 45l15 15H0V45z"/><path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M0 15l15 15H0V15z"/>'
    return '<svg>' + path + '</svg>'
  }

  function sunburstLight(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="'+transform+'" fill="'+color2+'" d="M30.867 4h-1.734v22.765L17.75 7.05l-1.5.867 11.382 19.715L7.917 16.25l-.867 1.502 19.715 11.382H4v1.734h22.766L7.05 42.249l.867 1.502 19.715-11.383L16.25 52.083l1.502.867 11.382-19.715V56h1.734V33.234L42.249 52.95l1.502-.867-11.383-19.715L52.083 43.75l.867-1.502-19.716-11.382H56v-1.734H33.234L52.95 17.751l-.867-1.502-19.715 11.383L43.75 7.917l-1.502-.867-11.382 19.716V4z"/>'
    return '<svg>' + path + '</svg>'
  }

  function twoTriangles(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    const rotate = 90 * getRandomInt(0,1);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/><path transform="'+transform+'" fill="'+color2+'" d="M4 56h52L30 30 4 56z"/><path transform="'+transform+'" fill="'+color3+'" d="M56 4H4l26 26L56 4z"/>'
    return '<svg>' + path + '</svg>'
  }
}