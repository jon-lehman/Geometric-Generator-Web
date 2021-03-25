function patternModgePodge() {

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
          var shapeSelection = getRandomInt(1, 9);

          // If 1 draw shadow
          if (shapeSelection === 1) {
            document.getElementById('svg').innerHTML += shadow(x, y, chosenPalette, paddingOffset);
          }

          // If 2 draw splitBox
          if (shapeSelection === 2) {
            document.getElementById('svg').innerHTML += splitBox(x, y, chosenPalette, paddingOffset);
          }

          // If 3 draw squareDots
          if (shapeSelection === 3) {
            document.getElementById('svg').innerHTML += squareDots(x, y, chosenPalette, paddingOffset);
          }

          // If 4 draw big checkers
          if (shapeSelection === 4) {
            document.getElementById('svg').innerHTML += bigCheckers(x, y, chosenPalette, paddingOffset);
          }

          // If 5 draw small checkers
          if (shapeSelection === 5) {
            document.getElementById('svg').innerHTML += smallCheckers(x, y, chosenPalette, paddingOffset);
          }

          // If 6 draw russian doll
          if (shapeSelection === 6) {
            document.getElementById('svg').innerHTML += russianDoll(x, y, chosenPalette, paddingOffset);
          }

          // If 7 draw corner
          if (shapeSelection === 7) {
            document.getElementById('svg').innerHTML += corner(x, y, chosenPalette, paddingOffset);
          }

          // If 8 draw diamond
          if (shapeSelection === 8) {
            document.getElementById('svg').innerHTML += diamond(x, y, chosenPalette, paddingOffset);
          }

          // If 9 draw grid
          if (shapeSelection === 9) {
            var anotherRoll = getRandomInt(1,3);
            if (anotherRoll === 1) {
              document.getElementById('svg').innerHTML += grid1(x, y, chosenPalette, paddingOffset);
            }
            else if (anotherRoll === 2) {
              document.getElementById('svg').innerHTML += grid2(x, y, chosenPalette, paddingOffset);
            }
            else if (anotherRoll === 3) {
              document.getElementById('svg').innerHTML += grid3(x, y, chosenPalette, paddingOffset);
            }
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

  function shadow(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length)
    var color1 = chosenPalette.colors[colorPicks[0]]
    var color2 = chosenPalette.colors[colorPicks[1]]
    var color3 = chosenPalette.colors[colorPicks[2]]
    const rotate = 90 * getRandomInt(0,3);;
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color2+'" d="M30 60H0V30l15-15 30 30-15 15z"/>'+
                  '<path transform="'+transform+'" fill="'+color3+'" d="M15 15h30v30H15z"/>'
    return '<svg>' + path + '</svg>'
  }

  function splitBox(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color2+'" d="M0 30h60v30H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color3+'" d="M15 15h30v30H15z"/>'
    return '<svg>' + path + '</svg>'
  }

  function squareDots(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    var colorArray = [color2, color3, color4];
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M12 12h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M22 12h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M32 12h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M42 12h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M12 22h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M22 22h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M32 22h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M42 22h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M12 32h5v5h-5zM22 32h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M32 32h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M42 32h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M12 42h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M22 42h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M32 42h5v5h-5z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M42 42h5v5h-5z"/>'
    return '<svg>' + path + '</svg>'
  }

  function bigCheckers(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M60 0v30H30V0z"/>'+
                  '<path transform="'+transform+'" fill="'+color2+'" d="M30 0v30H0V0z"/>'+
                  '<path transform="'+transform+'" fill="'+color3+'" d="M60 30v30H30V30z"/>'+
                  '<path transform="'+transform+'" fill="'+color4+'" d="M30 30v30H0V30z"/>'
    return '<svg>' + path + '</svg>'
  }

  function smallCheckers(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    var colorArray = [color2, color3, color4];
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M0 0h15v15H0z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M15 15h15v15H15z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M45 15h15v15H45z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M30 0h15v15H30z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M0 30h15v15H0z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M15 45h15v15H15z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M45 45h15v15H45z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M30 30h15v15H30z"/>'
    return '<svg>' + path + '</svg>'
  }

  function russianDoll(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color2+'" d="M8 7h45v45H8z"/>'+
                  '<path transform="'+transform+'" fill="'+color3+'" d="M16 14h30v30H16z"/>'+
                  '<path transform="'+transform+'" fill="'+color4+'" d="M23 22h15v15H23z"/>'
    return '<svg>' + path + '</svg>'
  }

  function corner(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color2+'" d="M0 15h45v45H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color3+'" d="M0 30h30v30H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color4+'" d="M0 45h15v15H0z"/>'
    return '<svg>' + path + '</svg>'
  }

  function diamond(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ')';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color2+'" d="M0 30L30 0l30 30-30 30z"/>'+
                  '<path transform="'+transform+'" fill="'+color3+'" d="M15 15h30v30H15z"/>'
    return '<svg>' + path + '</svg>'
  }

  function grid1(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    var colorArray = [color3, color4];
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color2+'" clip-rule="evenodd" fill-rule="evenodd" d="M9.5 9.5v41h41v-41h-41zm40 30v-9h-9v9h9zm-10 0v-9h-9v9h9zm10 1h-9v9h9v-9zm-10 9v-9h-9v9h9zm10-20h-9v-9h9v9zm-10-9v9h-9v-9h9zm10-1v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 21v9h-9v-9h9zm0-10v9h-9v-9h9zm0-1v-9h-9v9h9zm-9-10h9v-9h-9v9zm-1 20v-9h-9v9h9zm0 10v-9h-9v9h9zm0-29v9h-9v-9h9zm0-1h-9v-9h9v9z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M13 23h4v4h-4z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M33 33h4v4h-4z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M23 43h4v4h-4zM43 13h4v4h-4z"/>'
    return '<svg>' + path + '</svg>'
  }

  function grid2(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    var colorArray = [color3, color4];
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color2+'" clip-rule="evenodd" fill-rule="evenodd" d="M9.5 9.5v41h41v-41h-41zm40 30v-9h-9v9h9zm-10 0v-9h-9v9h9zm10 1h-9v9h9v-9zm-10 9v-9h-9v9h9zm10-20h-9v-9h9v9zm-10-9v9h-9v-9h9zm10-1v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 21v9h-9v-9h9zm0-10v9h-9v-9h9zm0-1v-9h-9v9h9zm-9-10h9v-9h-9v9zm-1 20v-9h-9v9h9zm0 10v-9h-9v9h9zm0-29v9h-9v-9h9zm0-1h-9v-9h9v9z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M23 37v-4h4v4z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M43 17v-4h4v4z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M33 17v-4h4v4z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M43 47v-4h4v4z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M13 47v-4h4v4z"/>'
    return '<svg>' + path + '</svg>'
  }

  function grid3(x, y, chosenPalette, paddingOffset) {
    var colorPicks = getRandomArray(0, chosenPalette.colors.length);
    var color1 = chosenPalette.colors[colorPicks[0]];
    var color2 = chosenPalette.colors[colorPicks[1]];
    var color3 = chosenPalette.colors[colorPicks[2]];
    var color4 = chosenPalette.colors[colorPicks[3]];
    var colorArray = [color3, color4];
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<path transform="'+transform+'" fill="'+color1+'" d="M0 0h60v60H0z"/>'+
                  '<path transform="'+transform+'" fill="'+color2+'" clip-rule="evenodd" fill-rule="evenodd" d="M9.5 9.5v41h41v-41h-41zm40 30v-9h-9v9h9zm-10 0v-9h-9v9h9zm10 1h-9v9h9v-9zm-10 9v-9h-9v9h9zm10-20h-9v-9h9v9zm-10-9v9h-9v-9h9zm10-1v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 21v9h-9v-9h9zm0-10v9h-9v-9h9zm0-1v-9h-9v9h9zm-9-10h9v-9h-9v9zm-1 20v-9h-9v9h9zm0 10v-9h-9v9h9zm0-29v9h-9v-9h9zm0-1h-9v-9h9v9z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M47 33v4h-4v-4z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M17 43v4h-4v-4z"/>'+
                  '<path transform="'+transform+'" fill="'+sample(colorArray)+'" d="M27 23v4h-4v-4z"/>'
    return '<svg>' + path + '</svg>'
  }
}