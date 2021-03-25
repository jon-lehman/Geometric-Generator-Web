function patternChips() {

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
        var shapeSelection = getRandomInt(0, 7);

        // IF 0 draw a chip set0
        if (shapeSelection === 0) {
          document.getElementById('svg').innerHTML += chipSet0(x, y, chosenPalette, paddingOffset);
        }

        // IF 1 draw a chip set1
        if (shapeSelection === 1) {
          document.getElementById('svg').innerHTML += chipSet1(x, y, chosenPalette, paddingOffset);
        }

        // IF 2 draw a chip set2
        if (shapeSelection === 2) {
          document.getElementById('svg').innerHTML += chipSet2(x, y, chosenPalette, paddingOffset);
        }

        // IF 3 draw a chip set3
        if (shapeSelection === 3) {
          document.getElementById('svg').innerHTML += chipSet3(x, y, chosenPalette, paddingOffset);
        }

        // IF 4 draw a chip set4
        if (shapeSelection === 4) {
          document.getElementById('svg').innerHTML += chipSet4(x, y, chosenPalette, paddingOffset);
        }

        // IF 5 draw a chip set5
        if (shapeSelection === 5) {
          document.getElementById('svg').innerHTML += chipSet5(x, y, chosenPalette, paddingOffset);
        }

        // IF 6 draw a chip set6
        if (shapeSelection === 6) {
          document.getElementById('svg').innerHTML += chipSet6(x, y, chosenPalette, paddingOffset);
        }

        // IF 7 draw a chip set7
        if (shapeSelection === 7) {
          document.getElementById('svg').innerHTML += chipSet7(x, y, chosenPalette, paddingOffset);
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

  function chipSet0(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M59 12.111L48.941 21l-7.265-2.222L40 5.444 52.294 1 59 12.111z"/>'+
                '<circle transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" cx="6.5" cy="4.5" r="3.5"/>'+
                '<circle transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" cx="28.5" cy="51.5" r="2.5"/>'+
                '<circle transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" cx="49" cy="50" r="9"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M1 59l7.576-41L26 44.574 1 59z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M20.427 35.99a15.92 15.92 0 01-11.562 4.955c-1.532 0-3.013-.216-4.415-.619l4.138-22.394 11.84 18.057z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M6.101 31.387l2.486-13.455 6.96 10.615a7.99 7.99 0 01-6.535 3.385 7.98 7.98 0 01-2.91-.545z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M35 20.5l8.25-7.5L46 23l-11-2.5z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M32.13 42L21.5 21.5 53 28.865 32.13 42z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M13.5 15.5l3.5-13L31 2l-2.5 16.5-15-3z"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet1(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M.63 24.138L3.629 3.556 20.613.56l5.195 12.988-10.19 16.186L.63 24.138z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M26.264 34.535l-4.04-22.777 22.424-3.2-18.384 25.977z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M21.243 28.207L16.5 34.245l7.259 7.259-2.516-13.296z"/>'+
                '<circle cx="53.369" cy="11.559" r="6" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="34.672" cy="4.559" r="1.972" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M32.998 52.18l-4.811-10.195 10.08-14.434L51.44 41.985 32.998 52.18z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M59.37 42.004L41.74 22.669l2.943-3.969 14.392 13.621.293 9.683z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M59.152 34.65L42.468 21.696l2.221-2.996 14.392 13.621.07 2.33z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M50.615 32.403l8.754 9.6-.293-9.682-3.232-3.059a10.515 10.515 0 00-5.229 3.14zM4.007 42.035L3.82 57.822l19.053 1.62-8.34-12.657-10.525-4.75z"/>'+
                '<circle cx="10.667" cy="41.559" r="4.958" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="3.12" cy="32.02" r="2.023" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M51.659 48.562l-10.013 5.136 11.963 2.146-1.95-7.282z"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet2(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M28.074 29.726l-1.358 28.927 29.47-9.778-28.112-19.149z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M51.84 42.628L38.94 32.306l6.518-19.42 11.951 1.766 1.902 17.654-7.47 10.322z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M44.513 36.76l7.327 5.863L59.31 32.3l-.789-7.323A6560.396 6560.396 0 0044.513 36.76z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M43.89 36.26l7.952 6.363 6.69-9.244c-4.66.923-10.846 2.144-14.642 2.882z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M38.531 22.121l-2.309 8.284-5.975-4.21 8.284-4.074z"/>'+
                '<circle cx="15.987" cy="9.495" r="8.148" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M28.481 24.973L18.024 11.121l12.902-5.84 9.642 12.223-12.087 7.469z"/>'+
                '<circle cx="41.451" cy="9.495" r="2.377" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M48.581 2.429c-.588 1.947-1.82 5.975-2.037 6.519l11 .95-8.963-7.469z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M21.099 48.06V23.333L5.04 19.781l2.131 18.758 13.927 9.521z"/>'+
                '<circle cx="6.88" cy="39.743" r="6.19" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M20.457 52.613l-7.494-5.301-4.57 8.042 12.064-2.741z"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet3(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M1.137 24.082l9.277-21.814 17.677 7.898-9.778 22.065-17.176-8.15z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M36.837.518l-6.4 12.232 16.321-8.723L36.837.518z"/>'+
                '<circle cx="27.175" cy="24.882" r="8.564" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="38.743" cy="13.715" r="2.045" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="3.578" cy="3.595" r="1.436" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M5.023 39v-8.65l8.65 3.51L5.024 39z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M15.632 38.262l-9.528 5.642-3.636 8.65 6.645 6.394 20.56-4.513-5.265-14.92-8.776-1.253z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M38.246 30.476v-9.78l15.17-4.387-.878 18.93-14.292-4.763z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M53.138 22.301l-.6 12.939-7.426-2.476 3.799-10.161 4.227-.302z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M38.246 26.294v4.181l11.08 3.694a8.203 8.203 0 00-11.08-7.875z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M58.664 11.575l-11.513 3.226 2.868-8.036 8.645 4.81z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M28.593 44.893L16.35 52.675l30.087 3.455-17.844-11.237z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M49.956 53.786L33.857 43.688l4.227-9.358 11.872 19.457z"/>'+
                '<circle cx="29.673" cy="37.696" r="1.573" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="56.434" cy="46.314" r="2.291" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet4(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M20.888 2.086L2.25 7.458.458 20.061l15.455 9.619 18.308-18.374-13.333-9.22z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M44.541 5.436L34.308 17.297 57.333 26.6l2.21-14.536L44.54 5.436z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M35.673 7.627l-4.34-3.558L41.65 1.863l-5.977 5.764z"/>'+
                '<circle cx="27.404" cy="26.612" r="9.208" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M36.535 27.946c-.646 4.453-4.48 7.874-9.112 7.874a9.201 9.201 0 01-7.776-4.274l16.889-3.6z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M31.253 34.988a9.21 9.21 0 005.36-8.367 9.17 9.17 0 00-2.139-5.9 8.264 8.264 0 00-3.22 14.267z"/>'+
                '<circle cx="51.018" cy="49.573" r="2.391" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M40.278 48.156l-10.374-3.431 9.672-8.502.702 11.933z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M43.01 48.1s-1.605-21.409-1.605-21.944l17.93 7.895L43.01 48.1z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M35.918 49.038L6.346 41.009l-4.55 17.128 38.27-1.07-4.148-8.03z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M39.91 23.747l-1.316 9.769 11.91-5.531-10.594-4.238zM.829 35.042l.706-6.41 12.644 7.407-13.35-.997z"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet5(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M39.554 26.326L35.747 3.042 57.274.992l1.611 22.552-19.33 2.782z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M57.747 7.606l1.138 15.937-6.265.901a10.377 10.377 0 01-2.52-6.793c0-4.794 3.239-8.832 7.647-10.045z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M57.577 5.23c-6.878 2.817-16.24 6.66-20.118 8.278L35.747 3.04 57.274.99l.303 4.24z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" fill-rule="evenodd" d="M45.012 2.159l-6.506 17.754-2.76-16.872 9.266-.882z" clip-rule="evenodd"/>'+
                '<circle cx="14.678" cy="10.752" r="9.76" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="29.756" cy="31.584" r="2.311" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="24.236" cy="55.015" r="2.027" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M20.856 27.174l11.08-19.39 12.247 13.85-23.327 5.54z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M.739 46.753V21.58L22.27 35.512l-9.5 15.357L.74 46.753z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M29.203 38.932l-2.94 9.66 13.299 3.499-10.36-13.159z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M39.39 32.882l-3.577 5.961 14.043 13.248 9.405-8.346L56.082 30.1 39.39 32.882z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M51.72 58.008l6.466 1.002-.45-5.808-6.015 4.806z"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet6(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<circle cx="41.945" cy="41.707" r="12.244" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="31.075" cy="7.255" r="5.274" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="54.503" cy="55.722" r="2.995" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M56.735 29.177L43.242 34.19 30.667 15.89l20.188-7.914 7.892 7.119-2.012 14.082z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M35.9 28.795l-4.206-5.575-4.27 10.278 8.477-4.703z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M4.536 28.667L1.253 5.48l12.311-2.257-9.028 25.443z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M12.437 16.356l-5.05 16.408L20.98 42.57l9.127-23.398-17.67-2.816z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M28.136 16.18l-13.847-2.317 3.36-9.617L28.136 16.18zM6.408 54.695V38.458l10.567 6.572-10.567 9.665z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M10.983 48.015v8.87l12.912 2.133 9.431-4.154-9.431-7.86-12.912 1.011z"/>'
    return '<svg>' + path + '</svg>'
  }

  function chipSet7(x, y, chosenPalette, paddingOffset) {
    const rotate = 90 * getRandomInt(0,3);
    const transform = 'translate(' + ((x * 60) + paddingOffset) + ', ' + ((y * 60) + paddingOffset) + ') translate(30,30) rotate(' + rotate + ') translate(-30,-30)';
    const path = '<circle cx="29.384" cy="9.883" r="9.344" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="29.617" cy="23.409" r="1.96" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<circle cx="5.535" cy="51.131" r="2.585" transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M15.135 12.757l-11.747.705-2.01 19.21 11.172 3.107 13.508-8.34-10.923-14.682z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M10.973 1.43l4.183 8.303L1.085 10.81l9.888-9.38z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M1.683 45.065l4.136-15.328 21.046 2.798-4.015 18.491-21.167-5.96z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M39.27 22.06L27.716 30.16l13.807 2.184-2.255-10.285z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M47.537 28.76L42.695 8.668 58.915 10 47.537 28.76z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M30.634 36.326l-1.866 8.62 14.193-7.248-12.327-1.372z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M58.915 47.031l-8.639 12.43-12.988-4.662.373-6.525 15.785-7.893 5.469 6.65z"/>'+
                '<path transform="'+transform+'" fill="'+sample(chosenPalette.colors)+'" d="M56.203 28.76l-4.618 4.307 5.967 1.194-1.349-5.5z"/>'
    return '<svg>' + path + '</svg>'
  }
}