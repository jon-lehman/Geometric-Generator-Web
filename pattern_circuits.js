function patternCircuits() {

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
    buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density, backgroundColor);
  }

  // Build each grid item (artwork)
  function buildArtwork(columnCount, rowCount, chosenPalette, paddingOffset, density, backgroundColor) {

    // Create Mask
    document.getElementById('svg').innerHTML += mask(columnCount, rowCount, paddingOffset)
    console.log(chosenPalette.colors);
    // For each column
    for (let x = 0; x < columnCount; x++) {
      // For each row
      for (let y = 0; y < rowCount; y++) {
        // Check density
        if (Math.random() < density) {

          // Randomly select artwork type
          var shapeSelection = getRandomInt(0, 8);

          // IF 0 draw a quarter Circle
          if (shapeSelection <= 6) {
            document.getElementById('svg').innerHTML += quarCir(x, y, chosenPalette, paddingOffset);
          } 
          
          // If 1 draw quarter circle with transparent stripes
          else if (shapeSelection === 7) {
            document.getElementById('svg').innerHTML += quarCirWithHoleStripes(x, y, chosenPalette, paddingOffset, backgroundColor);
          }
          
          // If 2 draw quarter circle with solid stripes
          else if (shapeSelection === 8) {
            document.getElementById('svg').innerHTML += quarCirWithSolidStripes(x, y, chosenPalette, paddingOffset);
          }
          
        }
        
        // If density doesn't clear
        else {
          // do nothing
        }
      }
    }

    // Set frequency based on artwork size and density
    var frequency = (rowCount * columnCount)*density;

    // Creating double stripes overlay with frequency smarts
    var doubleStripesFrequency = frequency/8
    var doubleStripesXList = [];
    for (var i = 0; i <= (columnCount-1); i++) {
      doubleStripesXList.push(i)
    }
    var doubleStripesYList = [];
    for (var i = 0; i <= (rowCount-2); i++) {
      doubleStripesYList.push(i)
    }
    for (let i = 1; i < doubleStripesFrequency; i++) {
      var x = sample(doubleStripesXList);
      doubleStripesXList.splice(x,1);
      var y = sample(doubleStripesYList);
      doubleStripesYList.splice(y,1);
      document.getElementById('svg').innerHTML += doubleStripes(x, y, chosenPalette, paddingOffset);
    };

    // Creating stripe and curves overlay with frequency smarts
    var stripesAndCurveFrequency = frequency/8
    var stripesAndCurveXList = [];
    for (var i = 0; i <= (columnCount-1); i++) {
      stripesAndCurveXList.push(i)
    }
    var stripesAndCurveYList = [];
    for (var i = 0; i <= (rowCount-2); i++) {
      stripesAndCurveYList.push(i)
    }
    for (let i = 1; i < stripesAndCurveFrequency; i++) {
      var x = sample(stripesAndCurveXList);
      stripesAndCurveXList.splice(x,1);
      var y = sample(stripesAndCurveYList);
      stripesAndCurveYList.splice(y,1);
      document.getElementById('svg').innerHTML += stripesAndCurve(x, y, chosenPalette, paddingOffset);
    };

  }

  function mask(columnCount, rowCount, paddingOffset) {
    const transform = 'translate('+paddingOffset+', '+paddingOffset+')'
    const path = '<rect transform="'+transform+'" width="'+(columnCount*60)+'" height="'+(rowCount*60)+'" fill="white" />'
    return  '<mask id="mask" mask-type="alpha" maskUnits="userSpaceOnUse">' + 
                path + 
              '</mask>'
  }

  function quarCir(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * Math.floor(Math.random() * 3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<g name="quarCir" mask="url(#mask)">'+
                    '<path transform="' + transform + '" d="M0 60C33.1371 60 60 33.1371 60 5.24537e-06L5.24537e-06 0L0 60Z" fill="' + sample(chosenPalette.colors) + '"/>'+
                  '</g>'
    return path;
  }

  function quarCirWithHoleStripes(x, y, chosenPalette, paddingOffset, backgroundColor) {
    const rotate = 90 * getRandomInt(1,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<g name="quarCirWithHoleStripes" mask="url(#mask)">'+
                    '<path fill="'+backgroundColor+'" transform="'+transform+'" fill-rule="evenodd" d="M0,0H60V60A60,60,0,0,1,0,0Z"/>'+
                    '<path fill="' + sample(chosenPalette.colors) + '" transform="'+transform+'" fill-rule="evenodd" d="M48,0H42A18,18,0,0,0,60,18V12A12,12,0,0,1,48,0Zm4,0a8,8,0,0,0,2.34,5.66A8,8,0,0,0,60,8V0ZM32,0h6A22,22,0,0,0,60,22v6A28,28,0,0,1,32,0ZM28,0H22A38,38,0,0,0,60,38V32A32,32,0,0,1,28,0ZM12,0h6A42,42,0,0,0,60,42v6A48,48,0,0,1,12,0ZM8,0H0A60,60,0,0,0,60,60V52A52,52,0,0,1,8,0Z"/>'+
                  '</g>'
    return path;
  }

  function quarCirWithSolidStripes(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(1,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path =  '<g name="quarCirWithHoleStripes" mask="url(#mask)">'+
                    '<path fill="'+sample(chosenPalette.colors)+'" transform="'+transform+'" fill-rule="evenodd" d="M0,0H60V60A60,60,0,0,1,0,0Z"/>'+
                    '<path fill="'+sample(chosenPalette.colors)+'" transform="'+transform+'" fill-rule="evenodd" d="M48,0H42A18,18,0,0,0,60,18V12A12,12,0,0,1,48,0Zm4,0a8,8,0,0,0,2.34,5.66A8,8,0,0,0,60,8V0ZM32,0h6A22,22,0,0,0,60,22v6A28,28,0,0,1,32,0ZM28,0H22A38,38,0,0,0,60,38V32A32,32,0,0,1,28,0ZM12,0h6A42,42,0,0,0,60,42v6A48,48,0,0,1,12,0ZM8,0H0A60,60,0,0,0,60,60V52A52,52,0,0,1,8,0Z"/>'+
                  '</g>'
    return path;
  }

  function doubleStripes(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,1);
    var color = sample(chosenPalette.colors)
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset - .5) + ') rotate(' + rotate + ')';
    const path =  '<g name="doubleStripes" mask="url(#mask)" style="mix-blend-mode: multiply">'+
                    '<rect transform="'+transform+'" width="60" height="120" fill="none" />'+
                    '<path transform="'+transform+'" fill="'+color+'" d="M48.0004 120.462H52.0004L52.0004 0.461672L48.0004 0.461672L48.0004 120.462Z"/>'+
                    '<path transform="'+transform+'" fill="'+color+'" d="M38.0004 0.461671L38.0004 120.462H42.0004L42.0004 0.461671L38.0004 0.461671Z"/>'+
                    '<path transform="'+transform+'" fill="'+color+'" d="M28.0004 0.461671L32.0004 0.461671L32.0004 120.462H28.0004L28.0004 0.461671Z"/>'+
                    '<path transform="'+transform+'" fill="'+color+'" d="M18.0004 0.46167L18.0004 120.462H22.0004L22.0004 0.461671L18.0004 0.46167Z"/>'+
                    '<path transform="'+transform+'" fill="'+color+'" d="M8.00037 0.46167L8.00037 120.462H12.0004L12.0004 0.46167L8.00037 0.46167Z"/>'+
                  '</g>'
    return path;
  }

  function stripesAndCurve(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,1);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset - .5) + ') rotate(' + rotate + ')';
    const path =  '<g name="stripesAndCurve" mask="url(#mask)" fill="' + sample(chosenPalette.colors) + '" style="mix-blend-mode: multiply">'+
                    '<rect transform="'+transform+'" width="60" height="120" fill="none" />'+
                    '<path transform="'+transform+'" d="M8 0L8 60C8 88.7189 31.2812 112 60 112V108C33.4903 108 12 86.5098 12 60L12 0H8Z" />'+
                    '<path transform="'+transform+'" d="M18 0L18 60C18 83.196 36.804 102 60 102V98C39.0132 98 22 80.9869 22 60L22 0H18Z" />'+
                    '<path transform="'+transform+'" d="M28 60L28 0H32L32 60C32 75.464 44.536 88 60 88V92C42.3269 92 28 77.6732 28 60Z" />'+
                    '<path transform="'+transform+'" d="M38 0L38 60C38 72.1503 47.8497 82 60 82L60 78C50.0589 78 42 69.9412 42 60L42 0H38Z" />'+
                    '<path transform="'+transform+'" d="M48 60L48 0H52L52 60C52 64.4183 55.5817 68 60 68V72C53.3726 72 48 66.6274 48 60Z" />'+
                  '</g>'
    return path;
  }
}