function patternStreamers() {

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

        // Randomly select artwork type
        var shapeSelection = getRandomInt(0, 11);

        // IF 0 draw a streamer set1
        if (shapeSelection === 0) {
          document.getElementById('svg').innerHTML += streamerSet0(x, y, chosenPalette, paddingOffset);
        }

        // IF 1 draw a streamer set1
        if (shapeSelection === 1) {
          document.getElementById('svg').innerHTML += streamerSet1(x, y, chosenPalette, paddingOffset);
        }

        // IF 2 draw a streamer set2
        if (shapeSelection === 2) {
          document.getElementById('svg').innerHTML += streamerSet2(x, y, chosenPalette, paddingOffset);
        }

        // IF 3 draw a streamer set3
        if (shapeSelection === 3) {
          document.getElementById('svg').innerHTML += streamerSet3(x, y, chosenPalette, paddingOffset);
        }

        // IF 4 draw a streamer set4
        if (shapeSelection === 4) {
          document.getElementById('svg').innerHTML += streamerSet4(x, y, chosenPalette, paddingOffset);
        }

        // IF 5 draw a streamer set5
        if (shapeSelection === 5) {
          document.getElementById('svg').innerHTML += streamerSet5(x, y, chosenPalette, paddingOffset);
        }

        // IF 6 draw a streamer set6
        if (shapeSelection === 6) {
          document.getElementById('svg').innerHTML += streamerSet6(x, y, chosenPalette, paddingOffset);
        }

        // IF 7 draw a streamer set7
        if (shapeSelection === 7) {
          document.getElementById('svg').innerHTML += streamerSet7(x, y, chosenPalette, paddingOffset);
        }

        // IF 8 draw a streamer set8
        if (shapeSelection === 8) {
          document.getElementById('svg').innerHTML += streamerSet8(x, y, chosenPalette, paddingOffset);
        }

        // IF 9 draw a streamer set9
        if (shapeSelection === 9) {
          document.getElementById('svg').innerHTML += streamerSet9(x, y, chosenPalette, paddingOffset);
        }

        // IF 10 draw a streamer set10
        if (shapeSelection === 10) {
          document.getElementById('svg').innerHTML += streamerSet10(x, y, chosenPalette, paddingOffset);
        }

        // IF 11 draw a streamer set11
        if (shapeSelection === 11) {
          document.getElementById('svg').innerHTML += streamerSet11(x, y, chosenPalette, paddingOffset);
        }

      }
    }

    // Remove streamers based on density
    var numOfPaths = document.getElementById('svg').querySelectorAll('path').length;
    var numOfPathsToRemove = Math.round(numOfPaths - (numOfPaths * density));
    if (density === 0) {
      Array.prototype.forEach.call( document.getElementById('svg').querySelectorAll('path'), function( node ) {
        node.parentNode.removeChild( node );
      });
    }
    else {
      for (let i = 0; i < numOfPathsToRemove; i++) {
        var randomPath = getRandomInt(1, numOfPaths - 1)
        document.getElementById('svg').querySelectorAll('path')[randomPath].remove();
        var numOfPaths = numOfPaths - 1;
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

  function streamerSet0(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" clip-rule="evenodd" d="M34.918 3.188c5.285 2.622 8.894 7.383 10.244 12.292l-6.75 1.857c-.84-3.057-3.17-6.174-6.604-7.878-3.316-1.644-7.942-2.105-13.725.61l-2.974-6.337C22.64.197 29.515.508 34.92 3.188z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" clip-rule="evenodd" d="M20.027 49.91a14.167 14.167 0 01-.35 1.569c-2.099 7.386-9.041 9.734-14.134 7.565C2.98 57.953.824 55.655.378 52.402c-.435-3.171.852-6.503 3.475-9.677 1.988-2.407 4.426-3.711 7.044-4.03-.14-.298-.285-.598-.437-.9-2.237-4.479-5.322-8.61-7.444-10.993l5.23-4.654c2.446 2.75 5.911 7.384 8.476 12.517.916 1.834 1.776 3.844 2.415 5.933a24.24 24.24 0 012.512 1.592c5.028 3.617 9.469 9.376 11.613 13.649l-6.257 3.14c-1.346-2.684-3.966-6.265-6.978-9.07zm-6.899-4.194c.185 1.437.133 2.735-.184 3.85-.5 1.76-1.414 2.579-2.195 2.947-.86.405-1.79.378-2.464.091-.626-.267-.906-.675-.972-1.153-.077-.56.049-1.983 1.936-4.267 1.098-1.33 2.144-1.633 3.242-1.555.204.015.416.043.637.087z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" clip-rule="evenodd" d="M45.98 53.178c-2.167-11.342 2.73-21.792 5.512-25.749l5.726 4.027c-2.117 3.01-6.055 11.548-4.363 20.409l-6.876 1.313z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" clip-rule="evenodd" d="M29.245 28.952c-.808 1.051-1.149 2.31-1.149 2.99h-7c0-2.318.91-5.06 2.601-7.258 1.762-2.291 4.588-4.241 8.4-4.241v7c-1.19 0-2.114.55-2.852 1.509z"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet1(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M30.7 8.74c-2.022-.091-3.887.702-5.105 1.614L21.398 4.75c2.232-1.671 5.654-3.182 9.618-3.004 4.106.185 8.343 2.165 12.022 6.704 3.189 3.934 5.609 4.598 7.097 4.586 1.702-.013 3.328-.898 4.909-2.082l4.196 5.603c-1.87 1.4-5.021 3.447-9.051 3.479-4.244.033-8.51-2.147-12.589-7.179-2.57-3.17-5.019-4.033-6.9-4.118z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M2.359 51.83C.807 48.57.713 44.622 1.939 40.925l6.644 2.204c-.746 2.25-.567 4.3.096 5.693.617 1.296 1.672 2.134 3.27 2.293 5.815.579 11.274 1.19 14.082 1.54l-.864 6.947c-2.736-.34-8.135-.947-13.911-1.521-4.198-.418-7.299-2.891-8.897-6.25z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M6.168 13.267c.666-2.73.726-5.47.589-7.055l6.973-.607c.196 2.248.106 5.76-.761 9.32-.856 3.514-2.594 7.567-6.092 10.258L2.61 19.634c1.703-1.31 2.882-3.589 3.559-6.367z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M41.537 43.83c5.218 4.524 8.633 11.19 10.12 15.95l6.68-2.086c-1.748-5.6-5.738-13.538-12.214-19.154-6.667-5.78-15.976-9.051-27.54-4.804l2.412 6.57c8.836-3.244 15.514-.837 20.542 3.523z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet2(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M8.417 49.857c-.34-.566-.61-1.015-.87-1.406l5.831-3.872c.355.534.73 1.16 1.083 1.744l.25.415c.446.738.896 1.462 1.388 2.16 1 1.416 2.047 2.536 3.242 3.232 1.104.642 2.51 1.028 4.523.684 2.111-.361 5.017-1.55 8.907-4.373 6.616-4.799 12.672-4.996 17.46-2.503 4.418 2.3 7.112 6.564 8.187 9.585l-6.595 2.347c-.66-1.857-2.39-4.456-4.824-5.723-2.064-1.075-5.287-1.544-10.118 1.96-4.407 3.197-8.309 5.004-11.838 5.607-3.627.62-6.696-.064-9.223-1.534-2.435-1.417-4.174-3.452-5.44-5.246a43.198 43.198 0 01-1.658-2.572l-.305-.505z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M38.789 33.704c1.903.538 4.118.448 6.78-1.264 4.798-3.084 5.611-8.619 4.961-11.87l6.864-1.372c1.017 5.083-.069 14.007-8.04 19.13-4.337 2.789-8.622 3.2-12.469 2.112-3.683-1.04-6.687-3.37-8.898-5.58l4.95-4.95c1.789 1.788 3.785 3.21 5.852 3.794z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M9.804 30.644c-1.722 1.283-2.64 3.424-2.88 5.044L0 34.662c.427-2.88 2.009-6.939 5.62-9.63 3.83-2.855 9.217-3.648 16.047-1.143l-2.41 6.572c-5.17-1.896-7.95-.938-9.453.183z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M3.798 4.883c4.89 9.458 15.234 12.888 24.943 10.972l-1.355-6.868c-7.37 1.455-14.22-1.227-17.37-7.319L3.797 4.883z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M52.233 8.134L38.872 9.71l-.82-6.952 13.361-1.575.82 6.952z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet3(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M45.438 24.865c-.5.055-1.143.281-1.92.98-.733.66-1.312 1.817-1.103 3.9.217 2.15 1.285 5.063 3.655 8.544 2.37 3.48 3.544 6.798 3.24 9.935-.317 3.25-2.143 5.572-4.21 7.134-2.008 1.517-4.41 2.462-6.461 3.084-1.915.58-3.754.947-4.978 1.19l-.297.059-1.373-6.864.277-.055c1.243-.248 2.768-.552 4.338-1.029 1.715-.52 3.218-1.172 4.273-1.97.996-.752 1.389-1.462 1.463-2.227.085-.877-.177-2.555-2.058-5.317-2.78-4.085-4.463-8.104-4.833-11.783-.378-3.746.618-7.314 3.385-9.804 1.723-1.55 3.696-2.497 5.826-2.734 2.108-.235 4.103.253 5.855 1.121 3.416 1.693 6.235 4.97 8.214 8.505l-6.108 3.42c-1.591-2.842-3.522-4.814-5.214-5.653-.8-.397-1.45-.494-1.971-.436z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M12.218 4.036c4.995-2.561 10.57-2.49 14.199-1.706l-1.48 6.842c-2.538-.55-6.362-.529-9.525 1.093-2.893 1.483-5.73 4.546-6.245 11.254l-6.98-.537c.685-8.892 4.765-14.246 10.03-16.946z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M14.855 41.585c.537 4.799-1.046 9.518-2.59 12.411L6.09 50.702c1.124-2.107 2.14-5.388 1.81-8.339-.158-1.414-.615-2.682-1.45-3.76-.83-1.071-2.184-2.149-4.449-2.958l2.354-6.592c3.336 1.191 5.865 2.988 7.627 5.261 1.756 2.266 2.6 4.81 2.874 7.271z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M42.74 3.137L51.174 0l2.44 6.56-8.436 3.138-2.44-6.56z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M22.203 26.902c-.42-.732-1.208-1.33-2.419-2.109l3.786-5.888.044.029c1.136.73 3.308 2.125 4.662 4.487 1.528 2.666 1.723 5.955.132 9.774l-6.462-2.692c.909-2.18.52-3.141.257-3.6z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet4(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M9.111 8.233c4.143-1.593 6.882-5.31 7.626-6.798l6.261 3.13c-1.256 2.513-5.116 7.795-11.374 10.202L9.111 8.233z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M13.75 37.642c-3.295 1.524-5.58 4.037-6.48 5.373L1.465 39.1c1.459-2.162 4.66-5.645 9.346-7.812 4.836-2.236 11.153-3.006 18.338.33 7.178 3.335 10.682 8.662 12.035 13.81 1.302 4.952.615 9.716-.483 12.352l-6.462-2.693c.506-1.214 1.088-4.405.175-7.879-.861-3.277-3.058-6.846-8.214-9.24-5.15-2.392-9.306-1.78-12.45-.326z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M43.403 11.473c-.958-1.117-2.657-1.902-5.236-1.52L37.14 3.03c4.532-.672 8.792.64 11.577 3.888 2.755 3.213 3.57 7.735 2.52 12.534-.622 2.85-.079 3.812.276 4.18.527.55 2.066 1.362 6.095 1.362v7c-4.471 0-8.543-.805-11.143-3.512-2.773-2.886-2.875-6.82-2.066-10.524.704-3.22-.008-5.332-.996-6.484z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet5(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M1.51 40.182C.004 34.314.263 26.278 1.751 17.42l6.903 1.16c-1.234 7.348-1.46 13.48-.766 17.885.254-.145.517-.285.79-.417 5.867-2.852 12.077-1.472 14.215 3.308 1.068 2.388.741 5.175-1.098 7.347-1.744 2.06-4.525 3.225-7.857 3.601-1.893.214-3.678-.002-5.288-.648.098 1 .308 1.967.583 2.817.41 1.27.863 1.959 1.03 2.137l-5.114 4.78c-1.155-1.235-2.01-3.011-2.576-4.762a20.472 20.472 0 01-.985-6.188c-.002-1.719.243-3.587.875-5.384a20.843 20.843 0 01-.953-2.874zm9.288 2.741c.564.36 1.29.545 2.354.425 2.3-.26 3.116-.95 3.301-1.168a.815.815 0 00.016-.02c-.082-.114-.33-.37-.931-.516-.716-.174-1.995-.177-3.8.7-.342.166-.655.36-.94.58zm5.715-.829l-.002.004a.026.026 0 01.002-.004z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M19.252 11.742c1.122 3.936.973 7.836.463 10.351l-6.86-1.39c.32-1.582.438-4.333-.335-7.04-.75-2.629-2.271-5.035-5.132-6.52L10.612.93c4.959 2.573 7.494 6.798 8.64 10.812z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M34.924 2.33a60.546 60.546 0 001.544-1.118L40.7 6.789c-.561.425-1.174.86-1.746 1.265l-.298.211c-.679.483-1.31.938-1.892 1.4-1.234.978-1.885 1.713-2.149 2.25-.13.267-.208.462.105 1.024.458.823 1.708 2.21 4.72 4.093 3.6 2.25 6.069 4.859 7.345 7.776 1.304 2.98 1.22 5.965.261 8.583-1.82 4.97-6.722 8.566-11.228 9.531l-1.467-6.844c2.494-.535 5.242-2.69 6.122-5.094.392-1.07.42-2.179-.101-3.37-.549-1.255-1.842-2.896-4.642-4.646-3.388-2.117-5.817-4.272-7.127-6.626-1.455-2.614-1.389-5.233-.273-7.507.982-2.004 2.678-3.54 4.085-4.656.739-.585 1.5-1.133 2.187-1.62l.323-.23z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M45.85 53.711c-2.39 1.342-3.976 3.546-4.646 5.07l-6.408-2.82c1.163-2.641 3.677-6.137 7.629-8.354 4.12-2.312 9.529-3.07 15.896-.477l-2.642 6.483c-4.433-1.806-7.607-1.148-9.829.098z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M52.712 21.1l-3.903-8.662 6.382-2.876 3.903 8.662-6.382 2.875z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet6(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M13.192 1.347c3.005-1.3 6.132-.415 8.276 1.944 1.321 1.453 2.305 3.042 2.736 4.783a7.716 7.716 0 01-.463 5.104c-1.292 2.864-4.113 4.8-6.586 6.122a41.15 41.15 0 01-3.804 1.765c.461 3.875 1.604 8.588 3.786 14.152l-6.517 2.556c-2.07-5.28-3.353-10.053-4.002-14.284l-.16.053c-1.576.527-2.816.941-3.7 1.32L0 18.428c1.163-.498 2.856-1.064 4.6-1.647.502-.168 1.009-.337 1.508-.506.068-3.114.553-5.794 1.352-8.015 1.12-3.11 3.03-5.744 5.732-6.913zm.175 12.034c.165-.084.327-.168.486-.253 2.235-1.196 3.227-2.207 3.507-2.829a.73.73 0 00.049-.543c-.07-.286-.316-.872-1.12-1.756a1.162 1.162 0 00-.282-.242.618.618 0 00-.036.014c-.267.115-1.168.757-1.924 2.858a15.05 15.05 0 00-.68 2.75zm2.669-5.632h-.002.002zm-.058-.005a.027.027 0 01-.005-.002l.005.002z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M48.345 6.428c-7.678 3.544-13.743 2.28-19.266.071L31.679 0c4.477 1.79 8.412 2.528 13.733.072l2.933 6.356z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M53.964 22.016c-.917 2.28-1.274 5.527.286 9.913 2.311 6.5 1.017 12.14-1.658 16.501-2.597 4.235-6.453 7.23-9.443 8.97l-3.52-6.05c2.358-1.372 5.193-3.641 6.996-6.58 1.724-2.81 2.538-6.253 1.03-10.495-2.081-5.852-1.795-10.87-.186-14.871 1.58-3.926 4.339-6.643 6.875-8.143l3.563 6.026c-1.348.797-2.996 2.375-3.943 4.729z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M17.72 45.926c2.597-2.288 3.929-5.86 4.608-9.954l6.906 1.146c-.773 4.66-2.48 10.18-6.889 14.062-4.546 4.003-11.229 5.644-20.55 4.067l1.168-6.902c8.003 1.354 12.296-.253 14.756-2.42z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M30.84 30.486l-4-7 6.077-3.473 4 7-6.077 3.473z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet7(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M20.096 9.685c-5.314-2.083-11.673-1.49-16.047.11L1.644 3.22C7.197 1.19 15.368.314 22.65 3.167c7.617 2.984 13.714 9.846 14.926 22.04l-6.966.692c-.973-9.787-5.535-14.264-10.514-16.214z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M6.136 22.132c.55-3.491 2.572-6.214 5.308-8.342l4.297 5.525c-1.764 1.372-2.492 2.65-2.691 3.908-.212 1.341.076 3.296 1.624 6.17l-6.163 3.319c-1.952-3.626-2.914-7.171-2.375-10.58z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M49.989 58.979c-3.47.676-7.22-.813-10.765-4.275-1.719-1.677-2.604-3.69-2.932-5.75-1.213 1.202-2.348 3.207-2.894 6.554l-6.909-1.129c.908-5.555 3.27-9.542 6.705-11.918a13.531 13.531 0 014.242-1.952c.29-.782.617-1.547.964-2.287 2.383-5.066 6.245-9.882 9.105-12.329l4.551 5.319c-1.952 1.67-4.95 5.306-6.945 9.22 3.011.672 5.824 2.099 7.881 3.956 2.123 1.916 4.249 5.136 3.135 8.795-.6 2.71-2.889 5.163-6.138 5.796zm-6.847-11.804c.033 1.18.39 1.954.97 2.52 2.6 2.538 4.136 2.492 4.539 2.413.45-.087.605-.368.634-.42l.005-.008.048-.265.085-.248v-.004a.814.814 0 00-.07-.243c-.127-.306-.437-.782-1.05-1.336-1.192-1.075-3.08-2.034-5.16-2.409z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M14.51 44.754c2.105-2.304 3.13-6.113 3.615-9.674l6.936.945c-.515 3.773-1.74 9.464-5.385 13.451-1.907 2.087-4.455 3.683-7.738 4.265-3.227.572-6.9.12-11.05-1.402l2.41-6.573c3.35 1.229 5.739 1.38 7.418 1.082 1.624-.287 2.825-1.035 3.793-2.094z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M52.593 19.052c0-5.36-4.14-9.331-8.126-10.056l1.252-6.887c7.013 1.275 13.874 7.903 13.874 16.943h-7z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet8(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M3.026 9.54C4.738 5.127 8.168 2.304 10.887 1l3.03 6.31c-1.448.696-3.418 2.323-4.365 4.762-.877 2.26-1.088 5.768 1.87 10.813 3.89 6.638 3.817 12.344 1.136 16.704-2.477 4.028-6.73 6.142-9.754 6.948L1 39.773c1.977-.527 4.372-1.862 5.595-3.851 1.02-1.657 1.696-4.535-1.213-9.497C1.54 19.871 1.246 14.128 3.026 9.54z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M45.625 51.678c2.413 1.43 5.492-.317 5.796-2.496.08-.579-.02-1.387-.4-2.027-.303-.507-.909-1.147-2.428-1.397-1.267-.209-3.209-.143-6.04.653.726 3.232 2.062 4.668 3.072 5.267zm-9.65-2.727c1.12 4.081 3.223 7.055 6.081 8.749 6.628 3.927 15.29-.322 16.298-7.552.264-1.897 0-4.359-1.32-6.574-1.398-2.349-3.828-4.15-7.305-4.723-2.187-.36-4.718-.227-7.634.452.179-3.413.837-7.622 2.191-12.755l-6.768-1.786c-1.776 6.73-2.528 12.327-2.472 16.93-4.713 2.025-10.356 5.18-17.119 9.8l3.95 5.78c5.605-3.83 10.259-6.508 14.098-8.32z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M31.55 7.303c-.513-.746-.973-1.415-1.448-2.048l5.6-4.2a67.938 67.938 0 011.6 2.258l.13.19a50.916 50.916 0 001.578 2.204c1.05 1.363 2.053 2.372 3.214 3.048 2.084 1.213 5.81 1.973 13.845-1.336l2.665 6.473c-8.965 3.691-15.239 3.701-20.03.914-2.275-1.324-3.93-3.127-5.239-4.827a57.538 57.538 0 01-1.915-2.676z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M20.384 22.442c.501-3.222 1.814-6.548 3.965-8.738l4.995 4.903c-.794.81-1.681 2.584-2.044 4.912-.355 2.284-.108 4.5.677 6.071l-6.261 3.13c-1.615-3.23-1.84-7.013-1.332-10.278z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet9(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M33.193 15.442C26.098 13.565 20.97 8.799 18.349 4.916L24.151 1c1.88 2.784 5.7 6.318 10.832 7.675 4.927 1.303 11.574.737 19.627-5.486l4.28 5.539c-9.546 7.377-18.4 8.644-25.697 6.714z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M46.796 25.235c4.358-1.787 8.978-.884 11.68-.31l-1.452 6.847c-2.798-.593-5.428-.94-7.57-.06-1.763.722-4.13 2.707-5.255 9.231-1.294 7.503-3.642 12.857-7.931 15.746-4.301 2.896-9.542 2.624-14.704 1.591l1.372-6.864c4.838.968 7.597.696 9.421-.533 1.835-1.236 3.737-4.133 4.944-11.13 1.375-7.976 4.757-12.574 9.495-14.518z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M4.314 48.072c-.547-1.93-2.038-3.659-3.29-4.605l4.218-5.586c2.073 1.566 4.726 4.47 5.807 8.281 1.167 4.116.352 8.823-3.86 13.157L2.17 54.44c2.532-2.604 2.606-4.744 2.145-6.368z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M1.844 14.518l-.732-.25 2.276-6.62c.232.08.483.165.752.255 2.58.869 6.734 2.267 10.103 4.875 1.925 1.491 3.71 3.452 4.864 6.042 1.162 2.608 1.59 5.644 1.11 9.116a52.2 52.2 0 01-.35 2.012c-.09.49-.177.958-.234 1.307-.188 1.143-.3 2.19-.255 3.114.044.921.233 1.508.47 1.88.193.305.558.699 1.488 1.002 1.408.46 2.071.23 2.418.034.47-.264 1.077-.888 1.67-2.199 1.217-2.685 1.692-6.697 1.829-10.262l6.995.269c-.142 3.668-.628 8.866-2.447 12.881-.924 2.04-2.353 4.14-4.613 5.412-2.383 1.34-5.142 1.46-8.023.52-2.321-.757-4.079-2.096-5.226-3.904-1.105-1.74-1.475-3.644-1.553-5.3-.08-1.654.123-3.27.34-4.584.127-.772.232-1.32.322-1.785.094-.491.17-.888.235-1.353.32-2.327.002-4.026-.57-5.311-.582-1.305-1.523-2.401-2.756-3.356-2.38-1.843-5.411-2.875-8.113-3.795z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet10(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M44.81 20.137c1.862-3.996 4.529-7.588 6.341-9.672l5.282 4.593c-1.52 1.749-3.768 4.796-5.28 8.037-1.6 3.432-1.916 6.087-1.174 7.718a58.137 58.137 0 001.742 3.532c1.775-.785 3.781-1.334 6.016-1.565l.72 6.963c-1.149.119-2.187.36-3.12.694.471.788.971 1.647 1.515 2.625 3.38 6.083.458 14.015-6.211 14.682-3.548.355-6.437-1.256-7.93-4.081-1.349-2.55-1.36-5.664-.588-8.448.658-2.371 1.946-4.758 3.854-6.804a64.66 64.66 0 01-2.371-4.701c-2.087-4.592-.57-9.77 1.203-13.573zm5.012 24.738a9.088 9.088 0 00-.953 2.21c-.454 1.637-.24 2.796.03 3.306v.001c.124.234.247.467 1.045.387.244-.025.777-.254 1.126-1.078.319-.752.402-1.909-.337-3.24a70.018 70.018 0 00-.91-1.586z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M13.393 51.639c-2.984-1.213-5.39-3.752-6.629-5.733L.83 49.617c1.784 2.852 5.218 6.593 9.93 8.507 4.974 2.02 11.043 1.85 17.255-2.771l-4.18-5.616c-4.235 3.152-7.719 3.007-10.44 1.901z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M35.975 8.094c-2.32.3-5.369 1.643-9.661 5.219-5.082 4.233-10.273 5.202-14.844 4.434-4.4-.738-7.935-3.028-10.12-4.831l4.456-5.4c1.667 1.377 4.086 2.868 6.823 3.328 2.566.43 5.696.013 9.205-2.91 4.774-3.977 9.049-6.24 13.243-6.782 4.31-.558 7.965.77 11.276 2.754L42.756 9.91c-2.524-1.512-4.576-2.102-6.78-1.817z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M28.582 31.593c2.25-4.448 3.023-9.56 3.023-12.831h7c0 4.11-.926 10.355-3.776 15.99-2.892 5.716-7.937 11.082-16.143 12.461l-1.16-6.903c5.393-.907 8.848-4.35 11.056-8.718z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M15.732 28.542l-8.5 6.5-4.253-5.56 8.5-6.5 4.253 5.56z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }

  function streamerSet11(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M15.393 10.425C10.941 13.596 8.348 18.803 7.4 22.67L.601 21.003c1.218-4.967 4.525-11.86 10.731-16.28C17.797.118 26.83-1.392 38.393 3.626l-2.786 6.421c-9.637-4.182-16.02-2.61-20.214.378z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M51.173 58.874c2.18.151 4.069-.593 5.376-1.537l.37-.267.29-.354c1.44-1.76 2.346-4.612 1.487-7.851-.858-3.232-3.339-6.407-7.788-9.3-1.644-1.068-3.441-2.014-5.306-2.848a100.277 100.277 0 01-.607-6.911l-6.99.388c.075 1.334.166 2.611.273 3.834a78.324 78.324 0 00-2.377-.673c-5.025-1.338-9.717-2.072-12.574-2.34l-.654 6.97c2.477.232 6.784.898 11.426 2.134 1.74.464 3.491.998 5.188 1.605 1.234 6.738 3.158 11.117 5.536 13.79 1.87 2.102 4.08 3.203 6.35 3.36zm-3.734-13.21c3.271 2.204 4.232 4.02 4.49 4.996.142.532.111.936.042 1.209-.101.02-.208.03-.315.022-.214-.015-.787-.112-1.603-1.03-.817-.918-1.756-2.528-2.614-5.197z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M17.421 52.138c4.32.104 8.764-1.357 11.48-2.752l3.198 6.227c-3.45 1.772-9.056 3.662-14.845 3.523-5.946-.142-12.335-2.474-16.293-9.4l6.078-3.473c2.442 4.275 6.22 5.776 10.382 5.875z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M48.096 19.863c-4.867 2.049-10.029 2.413-13.395 2.124l.598-6.974c2.468.211 6.456-.075 10.08-1.601 3.533-1.488 6.518-4.04 7.756-8.374l6.73 1.923c-1.962 6.867-6.81 10.814-11.77 12.902z" clip-rule="evenodd"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M1.843 37.99l5.5-11.5 6.315 3.02-5.5 11.5-6.315-3.02z" clip-rule="evenodd"/>'
    return '<svg>' + path + '</svg>'
  }
}